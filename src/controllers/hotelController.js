const { JsonHandler } = require('../database/models');
const AppConst = require('../appConst');

module.exports = {
    list : async (request ,response)=>{
        const tokenDetail = await JsonHandler.findOne({
            where : {type : AppConst.sabreFlights}
        });

        const accessToken = tokenDetail.information.access_token;
        
        try{
            let endpoint = 'https://api.cert.sabre.com/v3.0.0/get/hotelavail';
    
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

        let searchRequest = {
            "GetHotelAvailRQ": {
              "POS": {
                "Source": {
                  "PseudoCityCode": "3GML"
                }
              },
              "SearchCriteria": {
                "OffSet": 1,
                "SortBy": "TotalRate",
                "SortOrder": "ASC",
                "PageSize": 40,
                "TierLabels": true,
                "GeoSearch": {
                  "GeoRef": {
                    "Radius": 50,
                    "UOM": "KM",
                    "RefPoint": {
                      "Value": "LCY",
                      "ValueContext": "CODE",
                      "RefPointType": "6",
                      "CountryCode": "UK"
                    }
                  }
                },
                "RateInfoRef": {
                  "CurrencyCode": "SAR",
                  "BestOnly": "2",
                  "PrepaidQualifier": "IncludePrepaid",
                  "RefundableOnly": false,
                  "ConvertedRateInfoOnly": true,
                  "StayDateRange": {
                    "StartDate": "2025-04-01",
                    "EndDate": "2025-04-05"
                  },
                  "Rooms": {
                    "Room": [
                      {
                        "Index": 1,
                        "Adults": 1
                      }
                    ]
                  }
                },
                "ImageRef": {
                    "Type": "LARGE",
                    "LanguageCode": "en"
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