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

          let detail = result.GetHotelAvailRS;
          let amountList = [];
          if(detail.ApplicationResults.status == "Complete"){
            let hotelList = detail.HotelAvailInfos.HotelAvailInfo;

            

          }


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

      const { checkIn, checkOut, cityCode, countryCode, rooms } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v5/get/hoteldetails";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

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
                HotelCode: "100500336", 
                CodeContext: "GLOBAL"
              }
            },
            RateInfoRef: {
              CurrencyCode: "SAR", 
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



  images : async ( request , response ) =>{
    try {
      
      const { code } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v4.0.0/get/hotelcontent";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

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
                HotelCode: "100500336", 
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
            RateKey: "sqpUwSyzpETt9AZSIUefQYhfPWurg0nPYd5gbvlNRr3YpaswcLtYx+VkmTRyGq83kz3E2e5bx6jn9GW1V3KrGVVNPnZBHjlWP4zxIkFuhnzIjf6H8EvKZBN9B3NxoAk3cY4S1PXOwzJFXE3n+cYXfzhgvdWwHjtS3GUyQRoRwjttj/tZJNEsy4+wuWdbSHjfI/RzdWQwu79kDLlxuf5RBOcBWB5KVPH4XOUR3cgAmqnSQRF3PUqRS+pPxWDc4pAbnLEqEHm0Xpsg5Y7vTr8pjkXbR0lGbWex2HctH1HCgGpHvwATTUXpge2zUJcGi//pQgXqYJTQIystuvJUWDGoOzIpucwSfIXnfVeHCGggxfNJIi+bUVIgqwu/0MIFwHdBvDuDEsBeFO6AQmYmeJEy+mUCx3pdQ2QwlnCf9ucZ3xJq34CiLi5vyC2Ci9sIt2gDpB5e+3NJC4WkzUpg1rxg9aTfiE8A737cJ6pCnyFKXvEJNBQwfg4Jzqt1A9vUTn75gY0cmZqTRAADD8Z9dG8HfVN+C5age+mIbOnEdGU0p5jTo7ufeCm/PreTfrV7yZM2kW2M2ZM1M4kJMUoCL/PQMF5LgB11XyjgNG0DKP+BoagVB2w0iXh+SpLg/YD07C0ZlBifwKHhbWvRoNLS/MiBlQ==",
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
  }



};
