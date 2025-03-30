const { JsonHandler } = require("../database/models");
const AppConst = require("../appConst");
const locations = require('../public/files/destinations.json');

module.exports = {

  locationList : async (request , response) => {
        const { searchQuery } = request.body;
        try{
          filteredLocations = locations.filter( location => {
            let locationCode = location.code.toLowerCase();
            let locationCity = location.city.toLowerCase();
            return locationCode.includes(searchQuery.toLowerCase()) || locationCity.includes(searchQuery.toLowerCase());
          }).map( location => {
            return {
                    "code": location.code,
                    "lat": location.lat,
                    "lon": location.lon,
                    "city": location.city,
                    "state": location.state,
                    "country": location.country,
                    "country_code" : location.country_code
                  };
    
          }).slice(0 , 20);

         
          return response.status(200).json({
              status: true,
              data: filteredLocations,
          });
        } catch (error){
          return response.status(500).json({
              status: false,
              message: 'Something Went Wrong',
              error: error.message,
          });
      }
        
  
      },


  list: async (request, response) => {
    const { checkIn, checkOut, cityCode, countryCode, rooms } = request.body;
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });

    const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;


    let mappedRooms = rooms.map((room, index) => {
      roomDetail = {};
      roomDetail.Index = index + 1;
      roomDetail.Adults = room.Adults;

      if (room.Children) {
        roomDetail.Children = room.Children;
        roomDetail.ChildAges = room.ChildAges;
      }
      return roomDetail;
    });

    try {
      let endpoint = "https://api.cert.sabre.com/v3.0.0/get/hotelavail";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      let searchRequest = {
        GetHotelAvailRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML",
            },
          },
          SearchCriteria: {
            OffSet: 1,
            SortBy: "TotalRate",
            SortOrder: "ASC",
            TierLabels: true,
            GeoSearch: {
              GeoRef: {
                Radius: 50,
                UOM: "KM",
                RefPoint: {
                  Value: cityCode,
                  ValueContext: "CODE",
                  RefPointType: "6",
                  CountryCode: countryCode,
                },
              },
            },
            RateInfoRef: {
              CurrencyCode: "SAR",
              BestOnly: "2",
              PrepaidQualifier: "IncludePrepaid",
              RefundableOnly: false,
              ConvertedRateInfoOnly: true,
              StayDateRange: {
                StartDate: checkIn,
                EndDate: checkOut,
              },
              Rooms: {
                Room: mappedRooms,
              },
            },
            ImageRef: {
              Type: "LARGE",
              LanguageCode: "en",
            },
          },
        },
      };
      //   return response.status(200).json({
      //     status: true,
      //     data: searchRequest,
      // });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchRequest),
        redirect: "follow",
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {

          // return response.status(200).json(result);

          let detail = result.GetHotelAvailRS;

          if(result.status && result.status == 'NotProcessed')
          {
            return response.status(200).json({
              status: false,
              message: result.errorCode,
            });
          }

          if(detail.ApplicationResults.status != "Complete"){
              return response.status(200).json({
                status: false,
                message: 'Something went wrong',
              });
          }

          //listing amount in amountList
          let amountList = detail.HotelAvailInfos.HotelAvailInfo.map( info => {
             let rateInfos = info.HotelRateInfo.RateInfos.ConvertedRateInfo
             hotelRateInfo = [];
             rateInfos.forEach( rate => {
                if(rate.AverageNightlyRate){
                  hotelRateInfo.push(rate.AverageNightlyRate);
                }
             });

             return Math.min(...hotelRateInfo);
          })

          let maximumNightlyRate = Math.max(...amountList);
          let minimumNightlyRate = Math.min(...amountList);

          return response.status(200).json({
            status: true,
            data: { result , maximumNightlyRate , minimumNightlyRate }
          });
        });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  trending: async (request, response) => {
    const { checkIn, checkOut, cityCode, countryCode, rooms } = request.body;
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });

    const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;

    let mappedRooms = rooms.map((room, index) => {
      roomDetail = {};
      roomDetail.Index = index + 1;
      roomDetail.Adults = room.Adults;

      if (room.Children) {
        roomDetail.Children = room.Children;
        roomDetail.ChildAges = room.ChildAges;
      }
      return roomDetail;
    });

    try {
      let endpoint = "https://api.cert.sabre.com/v3.0.0/get/hotelavail";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      let searchRequest = {
        GetHotelAvailRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML",
            },
          },
          SearchCriteria: {
            OffSet: 1,
            SortBy: "TotalRate",
            SortOrder: "ASC",
            TierLabels: true,
            GeoSearch: {
              GeoRef: {
                Radius: 50,
                UOM: "KM",
                RefPoint: {
                  Value: cityCode,
                  ValueContext: "CODE",
                  RefPointType: "6",
                  CountryCode: countryCode,
                },
              },
            },
            RateInfoRef: {
              CurrencyCode: "SAR",
              BestOnly: "2",
              PrepaidQualifier: "IncludePrepaid",
              RefundableOnly: false,
              ConvertedRateInfoOnly: true,
              StayDateRange: {
                StartDate: checkIn,
                EndDate: checkOut,
              },
              Rooms: {
                Room: mappedRooms,
              },
            },
            ImageRef: {
              Type: "LARGE",
              LanguageCode: "en",
            },
          },
        },
      };
      //   return response.status(200).json({
      //     status: true,
      //     data: searchRequest,
      // });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchRequest),
        redirect: "follow",
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          return response.status(200).json({
            status: true,
            message: "rim1",
            data: result,
          });
        });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },



  hotelDetail : async ( request , response ) =>{
    try {

      const { hotelCode , checkIn , checkOut , rooms } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v5/get/hoteldetails";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      let roomJson = rooms.map( (room , index) => {
          let roomDetail = {};
          roomDetail.Index = index+1;
          roomDetail.Adults = room.adults;

          if(room.children){
            roomDetail.Children = room.childrens;
            roomDetail.ChildAges = room.childAges;
          }

          return roomDetail;
      }) 

      // [
      //   {
      //     Index: 1,    
      //     Adults: 1,      
      //     Children: 1,    
      //     ChildAges: "10" 
      //   }
      // ]

      let searchRequest = {
        GetHotelDetailsRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML"
            }
          },
          SearchCriteria: {
            HotelRefs: {
              HotelRef: {
                HotelCode: hotelCode, 
                CodeContext: "GLOBAL"
              }
            },
            RateInfoRef: {
              CurrencyCode: "SAR", 
              StayDateTimeRange: {
                StartDate: checkIn, 
                EndDate: checkOut    
              },
              Rooms: {
                Room: roomJson
              }
            }
          }
        }
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchRequest),
        redirect: "follow",
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          return response.status(200).json({
            status: true,
            data: result,
          });
        });

    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },



  images : async ( request , response ) =>{
    try {
      
      const { hotelCode } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v4.0.0/get/hotelcontent";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      console.log(hotelCode);
      let searchRequest = {
        GetHotelContentRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML" 
            }
          },
          SearchCriteria: {
            HotelRefs: {
              HotelRef: {
                HotelCode: hotelCode, 
                CodeContext: "GLOBAL"  
              }
            },
            MediaRef: {
              MaxItems: "10", 
              MediaTypes: {
                Images: {
                  Image: [
                    {
                      Type: "MEDIUM" 
                    }
                  ]
                }
              }
            }
          }
        }
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchRequest),
        redirect: "follow",
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          return response.status(200).json({
            status: true,
            data: result,
          });
        });

    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },



  confirmRate : async ( request , response ) =>{
    try {
      
      const { code } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v5/hotel/pricecheck";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      let searchRequest = {
        HotelPriceCheckRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML"
            }
          },
          // "CorporateNumber": "DK44391RC",
          RateInfoRef: {
            RateKey: "oBpEjcEGqvjZ859gx0ZOpJn+8Uwg+1f8FF3088rfvIqw/nnSdFsjyxXqI8/ZbjAVHk4Ny6yywxutGu0ViTg1qZYkHd8+5PMWibdAXFVLTWiudyIcbY2pMdg+qqbcxjZugOLe5i3e7ciqA4BDX8+HYBYaG6GdWyOc8gME3nrSy7vD1U/m45BJnd7rsrdV5h6zvb4MKqRZjD34mepFH72PbW46ZljLNVEeAVNyppDbKWeI97ml+RkVMLJXEAr9qffJifS0q19AehbntWGF9e9jdJ5vuNMB6qqjVirPpH2U+8Y1FVmm33T6Ytx9MosdCzdATCPRvUxLMeq1EwGaguXQHOWMYrtS7SCR5Abc2iFxz54GpgpmMN3xyzXVpbBahJpxhCxUAr9pRyBJmxxBukc7rfjUXION7iozuI4GgH2FkNOHgvhyuYvn3sJStGyGv22DaueoFP0+SlYXSCcg0jDw+IwJgE4STwBhrs+nNt2f1VJzJqJPg39FYpcMaLL1BiMP851yuhdmdug4BEnte3ZWbUM2woSOKqqRaBex1iALjdnpDD+aZxWjU+MX7YygfRTwIJ5R+RbvLhCcCioMIBGEvd2IXF0maHnbUJOmS3TpfA38+97bTY02TQfz/FQgepNTSJo8k/7X/GtxQ+IGoZJVHA==",
              StayDateTimeRange: {
              StartDate: "2025-04-10", 
                EndDate: "2025-04-13"  
            },
            Rooms: {
              Room: [
                {
                  Index: 1,    
                  Adults: 1,      
                  Children: 1,    
                  ChildAges: "10" 
                }
              ]
            }
          }
        }
      }

      // let searchRequest = {
      //   GetHotelContentRQ: {
      //     POS: {
      //       Source: {
      //         PseudoCityCode: "3GML" 
      //       }
      //     },
      //     SearchCriteria: {
      //       HotelRefs: {
      //         HotelRef: {
      //           HotelCode: "100500336", 
      //           CodeContext: "GLOBAL"  
      //         }
      //       },
      //       MediaRef: {
      //         MaxItems: "10", 
      //         MediaTypes: {
      //           Images: {
      //             Image: [
      //               {
      //                 Type: "MEDIUM" 
      //               }
      //             ]
      //           }
      //         }
      //       }
      //     }
      //   }
      // }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchRequest),
        redirect: "follow",
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          return response.status(200).json({
            status: true,
            data: result,
          });
        });

    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  createBooking : async ( request , response ) => {
    try{
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v2.5.0/passenger/records?mode=create";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      

    let createRequest = {
      "CreatePassengerNameRecordRQ": {
        "version": "2.5.0",
        "TravelItineraryAddInfo": {
          "AgencyInfo": {
            "Address": {
              "AddressLine": "Test Agency",
              "CityName": "Jeddah",
              "CountryCode": "SA"
            },
            "Ticketing": {
              "TicketType": "7TAW"
            }
          },
          "CustomerInfo": {
            "ContactNumbers": {
              "ContactNumber": [
                {
                  "NameNumber": "1.1",
                  "Phone": "202-555-0137",
                  "PhoneUseType": "H"
                }
              ]
            },
            "Email": [
              {
                "Address": "sabre.test@sabre.com",
                "NameNumber": "1.1"
              }
            ],
            "PersonName": [
              {
                "NameNumber": "1.1",
                "PassengerType": "ADT",
                "GivenName": "DOE",
                "Surname": "JOHN"
              },
              {
                "NameNumber": "2.1",
                "PassengerType": "ADT",
                "GivenName": "Sara",
                "Surname": "James"
              }
            ]
          }
        },
        "HotelBook": {
          "BookingInfo": {
            "BookingKey": "0bc29d88-69a9-47b2-89b1-4ed623cf91ba"
          },
          "Rooms": {
            "Room": [
              {
                "RoomIndex": 1,
                "Guests": {
                  "Guest": [
                    {
                      "Type": 10,
                      "Index": 1,
                      "LeadGuest": true,
                      "FirstName": "DOE",
                      "LastName": "JOHN",
                      "Contact": {
                        "Phone": "2025550137"
                      },
                      "Email": "sabre.test@sabre.com"
                    }
                  ]
                }
              }
            ]
          },
          "PaymentInformation": {
            "Type": "GUARANTEE",
            "FormOfPayment": {
              "PaymentCard": {
                "PaymentType": "CC",
                "CardCode": "CA",
                "CardNumber": "5555555555554444",
                "ExpiryMonth": 10,
                "ExpiryYear": "2025",
                "FullCardHolderName": {
                  "FirstName": "DOE",
                  "LastName": "JOHN"
                }
              }
            }
          }
        },
        "PostProcessing": {
          "EndTransaction": {
            "Source": {
              "ReceivedFrom": "SP TEST"
            }
          }
        }
      }
    }
    
    
    
    
    
      

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(createRequest),
        redirect: "follow"
    };

    fetch( endpoint , requestOptions)
    .then((response) => response.json()) 
    .then(async (result) => {
      return response.status(200).json(result);
    })


    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  }



};
