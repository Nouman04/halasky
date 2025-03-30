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
                HotelCode: "100561270", 
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
            RateKey: "sqpUwSyzpETt9AZSIUefQZYKSzBxTRZz5vrAfGL5Byj8JopPStdDnFHwOIM90XPOAv3HvcGd981zLFbn2G4KucJVTN8Ew57IoQ5hJEQp+CfRDziUUQ8v+i3COVO7czZrIDAuV8/+Y4mP1l9b0ljmE1gzW5vdn13p8nst71OsKbLF6WMcvU9/PSimzta3owSlRf4HRX5aPmi5H6dTC3hkDlegtn9wSjGR/IIdvTHNNJ5If5oqZDmkRi/DQ/t9kX49bC3a6B37RqxbxE0Ig8BF5+EWtOkbHfGzlmnfB8f1JPLgrNnwW7/GX3iepNBEPWdoH8utVi5lB+FLOKSOSPp1Ietwh/bm6WpLCLZf7it/NpNEvRGFHj3yYPcHGPhBIYXDTIUtnYrofr33en78ffTloo+CnIBVt9OFGIjmS6/mTAvhRrXHmrEvRRczXdj/RWoTrQ1sGRRn6t4aifuQtlr8EkaL0oG6QOR9sXqafGTsDa3PriZd0PUeSzWKuv4+CnABSPyFfM7di98vv4TZLXCP7kIZ56WaF+QNjrHHUsuW4nBUIp2pjNdtkVKESOwjStjhLih/BXD0bzt1Hz0ZNQ4Er0GWMXjA5rBq5I1miVmb9aJ5o5bCT8Nfbxae7TXGtZ1fQezDp+NEdBuAU6YRHWJGyA==",
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

  createBooking : (req , res) => {

  }



};
