const { JsonHandler , FlightBooking, Flight, Segment, Passenger  } = require('../database/models');
const AppConst = require('../appConst');
const airports = require('../public/files/locations.json');
const locationHelper = require('../Helpers/LocationHelper');


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

        const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;
        
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
                    },
                    "RichContent": {
                      "FlightAmenities": true, // Moved here to request amenities
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
              // return response.status(200).json(result);
              if(result.status == "NotProcessed")
              {
                return response.status(500).json({
                    status: false,
                    message: result.message,
                    error: result.errorCode,
                }); 
              }

              //return response.status(200).json(result);
              //return response.status(200).json(result.groupedItineraryResponse.itineraryGroups[0].itineraries[0])
              let foundItenararies = result.groupedItineraryResponse.statistics.itineraryCount;

              if(!foundItenararies){
                return response.status(200).json({
                  status: false,
                  message: "No flight found.",
                });
              }




        let flightAmenities = result.groupedItineraryResponse.flightAmenities;
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
        let mappedEntertainment = flightAmenities.entertainment ? Object.fromEntries(flightAmenities.entertainment.map( entertainment => [entertainment.id , entertainment])) : [];
        let mappedFood = flightAmenities.food ? Object.fromEntries(flightAmenities.food.map( food => [food.id , food])) : [];
        let mappedLayout = flightAmenities.layout ? Object.fromEntries(flightAmenities.layout.map( layout => [layout.id , layout])) : [];
        let mappedPower = flightAmenities.power ? Object.fromEntries(flightAmenities.power.map( power => [power.id , power])) : [];
        let mappedSeat = flightAmenities.seat ? Object.fromEntries(flightAmenities.seat.map( seat => [seat.id , seat])) : [];
        let mappedWifi = flightAmenities.wifi ? Object.fromEntries(flightAmenities.wifi.map( wifi => [wifi.id , wifi])) : [];

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
                let segmentAmenitiesList = []; 
                let newAmenities = [];

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

                        //new amenities code starts here
                        namenitiesDetail = {};
                        namenitiesDetail.passengerType = passenger.passengerInfo.passengerType;
                        namenitiesDetail.scheduleDetail = [];

                        //new amenities code ends here


                        // passenger fare components
                        passengerDetail.FareComponents = passengerFareComponentList.map( pfc => {
                            
                            //new amenities code starts here
                            passengerScheduleList = {};
                            passengerScheduleList.beginAirport = pfc.beginAirport;
                            passengerScheduleList.endAirport = pfc.endAirport;
                            passengerScheduleList.segments = []


                            //new amenities code ends here

                            let segmentList = pfc.segments;
                            let segmentAmenities = []; 
                            segmentList.forEach( (segment , index) => {

                              let amenitiesList = segment.segment.flightAmenities;
                              
                              if(amenitiesList){
                                amenitiesList.forEach( eachAmenity => {

                                  let amenitiesInformation = [];
                                  for(const key in eachAmenity){
                                    // console.log(key)
                                    switch (key){
                                      case "entertainmentRef":
                                        amenitiesInformation.push({ key : "entertainment" ,  ...mappedEntertainment[eachAmenity[key]] });
                                      break;
                                      case "foodRef":
                                        amenitiesInformation.push({ key : "food" ,  ...mappedFood[eachAmenity[key]] });
                                      break;
                                      case "layoutRef":
                                        amenitiesInformation.push({ key : "layout" ,  ...mappedLayout[eachAmenity[key]] });
                                      break;
                                      case "powerRef":
                                        amenitiesInformation.push({ key : "power" ,  ...mappedPower[eachAmenity[key]] });
                                      break;
                                      case "seatRef":
                                        amenitiesInformation.push({ key : "seat" ,  ...mappedSeat[eachAmenity[key]] });
                                      break;
                                      case "wifiRef":
                                        amenitiesInformation.push({ key : "wifi" ,  ...mappedWifi[eachAmenity[key]] });
                                      break;
                                    }
                                  }

                                  passengerScheduleList.segments.push({segmentIndex : (index + 1) ,  amenitiesList : amenitiesInformation});
                                  segmentAmenities.push(amenitiesInformation);
                                })
                              }
                              

                          })
                          //new code starts here
                          namenitiesDetail.scheduleDetail.push(passengerScheduleList)
                          //new code ends here 
                          segmentAmenitiesList.push({ segments : segmentAmenities});

                            let fareComponentDetail = mappedFareComponent[pfc.ref];
                            // console.log(segmentAmenitiesList);
                            // let amenities = segmentAmenitiesList;
                            return { 
                                beginAirport : pfc.beginAirport, 
                                endAirport : pfc.endAirport,
                                segments : pfc.segments,
                                fareComponentDetail :fareComponentDetail,
                                // amenities : segmentAmenitiesList
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



                        newAmenities.push(namenitiesDetail);

                        return passengerDetail;

                    })

                    priceDetail.push(price);

                })

                // console.log("Here is detail -------------------------------------");
                // console.log( priceDetail[0][0].fare.passengerInfoList[0].passengerInfo.taxes );
                // // price.passengerList
                // throw '';
                return {  
                  priceSource : priceSource, 
                  legIds : legIds, 
                  legList : legDetail, 
                  passengerPriceDetail : priceDetail,   
                  amenities : segmentAmenitiesList,
                  amenities1 : newAmenities 
                };
            });

            itineraryGroupDetail.push({ description : groupDescription , itinerariesList : itinerariesList });
       });


       //new code starts here
       let amounts = [], transitsAmount = [];
       let minimumAmount =null, maximumAmount = null;
       itineraryGroupDetail.forEach( group => {

          group.itinerariesList.forEach( itenerary => {
            let legs = itenerary.legList //array
            let passengerPriceDetail = itenerary.passengerPriceDetail; // array

              passengerPriceDetail.forEach( priceDetail => {

                let totalFareDetail = priceDetail.totalFareDetail;
                  amounts.push(totalFareDetail.totalPrice);

              });

          })

       });
       //new code ends here
       minimumAmount = Math.min(...amounts);
       maximumAmount = Math.max(...amounts);


                // let token = await JsonHandler.findOne({
                //     where : { type : appConst.sabreFlights }
                // })

              //return response.status(200).json(itineraryGroupDetail[0].itinerariesList[0])
              
              // );

                return response.status(200).json({
                    status: true,
                    // data : result
                    // data : itineraryGroupDetail
                    data: { itineraryGroupDetail , minimumAmount , maximumAmount },
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
      try{
        const tokenDetail = await JsonHandler.findOne({
            where : {type : AppConst.sabreFlights}
        });
        const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;
        
        let endpoint = 'https://api.cert.sabre.com/v4/shop/flights/revalidate';
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
      try{
          const tokenDetail = await JsonHandler.findOne({
            where : {type : AppConst.sabreFlights}
          });
          let userId = request.user.id;
          const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;
          const {passengers , passengerCounts , flights } = request.body;
          let endpoint = 'https://api.cert.sabre.com/v2.5.0/passenger/records?mode=create';
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken}`);
          myHeaders.append("Content-Type", "application/json");
          
          let passengerList = passengers.map( (passenger , index) =>{
              return {
                "GivenName": passenger.firstname,
                "Surname": passenger.lastname,
                "PassengerType": passenger.type,
              }
          })

          //required for adult persons
          let contactList = passengers.filter( passenger =>{
            return passenger.type === 'ADT';
          }).map( (passenger , index) => {
            return {
              "NameNumber": `${index+1}.1`,
              "Phone": passenger.phone,
              "PhoneUseType": "H"
            }
          })

          let countList = passengerCounts.map( (passenger) => {
            return {
              "Code": passenger.type,
              "Quantity": String(passenger.total)  // Matches the two passengers and NumberInParty
            }
          })
          let segmentList = [];

          flights.forEach( (flight) => {
            flight.segments.forEach(segment => {
              let thisSegment =  {
                "DepartureDateTime": segment.departureDate,
                "ArrivalDateTime": segment.arrivalDate,
                "ResBookDesigCode": "Y",
                "FlightNumber": String(segment.number),
                "Status": "HK",
                "NumberInParty": String(segment.totalPassenger),
                "OriginLocation": {"LocationCode": segment.origin},
                "DestinationLocation": {"LocationCode":segment.destination},
                "MarketingAirline": {"Code": segment.code, "FlightNumber": String(segment.number)}
              }
              segmentList.push(thisSegment);
            })
          })


          let searchRequest = {
            "CreatePassengerNameRecordRQ": {
              "version": "2.5.0",
              "TravelItineraryAddInfo": {
                "CustomerInfo": {
                  "PersonName": passengerList,
                  "ContactNumbers": {
                    "ContactNumber": contactList
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
                  "FlightSegment": segmentList
                }
              },
              "AirPrice": [
                {
                  "PriceRequestInformation": {
                    "Retain": true,
                    "OptionalQualifiers": {
                      "PricingQualifiers": {
                        "PassengerType": countList
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


           // let searchRequest = {
          //   "CreatePassengerNameRecordRQ": {
          //     "version": "2.5.0",
          //     "TravelItineraryAddInfo": {
          //       "CustomerInfo": {
          //         "PersonName": [
          //           {
          //             "GivenName": "John",
          //             "Surname": "Aflen",
          //             "PassengerType": "ADT",
          //             "NameNumber": "1.1"
          //           }
          //         ],
          //         "ContactNumbers": {
          //           "ContactNumber": [
          //             {
          //               "NameNumber": "1.1",
          //               "Phone": "3545642324324",
          //               "PhoneUseType": "H"
          //             },
          //           ]
          //         }
          //       },
          //       "AgencyInfo": {
          //         "Address": {
          //           "AddressLine": "Test Agency",
          //           "CityName": "Jeddah",
          //           "CountryCode": "SA"
          //         },
          //         "Ticketing": {
          //           "TicketType": "7TAW"
          //         }
          //       }
          //     },
          //     "AirBook": {
          //       "OriginDestinationInformation": {
          //         "FlightSegment": [
          //           {
          //             "DepartureDateTime": "2025-04-01T10:00:00",
          //             "ArrivalDateTime": "2025-04-01T11:55:00",
          //             "ResBookDesigCode": "Y",
          //             "FlightNumber": "301",
          //             "Status": "HK",
          //             "NumberInParty": "1",
          //             "OriginLocation": {"LocationCode": "ISB"},
          //             "DestinationLocation": {"LocationCode": "KHI"},
          //             "MarketingAirline": {"Code": "PK", "FlightNumber": "301"}
          //           },
          //           {
          //             "DepartureDateTime": "2025-04-06T07:00:00",
          //             "ArrivalDateTime": "2025-04-06T08:55:00",
          //             "ResBookDesigCode": "Y",
          //             "FlightNumber": "300",
          //             "Status": "HK",
          //             "NumberInParty": "1",
          //             "OriginLocation": {"LocationCode": "KHI"},
          //             "DestinationLocation": {"LocationCode": "ISB"},
          //             "MarketingAirline": {"Code": "PK", "FlightNumber": "300"}
          //           }
          //         ]
          //       }
          //     },
          //     "AirPrice": [
          //       {
          //         "PriceRequestInformation": {
          //           "Retain": true,
          //           "OptionalQualifiers": {
          //             "PricingQualifiers": {
          //               "PassengerType": [
          //                 {
          //                   "Code": "ADT",
          //                   "Quantity": "1"  // Matches the two passengers and NumberInParty
          //                 }
          //               ]
          //             }
          //           }
          //         }
          //       }
          //     ],
          //     "PostProcessing": {
          //       "EndTransaction": {
          //         "Source": {
          //           "ReceivedFrom": "Test User"
          //         }
          //       }
          //     }
          //   }
          // };


        
        
        

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(searchRequest),
            redirect: "follow"
        };

        fetch( endpoint , requestOptions)
        .then((response) => response.json()) 
        .then(async (result) => {

          if(
            result.CreatePassengerNameRecordRS && 
            result.CreatePassengerNameRecordRS.ApplicationResults &&
            result.CreatePassengerNameRecordRS.ApplicationResults.status == "Complete"
          ){
            let PNR = result.CreatePassengerNameRecordRS.ItineraryRef.ID;
            let totalAmount =result.CreatePassengerNameRecordRS.AirPrice[0].PriceQuote.PricedItinerary.TotalAmount;
            let bookingDetail =await FlightBooking.create({
                                                  user_id : userId,
                                                  is_applied_code	: 0,
                                                  status : 1,
                                                  pnr : PNR,
                                                  amount : totalAmount
                                                })

            let flightBookingId = bookingDetail.id;
            await Promise.all(
              passengers.map(passenger => {
                return Passenger.create({
                  flight_booking_id: flightBookingId,
                  firstname: passenger.firstname,
                  lastname: passenger.lastname,
                  phone: passenger.phone || null,
                  type: passenger.type
                });
              })
            );
                                            
                                                
          await Promise.all(
            flights.map(async (flight) => {
              const createdFlight = await Flight.create({
                booking_id: flightBookingId,
                origin: flight.description.departure_location,
                destination: flight.description.arrival_location,
                country :locationHelper.locationDetail(flight.description.arrival_location).country,
                date: flight.description.departure_date
              });
      
              await Promise.all(
                flight.segments.map(segment => {
                  return Segment.create({
                    flight_id: createdFlight.id,
                    departure_date: segment.departureDate,
                    arrival_date: segment.arrivalDate,
                    flight_number: segment.number,
                    flight_code: segment.code
                  });
                })
              );
            })
          );

          return response.status(200).json({
            status : true,
            message : "Booking created successfully"
          });
  
        } else {
          return response.status(200).json({ status : false , data : result});
        }


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