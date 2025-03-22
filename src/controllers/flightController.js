const { JsonHandler } = require('../database/models');
const AppConst = require('../appConst');
const airports = require('../public/files/locations.json');


module.exports = {

    airportList : async (request , response) => {
      const { searchQuery } = request.body;
      try{
        filteredAirports = airports.filter( airport => {
          let airportCode = airport.code.toLowerCase();
          let airportName = airport.name.toLowerCase();
          return airportCode.includes(searchQuery.toLowerCase()) || airportName.includes(searchQuery.toLowerCase());
        }).slice(0 , 20);

        return response.status(200).json({
            status: true,
            data: filteredAirports,
        });
      } catch (error){
        return response.status(500).json({
            status: false,
            message: 'Something Went Wrong',
            error: error.message,
        });
    }
      

    },


    list : async (request ,response)=>{
        const { destinationList , passengerList } = request.body;

        const travelJson = destinationList.map( detail => {
          return {
                  "DepartureDateTime": detail.travelDate,
                  "OriginLocation": {
                    "LocationCode": detail.DepartureAirport
                  },
                  "DestinationLocation": {
                    "LocationCode": detail.ArrivalAirport
                  }
                }
        }); 

        const passengerJson = passengerList.filter( passenger => {
                                                      return passenger.total > 0;
                                                    }).map(passenger => {
                                                      return {
                                                            "Code": passenger.type,
                                                            "Quantity": passenger.total
                                                          }
                                                    });
   
        
        const tokenDetail = await JsonHandler.findOne({
            where : {type : AppConst.sabreFlights}
        });

        const accessToken = typeof(tokenDetail.information) == string ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;
        
        // console.log(typeof(tokenDetail.information));
        // console.log(accessToken);

        // const accessToken = tokenDetail.information.access_token;

        // console.log(accessToken);
        
        try{
            let endpoint = 'https://api.cert.sabre.com/v5/offers/shop';
            
    
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

            // const urlencoded = new URLSearchParams();
            // urlencoded.append("grant_type", "client_credentials");

            // {
            //     "DepartureDateTime": "2024-04-18T00:00:00",
            //     "OriginLocation": {
            //       "LocationCode": "SPU"
            //     },
            //     "DestinationLocation": {
            //       "LocationCode": "WAW"
            //     }
            //   }

            const searchRequest = {
                "OTA_AirLowFareSearchRQ": {
                  "Version": "5",
                  "POS": {
                    "Source": [
                      {
                        "PseudoCityCode": "3GML",
                        "RequestorID": {
                          "Type": "1",
                          "ID": "1",
                          "CompanyName": {
                            "Code": "TN"
                          }
                        }
                      }
                    ]
                  },
                  "OriginDestinationInformation": travelJson,
                  "TravelerInfoSummary": {
                    "AirTravelerAvail": [
                      {
                        "PassengerTypeQuantity": passengerJson
                      }
                    ]
                  },
                  "TPA_Extensions": {
                    "IntelliSellTransaction": {
                      "RequestType": {
                        "Name": "50ITINS"
                      }
                    }
                  }
                }
              }
    
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(searchRequest),
                redirect: "follow"
            };

    
            fetch( endpoint , requestOptions)
            .then((response) => response.json()) 
            .then(async (result) => {
              //new code starts here

              let foundItenararies = result.groupedItineraryResponse.statistics.itineraryCount;

              if(!foundItenararies){
                return response.status(200).json({
                  status: false,
                  message: "No flight found.",
                });
              }





        let itineraryGroups = result.groupedItineraryResponse.itineraryGroups;
        let legsInformation = result.groupedItineraryResponse.legDescs;
        let baggageDescs = result.groupedItineraryResponse.baggageAllowanceDescs;
        let taxDescs= result.groupedItineraryResponse.taxDescs;
        let taxSummaryDescs = result.groupedItineraryResponse.taxSummaryDescs;
        let scheduleDescs = result.groupedItineraryResponse.scheduleDescs;
        let fareComponentDescs = result.groupedItineraryResponse.fareComponentDescs;
        let obFeeDescs = result.groupedItineraryResponse.obFeeDescs ? result.groupedItineraryResponse.obFeeDescs : [];
        let mappedLegs = Object.fromEntries(legsInformation.map(leg => [leg.id , leg]));
        let mappedSchedule = Object.fromEntries(scheduleDescs.map(schedule => [schedule.id , schedule]));
        let mappedBaggages = Object.fromEntries(baggageDescs.map(baggage => [baggage.id , baggage]));
        let mappedTax = Object.fromEntries(taxDescs.map(tax => [tax.id , tax]));
        let mappedTaxSummary = Object.fromEntries(taxSummaryDescs.map(taxSummary => [taxSummary.id , taxSummary]));
        let mappedFareComponent = Object.fromEntries(fareComponentDescs.map(fareComponent => [fareComponent.id , fareComponent]));
        let mappedObFees = Object.fromEntries(obFeeDescs.map(obFee => [obFee.id , obFee]));
        let itineraryGroupDetail = [];
       
    //    console.log(itineraryGroups);
    //     return;
       itineraryGroups.forEach( group => {

            let groupDescription = group.groupDescription;
            let groupItineraries = group.itineraries;
            
            let itinerariesList = groupItineraries.map( gi => {
                let priceSource = gi.pricingSource;
                let legIds = gi.legs.map( leg => leg.ref);
               
                let legDetail = legIds.map( leg => {
                    let legInformation = {};
                    let legSchedule = mappedLegs[leg].schedules;
                    let scheduleList = legSchedule.map( ls => {
                        return mappedSchedule[ls.ref];
                    })
                    legInformation.id = leg;
                    legInformation.schedule = scheduleList;

                    return legInformation;
                });

                let priceInformationList = gi.pricingInformation;
                let priceDetail = [];

                priceInformationList.forEach( pi => {
                    let price = {};
                    price.priceSubSource = pi.pricingSubsource;
                    price.distributionModel = pi.distributionModel;
                    price.lastTicketDate = pi.fare.lastTicketDate;
                    price.lastTicketTime = pi.fare.lastTicketTime;
                    price.totalFareDetail = pi.fare.totalFare;

                    

                    //passenger list code starts here
                    price.passengerList = pi.fare.passengerInfoList.map( passenger => {
                        passengerDetail = {};
                        passengerDetail.type = passenger.passengerInfo.passengerType;
                        passengerDetail.total = passenger.passengerInfo.passengerNumber;
                        passengerDetail.refundable = passenger.passengerInfo.refundable;
                        passengerDetail.nonRefundable = passenger.passengerInfo.nonRefundable;
                        let passengerFareComponentList = passenger.passengerInfo.fareComponents;


                        // passenger fare components
                        passengerDetail.FareComponents = passengerFareComponentList.map( pfc => {
                        
                            let fareComponentDetail = mappedFareComponent[pfc.ref];

                            return { 
                                beginAirport : pfc.beginAirport, 
                                endAirport : pfc.endAirport,
                                segments : pfc.segments,
                                fareComponentDetail :fareComponentDetail
                            }
                        })

                        //passenger taxes
                        passengerDetail.taxes = passenger.passengerInfo.taxes.map( tax => {
                            return mappedTax[tax.ref];
                        })
                        

                        passengerDetail.taxSummary = passenger.passengerInfo.taxSummaries.map( summary => {
                            return mappedTaxSummary[summary.ref];
                        })

                        
                        // console.log(passenger.passengerInfo.obFees);
                        passengerDetail.obFees = passenger.passengerInfo.obFees?.map( of => {
                            return mappedObFees[of.ref];
                        })

                        passengerDetail.baggageInformation = passenger.passengerInfo.baggageInformation.map( bi =>{
                            let baggageDetail = {};
                            baggageDetail.baggageProvision = bi.provisionType;
                            baggageDetail.airlineCode = bi.airlineCode;
                            baggageDetail.segments = bi.segments;
                            baggageDetail.detail = mappedBaggages[bi.allowance.ref];

                            return baggageDetail;
                        });

                        passengerDetail.currencyConversion = passenger.passengerInfo.currencyConversion;

                        passengerDetail.passengerTotalFare = passenger.passengerInfo.passengerTotalFare;
                        
                        passengerDetail.currencyConversion = passenger.passengerInfo.currencyConversion;


                        return passengerDetail;

                    })

                    priceDetail.push(price);

                })

                // console.log("Here is detail -------------------------------------");
                // console.log( priceDetail[0][0].fare.passengerInfoList[0].passengerInfo.taxes );
                // // price.passengerList
                // throw '';
                return {priceSource : priceSource, legIds : legIds , legList : legDetail , passengerPriceDetail : priceDetail };
            });

            itineraryGroupDetail.push({ description : groupDescription , itinerariesList : itinerariesList });
       });



              //new code ends here 



                // let token = await JsonHandler.findOne({
                //     where : { type : appConst.sabreFlights }
                // })

              //return response.status(200).json(itineraryGroupDetail[0].itinerariesList[0])
              // );

                return response.status(200).json({
                    status: true,
                    // data : result
                    // data : itineraryGroupDetail
                    data: itineraryGroupDetail,
                });
            })
            .catch((error) => {
                return response.status(500).json({
                    status: false,
                    message: 'Something Went Wrong',
                    error: error.message,
                });
            });


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }

    },


    findAvailability : async ( request , response ) => {
      const tokenDetail = await JsonHandler.findOne({
          where : {type : AppConst.sabreFlights}
      });
      const accessToken = tokenDetail.information.access_token;
      try{
        
        let endpoint = 'https://api.cert.sabre.com//v4/shop/flights/revalidate';
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");




        // let searchRequest ={
        //   "OTA_AirLowFareSearchRQ": {
        //     "Version": "4.0.0",
        //     "POS": {
        //       "Source": [
        //         {
        //           "PseudoCityCode": "3GML",
        //           "RequestorID": {
        //             "Type": "1",
        //             "ID": "1",
        //             "CompanyName": {
        //               "Code": "TN"
        //             }
        //           }
        //         }
        //       ]
        //     },
        //     "OriginDestinationInformation": [
        //       {
        //         "DepartureDateTime": "2025-04-11T10:00:00",
        //         "OriginLocation": {
        //           "LocationCode": "ISB"
        //         },
        //         "DestinationLocation": {
        //           "LocationCode": "KHI"
        //         },
        //         "RPH": "1",
        //         "TPA_Extensions": {
        //           "Flight": [
        //             {
        //               "Airline": {
        //                 "Marketing": "PK",
        //                 "Operating": "PK"
        //               },
        //               "ArrivalDateTime": "2025-04-11T11:55:00",
        //               "ClassOfService": "Y",
        //               "DepartureDateTime": "2025-04-11T10:00:00",
        //               "DestinationLocation": {
        //                 "LocationCode": "KHI"
        //               },
        //               "Number": 301,
        //               "OriginLocation": {
        //                 "LocationCode": "ISB"
        //               },
        //               "Type": "A"
        //             }
        //           ]
        //         }
        //       }
        //     ],
        //     "TravelPreferences": {
        //       "CabinPref": [
        //         {
        //           "Cabin": "Y"
        //         }
        //       ]
        //     },
        //     "TravelerInfoSummary": {
        //       "AirTravelerAvail": [
        //         {
        //           "PassengerTypeQuantity": [
        //             {
        //               "Code": "ADT",
        //               "Quantity": 1
        //             }
        //           ]
        //         }
        //       ],
        //       "PriceRequestInformation": {
        //         "CurrencyCode": "SAR",
        //         "FareQualifier": "ADVJR1",
        //       }
        //     },
        //     "TPA_Extensions": {
        //       "IntelliSellTransaction": {
        //         "RequestType": {
        //           "Name": "Revalidate"
        //         }
        //       }
        //     }
        //   }
        // }

/////////////////////////////////////////////////////////////////////////////////////////////////////////


        const { priceSource , legList , passengerDetail } = request.body;
        let originDestinationDetail = [];

        legList.forEach((leg , index )=> {
            let legFlights = leg.flights;
        
            // Mapping flights
            let flights = legFlights.map(flight => {
                let flightDetail =  {
                    "Airline": {
                        "Marketing": flight.airline.marketing,
                        "Operating": flight.airline.operating
                    },
                    "ArrivalDateTime": flight.arrivalDateTime,
                    "ClassOfService": "Y",
                    "DepartureDateTime": flight.departureDateTime,
                    "DestinationLocation": {
                        "LocationCode": flight.destinationLocationCode // Corrected
                    },
                    "Number": flight.number,
                    "OriginLocation": {
                        "LocationCode": flight.originLocationCode // Corrected
                    },
                    "Type": "A"
                };

                return flightDetail;

            });
        
            // Ensure DepartureDateTime comes before OriginLocation
            originDestinationDetail.push({
                "DepartureDateTime": flights[0].DepartureDateTime, // Added DepartureDateTime
                "OriginLocation": {
                    "LocationCode": leg.originLocation
                },
                "DestinationLocation": {
                    "LocationCode": leg.destinationLocation
                },
                "RPH": (index+1).toString(),
                "TPA_Extensions": {
                    "Flight": flights
                }
            });
        });
        
        let passengers = passengerDetail.map(passenger => {
            return {
                "Code": passenger.type,
                "Quantity": passenger.total
            };
        });
        
        let travelSummary = {
            "AirTravelerAvail": [
                {
                    "PassengerTypeQuantity": passengers
                }
            ],
            "PriceRequestInformation": {
                "CurrencyCode": "SAR",
                "FareQualifier": priceSource
            }
        };
        
        let searchRequest = {
            "OTA_AirLowFareSearchRQ": {
                "Version": "4.0.0",
                "POS": {
                    "Source": [
                        {
                            "PseudoCityCode": "3GML",
                            "RequestorID": {
                                "Type": "1",
                                "ID": "1",
                                "CompanyName": {
                                    "Code": "TN"
                                }
                            }
                        }
                    ]
                },
                "OriginDestinationInformation": originDestinationDetail,
                "TravelerInfoSummary": travelSummary,
                "TPA_Extensions": {
                    "IntelliSellTransaction": {
                        "RequestType": {
                            "Name": "Revalidate"
                        }
                    }
                }
            }
        };


        // return response.status(200).json(searchRequest);

        // let searchRequest1 = {
        //     "OTA_AirLowFareSearchRQ": {
        //       "Version": "4.0.0",
        //       "POS": {
        //         "Source": [
        //           {
        //             "PseudoCityCode": "3GML",
        //             "RequestorID": {
        //               "Type": "1",
        //               "ID": "1",
        //               "CompanyName": {
        //                 "Code": "TN"
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       "OriginDestinationInformation": [
        //         {
        //           "DepartureDateTime": "2025-04-11T10:00:00",
        //           "OriginLocation": {
        //             "LocationCode": "ISB"
        //           },
        //           "DestinationLocation": {
        //             "LocationCode": "KHI"
        //           },
        //           "RPH": "1",
        //           "TPA_Extensions": {
        //             "Flight": [
        //               {
        //                 "Airline": {
        //                   "Marketing": "PK",
        //                   "Operating": "PK"
        //                 },
        //                 "ArrivalDateTime": "2025-04-11T11:55:00",
        //                 "ClassOfService": "Y",
        //                 "DepartureDateTime": "2025-04-11T10:00:00",
        //                 "DestinationLocation": {
        //                   "LocationCode": "KHI"
        //                 },
        //                 "Number": 301,
        //                 "OriginLocation": {
        //                   "LocationCode": "ISB"
        //                 },
        //                 "Type": "A"
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           "DepartureDateTime": "2025-04-11T16:00:00",
        //           "OriginLocation": {
        //             "LocationCode": "KHI"
        //           },
        //           "DestinationLocation": {
        //             "LocationCode": "ISB"
        //           },
        //           "RPH": "2",
        //           "TPA_Extensions": {
        //             "Flight": [
        //               {
        //                 "Airline": {
        //                   "Marketing": "PK",
        //                   "Operating": "PK"
        //                 },
        //                 "ArrivalDateTime": "2025-04-11T17:55:00",
        //                 "ClassOfService": "Y",
        //                 "DepartureDateTime": "2025-04-11T16:00:00",
        //                 "DestinationLocation": {
        //                   "LocationCode": "ISB"
        //                 },
        //                 "Number": 308,
        //                 "OriginLocation": {
        //                   "LocationCode": "KHI"
        //                 },
        //                 "Type": "A"
        //               }
        //             ]
        //           }
        //         }
        //       ],
        //       "TravelPreferences": {
        //         "CabinPref": [
        //           {
        //             "Cabin": "Y"
        //           }
        //         ]
        //       },
        //       "TravelerInfoSummary": {
        //         "AirTravelerAvail": [
        //           {
        //             "PassengerTypeQuantity": [
        //               {
        //                 "Code": "ADT",
        //                 "Quantity": 1
        //               }
        //             ]
        //           }
        //         ],
        //         "PriceRequestInformation": {
        //           "CurrencyCode": "SAR",
        //           "FareQualifier": "ADVJR1"
        //         }
        //       },
        //       "TPA_Extensions": {
        //         "IntelliSellTransaction": {
        //           "RequestType": {
        //             "Name": "Revalidate"
        //           }
        //         }
        //       }
        //     }
        //   }


        // return response.status(200).json(searchRequest);
        
 

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(searchRequest),
          redirect: "follow"
      };


        fetch( endpoint , requestOptions)
        .then((response) => response.json()) 
        .then(async (result) => {
            // console.log(result)

            return response.status(200).json({
              status: true,
              msg : "hre2",
              data: result,
          });
        })


        } catch (error){
          return response.status(500).json({
              status: false,
              message: 'Something Went Wrong',
              error: error.message,
          });
      }
    },

    generatePnr : async (request , response ) => {
      const tokenDetail = await JsonHandler.findOne({
        where : {type : AppConst.sabreFlights}
        });
        const accessToken = tokenDetail.information.access_token;
        try{

          let endpoint = 'https://api.cert.sabre.com/v2.5.0/passenger/records?mode=create';
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken}`);
          myHeaders.append("Content-Type", "application/json");
          
	


          let searchRequest = {
            "CreatePassengerNameRecordRQ": {
              "version": "2.5.0",
              "TravelItineraryAddInfo": {
                "CustomerInfo": {
                  "PersonName": [
                    {
                      "GivenName": "John",
                      "Surname": "Aflen",
                      "PassengerType": "ADT",
                      "NameNumber": "1.1"
                    },
                    {
                      "NameReference": "DEF456",
                      "GivenName": "Sara",
                      "Surname": "Smith",
                      "PassengerType": "ADT",
                      "NameNumber": "2.1"
                    }
                  ],
                  "ContactNumbers": {
                    "ContactNumber": [
                      {
                        "NameNumber": "1.1",
                        "Phone": "3545642324324",
                        "PhoneUseType": "H"
                      },
                      {
                        "NameNumber": "2.1",
                        "Phone": "3545642324455",
                        "PhoneUseType": "H"
                      }
                    ]
                  }
                },
                "AgencyInfo": {
                  "Address": {
                    "AddressLine": "Test Agency",
                    "CityName": "Jeddah",
                    "CountryCode": "SA"
                  },
                  "Ticketing": {
                    "TicketType": "7TAW"
                  }
                }
              },
              "AirBook": {
                "OriginDestinationInformation": {
                  "FlightSegment": [
                    {
                      "DepartureDateTime": "2025-04-11T05:10:00",
                      "ArrivalDateTime": "2025-04-11T07:25:00",
                      "ResBookDesigCode": "Y",
                      "FlightNumber": "206",
                      "Status": "HK",
                      "NumberInParty": "2",
                      "OriginLocation": {"LocationCode": "ISB"},
                      "DestinationLocation": {"LocationCode": "KWI"},
                      "MarketingAirline": {"Code": "KU", "FlightNumber": "206"}
                    },
                    {
                      "DepartureDateTime": "2025-04-11T08:35:00",
                      "ArrivalDateTime": "2025-04-11T12:15:00",
                      "ResBookDesigCode": "Y",
                      "FlightNumber": "165",
                      "Status": "HK",
                      "NumberInParty": "2",
                      "OriginLocation": {"LocationCode": "KWI"},
                      "DestinationLocation": {"LocationCode": "ROM"},
                      "MarketingAirline": {"Code": "KU", "FlightNumber": "165"}
                    },
                    {
                      "DepartureDateTime": "2025-04-11T14:40:00",
                      "ArrivalDateTime": "2025-04-11T16:10:00",
                      "ResBookDesigCode": "Y",
                      "FlightNumber": "214",
                      "Status": "HK",
                      "NumberInParty": "2",
                      "OriginLocation": {"LocationCode": "ROM"},
                      "DestinationLocation": {"LocationCode": "LON"},
                      "MarketingAirline": {"Code": "AZ", "FlightNumber": "214"}
                    }
                  ]
                }
              },
              "AirPrice": [
                {
                  "PriceRequestInformation": {
                    "Retain": true,
                    "OptionalQualifiers": {
                      "PricingQualifiers": {
                        "PassengerType": [
                          {
                            "Code": "ADT",
                            "Quantity": "2"  // Matches the two passengers and NumberInParty
                          }
                        ]
                      }
                    }
                  }
                }
              ],
              "PostProcessing": {
                "EndTransaction": {
                  "Source": {
                    "ReceivedFrom": "Test User"
                  }
                }
              }
            }
          };
        
        

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(searchRequest),
            redirect: "follow"
        };

        fetch( endpoint , requestOptions)
        .then((response) => response.json()) 
        .then(async (result) => {
            // console.log(result)

          //   return response.status(200).json({
          //     status: true,
          //     msg : "hre2",
          //     data: result,
          // });
          return response.status(200).json( result );
        })

        } catch (error){
          return response.status(500).json({
              status: false,
              message: 'Something Went Wrong',
              error: error.message,
          });
      }
    }
}