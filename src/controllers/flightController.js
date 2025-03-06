const { JsonHandler } = require('../database/models');
const AppConst = require('../appConst');

module.exports = {
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

        const accessToken = tokenDetail.information.access_token;
        console.log(accessToken);
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

            //   return response.status(200).json({
            //     status: true,
            //     data: result,
            // });

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
                return response.status(200).json({
                    status: true,
                    data: itineraryGroupDetail[0].itinerariesList[0],
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
        // let searchRequest = {
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
        //         "DepartureDateTime": "2025-03-23T09:30:00",
        //         "OriginLocation": {
        //           "LocationCode": "ISB"
        //         },
        //         "DestinationLocation": {
        //           "LocationCode": "LCY"
        //         },
        //         "RPH": "1",
        //         "TPA_Extensions": {
        //           "Flight": [
        //             {
        //               "Airline": {
        //                 "Marketing": "QR",
        //                 "Operating": "QR"
        //               },
        //               "ArrivalDateTime": "2025-03-23T11:10:00",
        //               "ClassOfService": "Y",
        //               "DepartureDateTime": "2025-03-23T09:30:00",
        //               "DestinationLocation": {
        //                 "LocationCode": "DOH"
        //               },
        //               "Number": 615,
        //               "OriginLocation": {
        //                 "LocationCode": "ISB"
        //               },
        //               "Type": "A"
        //             },
        //             {
        //               "Airline": {
        //                 "Marketing": "QR",
        //                 "Operating": "QR"
        //               },
        //               "ArrivalDateTime": "2025-03-23T19:55:00",
        //               "ClassOfService": "Y",
        //               "DepartureDateTime": "2025-03-23T14:30:00",
        //               "DestinationLocation": {
        //                 "LocationCode": "MAN"
        //               },
        //               "Number": 23,
        //               "OriginLocation": {
        //                 "LocationCode": "DOH"
        //               },
        //               "Type": "A"
        //             },
        //             {
        //               "Airline": {
        //                 "Marketing": "9B",
        //                 "Operating": "9B"
        //               },
        //               "ArrivalDateTime": "2025-03-23T08:45:00",
        //               "ClassOfService": "Y",
        //               "DepartureDateTime": "2025-03-23T05:05:00",
        //               "DestinationLocation": {
        //                 "LocationCode": "LCY"
        //               },
        //               "Number": 6977,
        //               "OriginLocation": {
        //                 "LocationCode": "QQM"
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
        //         "FareQualifier": "ADVJR1"
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

        let searchRequest ={
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
            "OriginDestinationInformation": [
              {
                "DepartureDateTime": "2025-03-23T03:35:00",
                "OriginLocation": {
                  "LocationCode": "ISB"
                },
                "DestinationLocation": {
                  "LocationCode": "LCY"
                },
                "RPH": "1",
                "TPA_Extensions": {
                  "Flight": [
                    {
                      "Airline": {
                        "Marketing": "QR",
                        "Operating": "QR"
                      },
                      "ArrivalDateTime": "2025-03-23T05:15:00",
                      "ClassOfService": "Y",
                      "DepartureDateTime": "2025-03-23T03:35:00",
                      "DestinationLocation": {
                        "LocationCode": "DOH"
                      },
                      "Number": 633,
                      "OriginLocation": {
                        "LocationCode": "ISB"
                      },
                      "Type": "A"
                    },
                    {
                      "Airline": {
                        "Marketing": "QR",
                        "Operating": "QR"
                      },
                      "ArrivalDateTime": "2025-03-23T13:10:00",
                      "ClassOfService": "Y",
                      "DepartureDateTime": "2025-03-23T07:40:00",
                      "DestinationLocation": {
                        "LocationCode": "EDI"
                      },
                      "Number": 29,
                      "OriginLocation": {
                        "LocationCode": "DOH"
                      },
                      "Type": "A"
                    },
                    {
                      "Airline": {
                        "Marketing": "BA",
                        "Operating": "BA"
                      },
                      "ArrivalDateTime": "2025-03-23T17:30:00",
                      "ClassOfService": "Y",
                      "DepartureDateTime": "2025-03-23T16:00:00",
                      "DestinationLocation": {
                        "LocationCode": "LCY"
                      },
                      "Number": 8707,
                      "OriginLocation": {
                        "LocationCode": "EDI"
                      },
                      "Type": "A"
                    }
                  ]
                }
              }
            ],
            "TravelPreferences": {
              "CabinPref": [
                {
                  "Cabin": "Y"
                }
              ]
            },
            "TravelerInfoSummary": {
              "AirTravelerAvail": [
                {
                  "PassengerTypeQuantity": [
                    {
                      "Code": "ADT",
                      "Quantity": 1
                    }
                  ]
                }
              ],
              "PriceRequestInformation": {
                "CurrencyCode": "SAR",
                "FareQualifier": "ADVJR1"
              }
            },
            "TPA_Extensions": {
              "IntelliSellTransaction": {
                "RequestType": {
                  "Name": "Revalidate"
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
            // console.log(result)

            return response.status(200).json({
              status: true,
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
    }
}