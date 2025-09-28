const { JsonHandler , FlightBooking, Flight, Segment, Passenger , User , Promotion  } = require('../database/models');
const AppConst = require('../appConst');
const airports = require('../public/files/locations.json');
const locationHelper = require('../Helpers/LocationHelper');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const moment = require('moment')
const transport = require('../config/mailConfig');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

module.exports = {

    airportList : async (request , response) => {
      const { searchQuery } = request.body;
      try{
        filteredAirports = airports.filter( airport => {
          let airportCode = airport.code.toLowerCase();
          let airportName = airport.name.toLowerCase();
          let airportCity = airport.city.toLowerCase();
          return airportCode.includes(searchQuery.toLowerCase()) || airportName.includes(searchQuery.toLowerCase()) || airportCity.includes(searchQuery.toLowerCase());
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
        const { destinationList , passengerList , travelClass } = request.body;
        console.log(travelClass);
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
                  "TravelPreferences": {
                    "CabinPref": [
                      {
                        "Cabin": travelClass, // Y=Economy, C=Business, F=First
                        "PreferLevel": "Preferred"
                      }
                    ],
                    "TPA_Extensions": {}
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
              
        
    //     return;
       itineraryGroups.forEach(group => {
    let groupDescription = group.groupDescription;
    let groupItineraries = group.itineraries || [];

    let itinerariesList = groupItineraries.map(gi => {
        let priceSource = gi.pricingSource;
        let legIds = (gi.legs || []).map(leg => leg.ref);

        let legDetail = legIds.map(leg => {
            let legInformation = {};
            let legSchedule = mappedLegs?.[leg]?.schedules || [];
            let scheduleList = legSchedule.map(ls => mappedSchedule?.[ls.ref]);
            legInformation.id = leg;
            legInformation.schedule = scheduleList;

            return legInformation;
        });

        let priceInformationList = gi.pricingInformation || [];
        let priceDetail = [];
        let segmentAmenitiesList = [];
        let newAmenities = [];

        priceInformationList.forEach(pi => {
            let price = {};
            price.priceSubSource = pi.pricingSubsource;
            price.distributionModel = pi.distributionModel;
            price.lastTicketDate = pi.fare?.lastTicketDate;
            price.lastTicketTime = pi.fare?.lastTicketTime;
            price.totalFareDetail = pi.fare?.totalFare;

            // passenger list code starts here
            price.passengerList = pi.fare?.passengerInfoList?.map(passenger => {
                let passengerDetail = {};
                passengerDetail.type = passenger.passengerInfo?.passengerType;
                passengerDetail.total = passenger.passengerInfo?.passengerNumber;
                passengerDetail.refundable = passenger.passengerInfo?.refundable;
                passengerDetail.nonRefundable = passenger.passengerInfo?.nonRefundable;
                let passengerFareComponentList = passenger.passengerInfo?.fareComponents || [];

                // new amenities code
                let namenitiesDetail = {};
                namenitiesDetail.passengerType = passenger.passengerInfo?.passengerType;
                namenitiesDetail.scheduleDetail = [];

                // passenger fare components
                passengerDetail.FareComponents = passengerFareComponentList.map(pfc => {
                    let passengerScheduleList = {};
                    passengerScheduleList.beginAirport = pfc.beginAirport;
                    passengerScheduleList.endAirport = pfc.endAirport;
                    passengerScheduleList.segments = [];

                    let segmentList = pfc.segments || [];
                    let segmentAmenities = [];

                    segmentList.forEach((segment, index) => {
                        let amenitiesList = segment?.segment?.flightAmenities || [];
                        amenitiesList.forEach(eachAmenity => {
                            let amenitiesInformation = [];
                            for (const key in eachAmenity) {
                                switch (key) {
                                    case "entertainmentRef":
                                        amenitiesInformation.push({ key: "entertainment", ...(mappedEntertainment?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "foodRef":
                                        amenitiesInformation.push({ key: "food", ...(mappedFood?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "layoutRef":
                                        amenitiesInformation.push({ key: "layout", ...(mappedLayout?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "powerRef":
                                        amenitiesInformation.push({ key: "power", ...(mappedPower?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "seatRef":
                                        amenitiesInformation.push({ key: "seat", ...(mappedSeat?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "wifiRef":
                                        amenitiesInformation.push({ key: "wifi", ...(mappedWifi?.[eachAmenity[key]] || {}) });
                                        break;
                                }
                            }

                            passengerScheduleList.segments.push({ segmentIndex: (index + 1), amenitiesList: amenitiesInformation });
                            segmentAmenities.push(amenitiesInformation);
                        });
                    });

                    namenitiesDetail.scheduleDetail.push(passengerScheduleList);
                    segmentAmenitiesList.push({ segments: segmentAmenities });

                    let fareComponentDetail = mappedFareComponent?.[pfc.ref];

                    return {
                        beginAirport: pfc.beginAirport,
                        endAirport: pfc.endAirport,
                        segments: pfc.segments,
                        fareComponentDetail: fareComponentDetail
                    };
                });

                // passenger taxes
                passengerDetail.taxes = (passenger.passengerInfo?.taxes || []).map(tax => mappedTax?.[tax.ref]);
                passengerDetail.taxSummary = (passenger.passengerInfo?.taxSummaries || []).map(summary => mappedTaxSummary?.[summary.ref]);
                passengerDetail.obFees = (passenger.passengerInfo?.obFees || []).map(of => mappedObFees?.[of.ref]);

                passengerDetail.baggageInformation = (passenger.passengerInfo?.baggageInformation || []).map(bi => {
                    return {
                        baggageProvision: bi.provisionType,
                        airlineCode: bi.airlineCode,
                        segments: bi.segments,
                        detail: mappedBaggages?.[bi.allowance?.ref]
                    };
                });

                passengerDetail.currencyConversion = passenger.passengerInfo?.currencyConversion;
                passengerDetail.passengerTotalFare = passenger.passengerInfo?.passengerTotalFare;

                newAmenities.push(namenitiesDetail);

                return passengerDetail;
            }) || [];

            priceDetail.push(price);
        });

        return {
            priceSource: priceSource,
            legIds: legIds,
            legList: legDetail,
            passengerPriceDetail: priceDetail,
            amenities: segmentAmenitiesList,
            amenities1: newAmenities
        };
    });

    itineraryGroupDetail.push({
        description: groupDescription,
        itinerariesList: itinerariesList
    });
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
      //return response.status(200).json(itineraryGroupDetail[0].itinerariesList[0])
       const simplifiedItineraries = itineraryGroupDetail.map((group) => ({
          groupDescription: group.description,
          itineraries: group.itinerariesList,
          itineraries: simplifyFlightResponse(group.itinerariesList , group.description),
        }));


                // let token = await JsonHandler.findOne({
                //     where : { type : appConst.sabreFlights }
                // })

              //return response.status(200).json(itineraryGroupDetail[0].itinerariesList[0])
              
              // );
                // ItineraryList  = itineraryGroupDetail[0].itinerariesList[0];
                // { ItineraryList }
                // { itineraryGroupDetail , minimumAmount , maximumAmount },

                //  minimumAmount,
                //     maximumAmount,

                return response.status(200).json({
                    status: true,
                    data: { simplifiedItineraries},
                });

                // return response.status(200).json({
                //     status: true,
                   
                //     // data : itineraryGroupDetail
                //     data: { simplifiedItineraries :  simplifiedItineraries[0].itineraries[0]},
                // });
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
          const uuid = uuidv4();
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
            let totalBaseFare = 0;
            let totalTaxAmount = 0;
            let totalAmount = 0;

            const priceInformation = result?.CreatePassengerNameRecordRS?.AirPrice?.[0]?.PriceQuote?.MiscInformation?.SolutionInformation?.[0] || null;

            if (priceInformation) {
              totalBaseFare = priceInformation.GrandTotalBaseFareAmount || request.totalBaseFare || 0;
              totalTaxAmount = priceInformation.GrandTotalTaxes || request.totalTaxAmount || 0;
              totalAmount = priceInformation.TotalAmount || request.totalAmount || 0;
            }
            
            let bookingDetail =await FlightBooking.create({
                                                  user_id : userId,
                                                  uuid : uuid,
                                                  is_applied_code	: request.body.codeId ? 1 : 0,
                                                  status : 1,
                                                  codeId: request.body.codeId ? request.body.codeId : null, 
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
                  type: passenger.type,
                  passport: passenger.passport
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
                date: flight.description.departure_date,
                transits: flight.segments.length
              });
      
              await Promise.all(
                flight.segments.map(segment => {
                  return Segment.create({
                    flight_id: createdFlight.id,
                    departure_date: segment.departureDate,
                    arrival_date: segment.arrivalDate,
                    flight_number: segment.number,
                    flight_code: segment.code,
                    stops: segment.stops
                  });
                })
              );
            })
          );


          flightsDetail = flights.map( flight => {
              return {
                origin: flight.description.departure_location,
                destination: flight.description.arrival_location,
                origin_country:locationHelper.locationDetail(flight.description.departure_location).country,
                destination_country :locationHelper.locationDetail(flight.description.arrival_location).country,
                date: flight.description.departure_date,
                segments: flight.segments.map( segment => {
                    return {
                            departure_date: segment.departureDate,
                            arrival_date: segment.arrivalDate,
                            flight_number: segment.number,
                            flight_code: segment.code
                          }
                })
              }
          })

          const invoiceTemplate =  path.join(__dirname, '../public/views/invoice.ejs');
          const pdfData = {
                            pnr : PNR,
                            totalBaseFare: totalBaseFare,
                            totalTaxAmount: totalTaxAmount,
                            totalAmount :totalAmount,
                            passengers : passengers,
                            flights: flightsDetail
                          } 
          const html = await ejs.renderFile(invoiceTemplate, pdfData);
          // const browser = await puppeteer.launch();
          const browser = await puppeteer.launch({
                                        headless: true,
                                        args: [
                                          '--no-sandbox',
                                          '--disable-setuid-sandbox',
                                          '--disable-dev-shm-usage',
                                          '--disable-accelerated-2d-canvas',
                                          '--no-zygote',
                                          '--single-process',
                                          '--disable-gpu'
                                        ]
                                      });
          const page = await browser.newPage();
          await page.setContent(html, { waitUntil: 'load' });
          const fileName = moment().unix()+"-"+request.user.name+"-"+PNR+".pdf";
          const pdfPath = path.join(__dirname, `../public/uploads/invoices/${fileName}`);
          await page.pdf({ path: pdfPath, format: 'A4' });
          await browser.close();

          const pdfUrl = `${process.env.APP_URL}/uploads/invoices/${fileName}`;

          const mailOptions = {
                                    from: process.env.EMAIL_FROM,
                                    to: request.user.email,
                                    subject: `Flight Booking Invoice - PNR ${PNR}`,
                                    text: `Dear Customer,\n\nYour flight booking has been confirmed. Please find the invoice attached.\n\nPNR\nBest regards,\nHalasky`,
                                    attachments: [
                                      {
                                        filename: `invoice-${PNR}.pdf`,
                                        path: pdfPath,
                                        contentType: 'application/pdf'
                                      }
                                    ]
                                  };
          
            transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent successfully:', info.response);
              }
            });

          return response.status(200).json({
            status : true,
            message : "Booking created successfully",
            downloadUrl : pdfUrl
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
    },

    userBookings : async (request , response)=>{
      try{
        const userId = request.user.id;
        const flightBookings = await FlightBooking.findAll({
                                                where: {
                                                  user_id: userId,
                                                },
                                                include: [
                                                  {
                                                    model: User,
                                                    as: 'user',
                                                  },
                                                  {
                                                    model: Promotion,
                                                    as: 'promotion',
                                                    attributes: ['id', 'code'],
                                                    required: false,
                                                  },
                                                  {
                                                    model: Passenger,
                                                    as: 'passengers',
                                                  },
                                                  {
                                                    model: Flight,
                                                    as: 'flights',
                                                    attributes: ['id', 'origin', 'destination', 'country', 'date'],
                                                    include: [
                                                      {
                                                        model: Segment,
                                                        as: 'segments',
                                                        attributes: ['id', 'departure_date', 'arrival_date', 'flight_number', 'flight_code'],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              });
          return response.status(200).json({ status : true , data : flightBookings});
     } catch (error){
          return response.status(500).json({
              status: false,
              message: 'Something Went Wrong',
              error: error.message,
          });
      }
  },



///////////////////////////////////////////////////////////////////////////////
testFlightList : async (request ,response)=>{
        const { destinationList , passengerList , travelClass } = request.body;
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
        
        try{
            let endpoint = 'https://api.cert.sabre.com/v5/offers/shop';
            
    
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

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
                  "TravelPreferences": {
                    "CabinPref": [
                      {
                        "Cabin": travelClass, // Y=Economy, C=Business, F=First
                        "PreferLevel": "Preferred"
                      }
                    ],
                    "TPA_Extensions": {}
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
              //return response.status(200).json(result);
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
            
            let itinerariesList = groupItineraries.map(gi => {
        let priceSource = gi.pricingSource;
        let legIds = (gi.legs || []).map(leg => leg.ref);

        let legDetail = legIds.map(leg => {
            let legInformation = {};
            let legSchedule = mappedLegs?.[leg]?.schedules || [];
            let scheduleList = legSchedule.map(ls => mappedSchedule?.[ls.ref]);
            legInformation.id = leg;
            legInformation.schedule = scheduleList;

            return legInformation;
        });

        let priceInformationList = gi.pricingInformation || [];
        let priceDetail = [];
        let segmentAmenitiesList = [];
        let newAmenities = [];

        priceInformationList.forEach(pi => {
            let price = {};
            price.priceSubSource = pi.pricingSubsource;
            price.distributionModel = pi.distributionModel;
            price.lastTicketDate = pi.fare?.lastTicketDate;
            price.lastTicketTime = pi.fare?.lastTicketTime;
            price.totalFareDetail = pi.fare?.totalFare;

            // passenger list code starts here
            price.passengerList = pi.fare?.passengerInfoList?.map(passenger => {
                let passengerDetail = {};
                passengerDetail.type = passenger.passengerInfo?.passengerType;
                passengerDetail.total = passenger.passengerInfo?.passengerNumber;
                passengerDetail.refundable = passenger.passengerInfo?.refundable;
                passengerDetail.nonRefundable = passenger.passengerInfo?.nonRefundable;
                let passengerFareComponentList = passenger.passengerInfo?.fareComponents || [];

                // new amenities code
                let namenitiesDetail = {};
                namenitiesDetail.passengerType = passenger.passengerInfo?.passengerType;
                namenitiesDetail.scheduleDetail = [];

                // passenger fare components
                passengerDetail.FareComponents = passengerFareComponentList.map(pfc => {
                    let passengerScheduleList = {};
                    passengerScheduleList.beginAirport = pfc.beginAirport;
                    passengerScheduleList.endAirport = pfc.endAirport;
                    passengerScheduleList.segments = [];

                    let segmentList = pfc.segments || [];
                    let segmentAmenities = [];

                    segmentList.forEach((segment, index) => {
                        let amenitiesList = segment?.segment?.flightAmenities || [];
                        amenitiesList.forEach(eachAmenity => {
                            let amenitiesInformation = [];
                            for (const key in eachAmenity) {
                                switch (key) {
                                    case "entertainmentRef":
                                        amenitiesInformation.push({ key: "entertainment", ...(mappedEntertainment?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "foodRef":
                                        amenitiesInformation.push({ key: "food", ...(mappedFood?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "layoutRef":
                                        amenitiesInformation.push({ key: "layout", ...(mappedLayout?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "powerRef":
                                        amenitiesInformation.push({ key: "power", ...(mappedPower?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "seatRef":
                                        amenitiesInformation.push({ key: "seat", ...(mappedSeat?.[eachAmenity[key]] || {}) });
                                        break;
                                    case "wifiRef":
                                        amenitiesInformation.push({ key: "wifi", ...(mappedWifi?.[eachAmenity[key]] || {}) });
                                        break;
                                }
                            }

                            passengerScheduleList.segments.push({ segmentIndex: (index + 1), amenitiesList: amenitiesInformation });
                            segmentAmenities.push(amenitiesInformation);
                        });
                    });

                    namenitiesDetail.scheduleDetail.push(passengerScheduleList);
                    segmentAmenitiesList.push({ segments: segmentAmenities });

                    let fareComponentDetail = mappedFareComponent?.[pfc.ref];

                    return {
                        beginAirport: pfc.beginAirport,
                        endAirport: pfc.endAirport,
                        segments: pfc.segments,
                        fareComponentDetail: fareComponentDetail
                    };
                });

                // passenger taxes
                passengerDetail.taxes = (passenger.passengerInfo?.taxes || []).map(tax => mappedTax?.[tax.ref]);
                passengerDetail.taxSummary = (passenger.passengerInfo?.taxSummaries || []).map(summary => mappedTaxSummary?.[summary.ref]);
                passengerDetail.obFees = (passenger.passengerInfo?.obFees || []).map(of => mappedObFees?.[of.ref]);

                passengerDetail.baggageInformation = (passenger.passengerInfo?.baggageInformation || []).map(bi => {
                    return {
                        baggageProvision: bi.provisionType,
                        airlineCode: bi.airlineCode,
                        segments: bi.segments,
                        detail: mappedBaggages?.[bi.allowance?.ref]
                    };
                });

                passengerDetail.currencyConversion = passenger.passengerInfo?.currencyConversion;
                passengerDetail.passengerTotalFare = passenger.passengerInfo?.passengerTotalFare;

                newAmenities.push(namenitiesDetail);

                return passengerDetail;
            }) || [];

            priceDetail.push(price);
        });

        return {
            priceSource: priceSource,
            legIds: legIds,
            legList: legDetail,
            passengerPriceDetail: priceDetail,
            amenities: segmentAmenitiesList,
            amenities1: newAmenities
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
      
                return response.status(200).json({
                    status: true,
                     data : itineraryGroupDetail[0].itinerariesList[0]
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
//////////////////////////////////////////////////////////////////////////////




separateFlightList: async (request, response) => {
  const { destinationList, passengerList, travelClass } = request.body;

  const travelJson = destinationList.map(detail => ({
    DepartureDateTime: detail.travelDate,
    OriginLocation: { LocationCode: detail.DepartureAirport },
    DestinationLocation: { LocationCode: detail.ArrivalAirport },
  }));

  const passengerJson = passengerList
    .filter(passenger => passenger.total > 0)
    .map(passenger => ({
      Code: passenger.type,
      Quantity: passenger.total,
    }));

  const tokenDetail = await JsonHandler.findOne({
    where: { type: AppConst.sabreFlights },
  });

  const accessToken =
    typeof tokenDetail.information === "string"
      ? JSON.parse(tokenDetail.information).access_token
      : tokenDetail.information.access_token;

  try {
    const endpoint = "https://api.cert.sabre.com/v5/offers/shop";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const searchRequest = {
      OTA_AirLowFareSearchRQ: {
        Version: "5",
        POS: {
          Source: [
            {
              PseudoCityCode: "3GML",
              RequestorID: {
                Type: "1",
                ID: "1",
                CompanyName: { Code: "TN" },
              },
            },
          ],
        },
        OriginDestinationInformation: travelJson,
        TravelerInfoSummary: {
          AirTravelerAvail: [
            {
              PassengerTypeQuantity: passengerJson,
            },
          ],
        },
        TravelPreferences: {
          CabinPref: [
            {
              Cabin: travelClass,
              PreferLevel: "Preferred",
            },
          ],
          TPA_Extensions: {},
        },
        TPA_Extensions: {
          IntelliSellTransaction: {
            RequestType: { Name: "50ITINS" },
          },
          RichContent: {
            FlightAmenities: true,
          },
        },
      },
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(searchRequest),
    };

    fetch(endpoint, requestOptions)
      .then(res => res.json())
      .then(async result => {
        if (result.status === "NotProcessed") {
          return response.status(500).json({
            status: false,
            message: result.message,
            error: result.errorCode,
          });
        }

        const grouped = result.groupedItineraryResponse;
        const itineraryGroups = grouped.itineraryGroups;
        const legs = Object.fromEntries(grouped.legDescs.map(l => [l.id, l]));
        const schedules = Object.fromEntries(grouped.scheduleDescs.map(s => [s.id, s]));
        const amenities = {
          entertainment: Object.fromEntries((grouped.flightAmenities?.entertainment || []).map(e => [e.id, e])),
          food: Object.fromEntries((grouped.flightAmenities?.food || []).map(e => [e.id, e])),
          layout: Object.fromEntries((grouped.flightAmenities?.layout || []).map(e => [e.id, e])),
          power: Object.fromEntries((grouped.flightAmenities?.power || []).map(e => [e.id, e])),
          seat: Object.fromEntries((grouped.flightAmenities?.seat || []).map(e => [e.id, e])),
          wifi: Object.fromEntries((grouped.flightAmenities?.wifi || []).map(e => [e.id, e])),
        };

        let allItineraries = [];

        itineraryGroups.forEach(group => {
          group.itineraries.forEach(itinerary => {
            const legDetails = (itinerary.legs || []).map(leg => {
              const schedulesList = (legs[leg.ref]?.schedules || []).map(s => schedules[s.ref]);
              return {
                legId: leg.ref,
                schedules: schedulesList,
              };
            });

            const prices = itinerary.pricingInformation.map(pi => ({
              pricingSubsource: pi.pricingSubsource,
              distributionModel: pi.distributionModel,
              totalFare: pi.fare?.totalFare,
              lastTicketDate: pi.fare?.lastTicketDate,
              lastTicketTime: pi.fare?.lastTicketTime,
            }));

            allItineraries.push({
              priceSource: itinerary.pricingSource,
              legs: legDetails,
              prices,
            });
          });
        });

        // Compute min/max prices
        const priceList = allItineraries.flatMap(i =>
          i.prices.map(p => parseFloat(p.totalFare?.totalPrice || 0))
        );
        const minimumAmount = Math.min(...priceList);
        const maximumAmount = Math.max(...priceList);

        return response.status(200).json({
          status: true,
          minFare: minimumAmount,
          maxFare: maximumAmount,
          itineraries: allItineraries[0],
        });
      })
      .catch(error =>
        response.status(500).json({
          status: false,
          message: "Something went wrong",
          error: error.message,
        })
      );
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
},



//////////////////////////////////////////////////////////////////////////////


 searchAlternateDatesFlights: async (request , response) => {
  try {
    // Get authentication token
    const {originLocation, destinationLocation, departureDate, passengerDetail} = request.body;

    const tokenDetail = await JsonHandler.findOne({
            where : {type : AppConst.sabreFlights}
        });
    const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;
    let endpoint = 'https://api.cert.sabre.com/v6.1.0/shop/altdates/flights?mode=live';
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    let passengers = passengerDetail.map(passenger => ({
        "Code": passenger.type,
        "Quantity": passenger.total
    }));

    const payload = {
        "OTA_AirLowFareSearchRQ": {
          "AvailableFlightsOnly": true,
          "Version": "6.1.0",
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
              "DepartureDateTime": departureDate,
              "OriginLocation": {
                "LocationCode": originLocation
              },
              "DestinationLocation": {
                "LocationCode": destinationLocation
              },
              "TPA_Extensions": {
                "ConnectionTime": {
                  "Max": 0
                }
              }
              
            },
           
          ],
          "TravelPreferences": {
            "ValidInterlineTicket": true,
            "TPA_Extensions": {
              "InterlineIndicator": {
                "Ind": true
              }
            }
          },
          "TravelerInfoSummary": {
            "AirTravelerAvail": [
              {
                "PassengerTypeQuantity": passengers
              }
            ]
          },
          "TPA_Extensions": {
            "IntelliSellTransaction": {
              "RequestType": {
                "Name": "AD3"
              }
            }
          }
        }
      }
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    };


    fetch( endpoint , requestOptions)
    .then((response) => response.json()) 
    .then(async (result) => {

      // return response.status(200).json({
      //             status: false,
      //             message: result,
      //           });
   
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
                        let passengerDetail = {};
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
                           
                          namenitiesDetail.scheduleDetail.push(passengerScheduleList)
                          //new code ends here 
                          // segmentAmenitiesList.push({ segments : segmentAmenities});

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
                  passengerPriceDetail : priceDetail
                };
            });

            itineraryGroupDetail.push({ description : groupDescription , itinerariesList : itinerariesList });
       });


       //new code starts here
       let amounts = [], transitsAmount = [];

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

      const simplifiedDetail = simplifyALTFlightResponse(itineraryGroupDetail)

      return response.status(200).json({
                    status: true,
                     data : simplifiedDetail,
                });
      
    })
    
  } catch (error) {
    return response.status(500).json({
                    status: false,
                    message: 'Something Went Wrong',
                    error: error,
                });
  }
},








/////////////////////////////////////////////////////////////////
// createBooking: async (request, response) => {
//   try {
//     const { originLocation, destinationLocation, departureDate, returnDate } = request.body;

//     // Get authentication token
//     const tokenDetail = await JsonHandler.findOne({
//       where: { type: AppConst.sabreFlights },
//     });
//     const accessToken =
//       typeof tokenDetail.information === "string"
//         ? JSON.parse(tokenDetail.information).access_token
//         : tokenDetail.information.access_token;

//     const endpoint = "https://api.cert.sabre.com/v1/trip/orders/createBooking";
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "application/json");

//     const payload = {
//       targetPcc: "3GML",
//       receivedFrom: "Wakanow",
//       asynchronousUpdateWaitTime: 1000,
//       agency: {
//         address: {
//           street: null,
//           city: "Sabre",
//           stateProvince: "Lagos",
//           postalCode: "Sabre",
//           countryCode: "NG",
//           name: "Wakanow",
//         },
//         ticketingPolicy: "TODAY",
//       },
//       contactInfo: {
//         emails: ["hello@wakanow.com"],
//         phones: ["07059647234"],
//       },
//       errorHandlingPolicy: [
//         "HALT_ON_ERROR",
//         "HALT_ON_INVALID_MINIMUM_CONNECTING_TIME_ERROR",
//       ],
//       flightDetails: {
//         haltOnFlightStatusCodes: ["NO", "NN", "US", "UN", "UU", "LL", "HL"],
//         flights: [
//           {
//             flightNumber: "316",
//             airlineCode: "XY",
//             fromAirportCode: "ISB",
//             toAirportCode: "RUH",
//             departureDate: "2025-08-12",
//             departureTime: "04:15",
//             bookingClass: "Y", // Using T to match Sabre response
//             flightStatusCode: "NN",
//             isMarriageGroup: false,
//           },
//           {
//             flightNumber: "219",
//             airlineCode: "XY",
//             fromAirportCode: "RUH",
//             toAirportCode: "DXB",
//             departureDate: "2025-08-12",
//             departureTime: "11:50",
//             bookingClass: "Y", // Using T to match Sabre response
//             flightStatusCode: "NN",
//             isMarriageGroup: false,
//           },
//         ],
//         flightPricing: [
//           {
//             qualifiers: {
//               passengersPricing: [
//                 {
//                   numberOfpassengers: 1,
//                   passengerCode: "ADT",
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       travelers: [
//         {
//           givenName: "Issac",
//           surname: "Newton",
//           birthDate: "1990-01-01",
//           passengerCode: "ADT",
//           identityDocuments: [
//             {
//               documentNumber: "PK123456789",
//               documentType: "PASSPORT",
//               expiryDate: "2027-12-25",
//               issuingCountryCode: "PK",
//               residenceCountryCode: "PK",
//               givenName: "Issac",
//               surname: "Newton",
//               birthDate: "1990-01-01",
//               gender: "MALE",
//             },
//             {
//               documentType: "SECURE_FLIGHT_PASSENGER_DATA",
//               givenName: "Issac",
//               surname: "Newton",
//               birthDate: "1990-01-01",
//               gender: "MALE",
//             },
//           ],
//           emails: ["issac@wakanow.com"],
//           phones: [
//             {
//               number: "00966-123456789", // Matching working payload's phone format
//             },
//           ],
//         },
//       ],
//       payment: {
//         formsOfPayment: [
//           {
//             type: "CASH",
//           },
//         ],
//       },
//       remarks: [
//         {
//           type: "GENERAL",
//           alphaCode: "T",
//           text: "GeneratedFromItinerary_14",
//         },
//         {
//           type: "INVOICE",
//           text: "S*UD1 1701765172", // Restored * to match working payload
//         },
//       ],
//       otherServices: [
//         {
//           airlineCode: "EK",
//           serviceMessage: "CTCM 00966123456789/EN",
//         },
//         {
//           airlineCode: "EK",
//           serviceMessage: "CTCE issac//wakanow.com/EN", // Matching working payload's CTCE
//         },
//       ],
      
//     };

//     console.log("Payload:", JSON.stringify(payload, null, 2)); // Log payload for debugging

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: JSON.stringify(payload),
//       redirect: "follow",
//     };

//     const result = await fetch(endpoint, requestOptions).then((res) => res.json());

//     return response.status(200).json({
//       status: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Booking Error:", error);
//     return response.status(500).json({
//       status: false,
//       message: "Something Went Wrong",
//       error: error.message,
//     });
//   }
// }



createBooking: async (request, response) => {
  try {
    const { passengers, passengerCounts, flights, codeId } = request.body;
    const userId = request.user.id;
    const uuid = uuidv4();
    // Get authentication token
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });
    const accessToken =
      typeof tokenDetail.information === "string"
        ? JSON.parse(tokenDetail.information).access_token
        : tokenDetail.information.access_token;

    const endpoint = "https://api.cert.sabre.com/v1/trip/orders/createBooking";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    // Map passengers to traveler list
    let travelerList = passengers.map((passenger) => {
  let traveler = {
    givenName: passenger.firstname,
    surname: passenger.lastname,
    birthDate: passenger.birthDate,
    passengerCode: passenger.type,
  };

  // Only add identity documents for ADT and CHD (not INF)
  if (passenger.type !== "INF") {
    traveler.identityDocuments = [
      {
        documentNumber: passenger.passport,
        documentType: "PASSPORT",
        expiryDate: passenger.expiryDate,
        issuingCountryCode: passenger.issuingCountryCode || "PK",
        residenceCountryCode: passenger.residenceCountryCode || "PK",
        givenName: passenger.firstname,
        surname: passenger.lastname,
        birthDate: passenger.birthDate,
        gender: passenger.gender || "MALE",
      },
      {
        documentType: "SECURE_FLIGHT_PASSENGER_DATA",
        givenName: passenger.firstname,
        surname: passenger.lastname,
        birthDate: passenger.birthDate,
        gender: passenger.gender || "MALE",
      },
    ];
  }

  // Only add email/phone for ADT and CHD (not INF)
  if (passenger.type !== "INF") {
    traveler.emails = [passenger.email || `${passenger.firstname.toLowerCase()}@example.com`];
    traveler.phones = [
      {
        number: passenger.phone || "00966-123456789",
      },
    ];
  }

  return traveler;
});



    // Map contact info for adults
    let contactList = passengers
      .filter((passenger) => passenger.type === "ADT")
      .map((passenger) => ({
        emails: [passenger.email || `${passenger.firstname.toLowerCase()}@example.com`],
        phones: [passenger.phone || "00966-123456789"],
      }));

    // Map passenger counts
    let countList = passengerCounts.map((passenger) => ({
      passengerCode: passenger.type,
      numberOfpassengers: passenger.total,
    }));

    // Map flight segments
    let flightList = flights.flatMap((flight) =>
      flight.segments.map((segment) => ({
        flightNumber: String(segment.number),
        airlineCode: segment.code,
        fromAirportCode: segment.origin,
        toAirportCode: segment.destination,
        departureDate: segment.departureDate,
        departureTime: segment.departureTime,
        bookingClass: "Y",
        flightStatusCode: "NN",
        isMarriageGroup: false,
      }))
    );

    const payload = {
      targetPcc: "3GML",
      receivedFrom: "Wakanow",
      asynchronousUpdateWaitTime: 1000,
      agency: {
        address: {
          city: "Sabre",
          stateProvince: "Lagos",
          postalCode: "Sabre",
          countryCode: "NG",
          name: "Wakanow",
        },
        ticketingPolicy: "TODAY",
      },
      contactInfo: contactList[0] || { emails: ["hello@wakanow.com"], phones: ["07059647234"] },
      errorHandlingPolicy: [
        "HALT_ON_ERROR",
        "HALT_ON_INVALID_MINIMUM_CONNECTING_TIME_ERROR",
      ],
      flightDetails: {
        haltOnFlightStatusCodes: ["NO", "NN", "US", "UN", "UU", "LL", "HL"],
        flights: flightList,
        flightPricing: [
          {
            qualifiers: {
              passengersPricing: countList,
            },
          },
        ],
      },
      travelers: travelerList,
      payment: {
        formsOfPayment: [
          {
            type: "CASH",
          },
        ],
      },
      remarks: [
        {
          type: "GENERAL",
          alphaCode: "T",
          text: "GeneratedFromItinerary_14",
        },
        {
          type: "INVOICE",
          text: uuid,
        },
      ],
      
    };

    // otherServices: [
    //     {
    //       airlineCode: "EK",
    //       serviceMessage: "CTCM 00966123456789/EN",
    //     },
    //     {
    //       airlineCode: "EK",
    //       serviceMessage: `CTCE ${travelerList[0].givenName.toLowerCase()}//wakanow.com/EN`,
    //     },
    //   ],

// text: "S*UD1 1701765172",
    // return response.status(200).json({
    //                 status: true,
    //                  data : payload,
    //             });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    const result = await fetch(endpoint, requestOptions).then((res) => res.json());

    if( result && result.confirmationId) {

      // return response.status(200).json({
      //               status: true,
      //                data : result,
      //           });

      const PNR = result.confirmationId;
      const fareInfo = result.booking.fares[0]?.totals || {};
      const totalBaseFare = fareInfo.subtotal || 0;
      const totalTaxAmount = fareInfo.taxes || 0;
      const totalAmount = fareInfo.total || 0;

      // Store booking in database
      const bookingDetail = await FlightBooking.create({
        user_id: userId,
        uuid : uuid,
        is_applied_code: codeId ? 1 : 0,
        status: 1,
        codeId: codeId || null,
        pnr: PNR,
        amount: totalAmount,
      });

      const flightBookingId = bookingDetail.id;

      // Store passengers
      await Promise.all(
          result.booking.travelers.map((traveler) => {
            const passportDoc = traveler.identityDocuments?.find(
              (doc) => doc.documentType === "PASSPORT"
            );

            return Passenger.create({
              flight_booking_id: flightBookingId,
              firstname: traveler.givenName,
              lastname: traveler.surname,
              phone: traveler.phones?.[0]?.number || null,
              type: traveler.passengerCode,
              passport: passportDoc?.documentNumber || null, // null if INF
            });
          })
        );

      // Store flights and segments
      await Promise.all(
        result.booking.journeys.map(async (journey) => {
          const journeyFlights = result.booking.flights.filter(
            (f) =>
              f.fromAirportCode === journey.firstAirportCode ||
              f.toAirportCode === journey.lastAirportCode
          );
          const createdFlight = await Flight.create({
            booking_id: flightBookingId,
            origin: journey.firstAirportCode,
            destination: journey.lastAirportCode,
            country: locationHelper.locationDetail(journey.lastAirportCode).country,
            date: journey.departureDate,
            transits: journey.numberOfFlights,
          });

          await Promise.all(
            journeyFlights.map((segment) => {
              return Segment.create({
                flight_id: createdFlight.id,
                departure_date: `${segment.departureDate} ${segment.departureTime}`,
                arrival_date: `${segment.arrivalDate} ${segment.arrivalTime}`,
                flight_number: segment.flightNumber,
                flight_code: segment.airlineCode,
                stops: segment.stops || 0,
              });
            })
          );
        })
      );

      // Prepare flight details for PDF
      const flightsDetail = result.booking.journeys.map((journey) => {
        const journeyFlights = result.booking.flights.filter(
          (f) =>
            f.fromAirportCode === journey.firstAirportCode ||
            f.toAirportCode === journey.lastAirportCode
        );
        return {
          origin: journey.firstAirportCode,
          destination: journey.lastAirportCode,
          origin_country: locationHelper.locationDetail(journey.firstAirportCode).country,
          destination_country: locationHelper.locationDetail(journey.lastAirportCode).country,
          date: journey.departureDate,
          segments: journeyFlights.map((segment) => ({
            departure_date: `${segment.departureDate} ${segment.departureTime}`,
            arrival_date: `${segment.arrivalDate} ${segment.arrivalTime}`,
            flight_number: segment.flightNumber,
            flight_code: segment.airlineCode,
          })),
        };
      });

      // Generate PDF
      const invoiceTemplate = path.join(__dirname, '../public/views/invoice.ejs');
      const pdfData = {
        pnr: PNR,
        totalBaseFare,
        totalTaxAmount,
        totalAmount,
        passengers: result.booking.travelers,
        flights: flightsDetail,
      };
      const html = await ejs.renderFile(invoiceTemplate, pdfData);
      // const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({
                                        headless: true,
                                        args: [
                                          '--no-sandbox',
                                          '--disable-setuid-sandbox',
                                          '--disable-dev-shm-usage',
                                          '--disable-accelerated-2d-canvas',
                                          '--no-zygote',
                                          '--single-process',
                                          '--disable-gpu'
                                        ]
                                      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "load" });
      const fileName = `${moment().unix()}-${request.user.name}-${PNR}.pdf`;
      const pdfPath = path.join(__dirname, `../public/uploads/invoices/${fileName}`);
      await page.pdf({ path: pdfPath, format: "A4" });
      await browser.close();

      const pdfUrl = `${process.env.APP_URL}/uploads/invoices/${fileName}`;

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: request.user.email,
        subject: `Flight Booking Invoice - PNR ${PNR}`,
        text: `Dear Customer,\n\nYour flight booking has been confirmed. Please find the invoice attached.\n\nPNR: ${PNR}\nBest regards,\nHalasky`,
        attachments: [
          {
            filename: `invoice-${PNR}.pdf`,
            path: pdfPath,
            contentType: "application/pdf",
          },
        ],
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });

      return response.status(200).json({
        status: true,
        message: "Booking created successfully",
        downloadUrl: pdfUrl,
        data : result,
      });
    } else {
      return response.status(200).json({ status: false, data: result });
    }
  } catch (error) {
    console.error("Booking Error:", error);
    return response.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
},



cancelBooking : async (request, response) =>{

  try {
    // Get authentication token
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });
    const accessToken =
      typeof tokenDetail.information === "string"
        ? JSON.parse(tokenDetail.information).access_token
        : tokenDetail.information.access_token;

    const endpoint = "https://api.cert.platform.sabre.com/v1/trip/orders/cancelBooking";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const bookedFlight = await FlightBooking.findOne({ where : { pnr : request.body.pnr}});

    if(bookedFlight){
      const payload = {
        "confirmationId": request.body.pnr,
        "cancelAll": true,
        "retrieveBooking": true,
        "targetPcc": "3GML",
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
      };

      


      const result = await fetch(endpoint, requestOptions).then((res) => res.json());
      return response.status(200).json({
                    status: true,
                     data : result,
                });

    }

  

      

              } catch (error) {
    console.error("Booking Cancelation Error:", error);
    return response.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }

}





































  
}



function simplifyFlightResponse(itinerariesList) {
  // Validate input
  if (!Array.isArray(itinerariesList) || !itinerariesList.length) {
    return { error: 'Invalid or empty itineraries list' };
  }

  // Helper function to safely parse and format dates
  const formatDate = (dateString, timeZone = 'Asia/Karachi') => {
    
    // Handle null, undefined, or non-string inputs
    if (!dateString || typeof dateString !== 'string') {
      return 'N/A';
    }

    // Clean date string (remove offsets like +05:00 or Z, trim whitespace)
    const cleanedDateString = dateString.replace(/Z|[+-]\d{2}:\d{2}$/, '').trim();
    const date = new Date(cleanedDateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'N/A';
    }

    // Format date to PKT (Asia/Karachi, UTC+5)
    return date.toLocaleString('en-US', {
      timeZone,
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Process each itinerary
  return itinerariesList.map((itinerary, index) => {
    // Validate itinerary structure
    if (!itinerary?.priceSource || !itinerary?.legList?.length || !itinerary?.passengerPriceDetail?.length) {
      return { error: `Invalid itinerary data at index ${index}` };
    }

    // Extract flight details for each leg, keeping legs separate
    const flights = itinerary.legList.map((leg) =>
      leg.schedule.map((schedule) => {
        // Get segment for matching amenities (e.g., "ISB-KHI")
        const segment = `${schedule.departure.airport}-${schedule.arrival.airport}`;

        // Find matching amenities for this segment from amenities1
        // console.log(itinerary);
        // return;
        const firstLeg = itinerary.legList[0].schedule[0];
        const lastLeg = itinerary.legList[itinerary.legList.length - 1].schedule.slice(-1)[0];
        const fullSegment = `${firstLeg.departure.airport}-${lastLeg.arrival.airport}`;
        const segmentAmenities = Array.from(
                                      new Set(
                                          itinerary.amenities1
                                              ?.flatMap((passenger) =>
                                                  passenger.scheduleDetail
                                                      ?.filter((detail) => {
                                                          const segmentKey = `${detail.beginAirport}-${detail.endAirport}`;
                                                          return segmentKey === fullSegment;
                                                      })
                                                      .flatMap((detail) =>
                                                          detail.segments?.flatMap((segment) =>
                                                              segment.amenitiesList?.map((amenity) => amenity.key) || []
                                                          ) || []
                                                      )
                                                      .filter(Boolean) || []
                                              ) || []
                                      )
                                  );

        return {
          flightNumber: `${schedule.carrier.marketing}-${schedule.carrier.marketingFlightNumber}`,
          airline: schedule.carrier.marketing,
          marketingNumber : schedule.carrier.marketingFlightNumber,
          aircraft: schedule.carrier.equipment?.code || 'Unknown',
          departure: {
            airport: schedule.departure.airport,
            city: schedule.departure.city,
            country: schedule.departure.country,
            time: schedule.departure.time,
          },
          arrival: {
            airport: schedule.arrival.airport,
            city: schedule.arrival.city,
            country: schedule.arrival.country,
            time: schedule.arrival.time,
          },
          duration: `${Math.floor(schedule.elapsedTime / 60)}h ${schedule.elapsedTime % 60}m`,
          distance: `${schedule.totalMilesFlown} miles`,
          stops: schedule.stopCount || 0,
          cabin:
            itinerary.passengerPriceDetail[0]?.passengerList?.[0]?.FareComponents?.[0]?.segments?.[0]?.segment
              ?.cabinCode || 'Economy',
          bookingClass:
            itinerary.passengerPriceDetail[0]?.passengerList?.[0]?.FareComponents?.[0]?.segments?.[0]?.segment
              ?.bookingCode || 'N/A',
          seatsAvailable:
            itinerary.passengerPriceDetail[0]?.passengerList?.[0]?.FareComponents?.[0]?.segments?.[0]?.segment
              ?.seatsAvailable || 0,
          amenities: segmentAmenities, // Separate amenities for this flight
        };
      })
    );

    // Extract passenger and pricing details
    const passengers = itinerary.passengerPriceDetail[0].passengerList.map((passenger) => ({
      type: passenger.type === 'ADT' ? 'Adult' : passenger.type === 'C06' ? 'Child' : passenger.type,
      code: passenger.type,
      count: passenger.total || 0,
      fare: {
        baseFare: `${passenger.passengerTotalFare?.baseFareAmount || 0} ${
          passenger.passengerTotalFare?.baseFareCurrency || 'N/A'
        }`,
        equivalentFare: `${passenger.passengerTotalFare?.equivalentAmount || 0} ${
          passenger.passengerTotalFare?.equivalentCurrency || 'N/A'
        }`,
        totalTaxes: `${passenger.passengerTotalFare?.totalTaxAmount || 0} ${
          passenger.passengerTotalFare?.currency || 'N/A'
        }`,
        totalFare: `${passenger.passengerTotalFare?.totalFare || 0} ${
          passenger.passengerTotalFare?.currency || 'N/A'
        }`,
      },
      taxes: passenger.taxSummary?.map((tax) => ({
        [tax.code] : `${tax.amount} ${tax.currency}, ${tax.description}`,
      })) || [],
      baggage: passenger.baggageInformation?.map((bag) => ({
        allowance: bag.detail ? `${bag.detail.weight} ${bag.detail.unit}` : 'N/A',
        airline: bag.airlineCode || 'N/A',
        segment:
          bag.segments[0]?.id >= 0 && itinerary.legList[bag.segments[0].id]?.schedule[0]
            ? `${itinerary.legList[bag.segments[0].id].schedule[0].departure.airport}-${
                itinerary.legList[bag.segments[0].id].schedule[0].arrival.airport
              }`
            : 'Unknown',
      })) || [],
      fareBasis: passenger.FareComponents?.map((fc) => fc.fareComponentDetail?.fareBasisCode).join(', ') || 'N/A',
      nonRefundable: passenger.nonRefundable || false,
    }));

    currencyConversion = itinerary.passengerPriceDetail[0].passengerList[0]?.currencyConversion || {}

    // Extract total pricing
    const totalFare = {
      baseFare: `  ${convertToSAR( 
                      itinerary.passengerPriceDetail[0].totalFareDetail?.baseFareAmount, 
                      itinerary.passengerPriceDetail[0].totalFareDetail?.baseFareCurrency, 
                      currencyConversion
                    ) || 0} SAR`,
      equivalentFare: `${convertToSAR( 
                      itinerary.passengerPriceDetail[0].totalFareDetail?.equivalentAmount, 
                      itinerary.passengerPriceDetail[0].totalFareDetail?.equivalentCurrency, 
                      currencyConversion
                    ) || 0} SAR`,          
      totalTaxes: `${itinerary.passengerPriceDetail[0].totalFareDetail?.totalTaxAmount || 0} ${
        itinerary.passengerPriceDetail[0].totalFareDetail?.currency || 'N/A'
      }`,
      totalPrice: `${itinerary.passengerPriceDetail[0].totalFareDetail?.totalPrice || 0} ${
        itinerary.passengerPriceDetail[0].totalFareDetail?.currency || 'N/A'
      }`,
      lastTicketDate: formatDate(
        `${itinerary.passengerPriceDetail[0].lastTicketDate}T${itinerary.passengerPriceDetail[0].lastTicketTime}`
      ),
    };

    // Combine simplified data for this itinerary
    return {
      itineraryId: index,
      flights,
      passengers,
      totalFare,
      priceSource: itinerary.priceSource || 'N/A',
      currencyConversion,
    };
  });
}

function convertToSAR( amount , currency , convertionDetail )
{
  if(currency != "SAR"){
      let convertedAmount = convertionDetail.exchangeRateUsed * amount
    return convertedAmount;
  }

  return amount;
}


function simplifyALTFlightResponse(itineraryGroupDetail, groupDescription = null) {
    let groups = groupDescription?.legDescriptions?.map(group => ({
        group,
        itineraries: []
    })) || [];

    // Process each itinerary in itineraryGroupDetail
    itineraryGroupDetail.forEach((itineraryDetail) => {
        const legDescription = itineraryDetail.description.legDescriptions[0];
        const itinerary = itineraryDetail.itinerariesList[0];

        itinerary.legList.forEach((leg, legIndex) => {
            // Initialize array to store flight details
            let legFlights = [];

            // Process flight schedule
            leg.schedule.forEach(item => {
                legFlights.push({
                    stops: item.stopCount,
                    departureCity: item.departure.airport,
                    departureCountry: item.departure.country,
                    departureTime: item.departure.time.split("+")[0],
                    arrivalCountry: item.arrival.country, // Fixed to use arrival.country
                    arrivalTime: item.arrival.time.split("+")[0]
                });
            });

            // Process passenger information
            let passengerList = itinerary.passengerPriceDetail[0].passengerList;
            let passengers = [];

            passengerList.forEach(passenger => {
                let passengerDetail = {};
                let passengerFareComponentDetail = passenger.FareComponents[legIndex].fareComponentDetail;

                passengerDetail.type = passenger.type;
                passengerDetail.total = passenger.total;
                passengerDetail.fareAmount = passengerFareComponentDetail.fareAmount;

                // Calculate surcharge amount
                passengerDetail.surchargeAmount = passengerFareComponentDetail.segments?.reduce((segmentTotal, currentSegment) => {
                    const segmentSurcharge = currentSegment.segment?.surcharges?.reduce((surchargeTotal, surcharge) => {
                        return surchargeTotal + Number(surcharge.amount);
                    }, 0) || 0;
                    return segmentTotal + segmentSurcharge;
                }, 0) || 0;

                passengerDetail.totalFare = (passengerDetail.fareAmount + passengerDetail.surchargeAmount) * passenger.total;

                // Convert total fare to SAR (assuming convertToSAR is defined elsewhere)
                passengerDetail.convertedTotalFare = convertToSAR(
                    passengerDetail.totalFare,
                    passengerFareComponentDetail.fareCurrency,
                    passenger.currencyConversion
                );

                passengers.push(passengerDetail);
            });

            // Create detail object for the itinerary
            let detail = {
                flights: legFlights,
                passengers: passengers,
            };

            // Find the matching group based on departureDate and locations
            const matchingGroupIndex = groups.findIndex(g =>
                g.group.departureDate === legDescription.departureDate &&
                g.group.departureLocation === legDescription.departureLocation &&
                g.group.arrivalLocation === legDescription.arrivalLocation
            );

            if (matchingGroupIndex !== -1) {
                groups[matchingGroupIndex].itineraries.push(detail);
            } else {
                // If no matching group, create a new one
                groups.push({
                    group: legDescription,
                    itineraries: [detail]
                });
            }
        });
    });

    return groups;
}


function convertToSAR(amount, fromCurrency, currencyConversion) {
    if (fromCurrency === 'SAR') return amount;
    return amount * (currencyConversion?.exchangeRateUsed || 1);
}












