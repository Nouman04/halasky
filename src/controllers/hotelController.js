const { JsonHandler } = require("../database/models");
const AppConst = require("../appConst");

module.exports = {
  list: async (request, response) => {
    const { checkIn, checkOut, cityCode, countryCode, rooms } = request.body;
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });

    const accessToken = tokenDetail.information.access_token;

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

  trending: async (request, response) => {
    const { checkIn, checkOut, cityCode, countryCode, rooms } = request.body;
    const tokenDetail = await JsonHandler.findOne({
      where: { type: AppConst.sabreFlights },
    });

    const accessToken = tokenDetail.information.access_token;

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
};
