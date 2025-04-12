const { JsonHandler , HotelBooking , Guest , PaymentDetail } = require("../database/models");
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
      
      const { rateKey , checkIn , checkOut , rooms } = request.body;
      const tokenDetail = await JsonHandler.findOne({
        where: { type: AppConst.sabreFlights },
      });
  
      const accessToken = typeof(tokenDetail.information) == "string" ? JSON.parse(tokenDetail.information).access_token : tokenDetail.information.access_token;  

      let endpoint = "https://api.cert.sabre.com/v5/hotel/pricecheck";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      let roomJson = rooms.map( (room , index) => {
        let roomDetail = {};
        roomDetail.Index = index+1;
        roomDetail.Adults = room.adults;

        if(room.childrens){
          roomDetail.Children = room.childrens;
          roomDetail.ChildAges = room.childAges;
        }

        return roomDetail;
    })


      let searchRequest = {
        HotelPriceCheckRQ: {
          POS: {
            Source: {
              PseudoCityCode: "3GML"
            }
          },
          // "CorporateNumber": "DK44391RC",
          RateInfoRef: {
            RateKey: rateKey,
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

      // return response.status(200).json(searchRequest);

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
      
      const { 
        contactNumber, 
        bookingKey,
        email,
        personList,
        roomList,
        paymentDetail
      } = request.body;

      //contact detail
      const contactDetail = contactNumber.map( (cn , index) => {
        return {
                  "NameNumber": (index+1)+".1",
                  "Phone": cn.phone,
                  "PhoneUseType": "H"
                }
      })

      const personDetail = personList.map( (person , index) =>{
        return {
           "NameNumber": (index+1)+".1",
            "PassengerType": person.type,
            "GivenName": person.firstName,
            "Surname": person.lastName 
        }
      })

      const roomDetail = roomList.map( (room , index) =>{
        const roomGuests = room.guests.map((guest , guestIndex) =>{
          let guestDetail = {};
          
          guestDetail.Type = guest.type == 'ADT' ? 10 : 8;
          guestDetail.Index = (guestIndex + 1);
          guestDetail.FirstName = guest.firstName;
          guestDetail.LastName = guest.lastName;

          if(guest.leadGuest){
            guestDetail.LeadGuest = true;
          }

          if(guest.phone){
            guestDetail.Contact = {
              Phone : guest.phone
            };
          }

          if(guest.email){
            guestDetail.Email = guest.email;
          }

          if(guest.age){
            guestDetail.Age = guest.age;
          }

          return guestDetail;
        });

          return {
              "RoomIndex": (index + 1),
              "Guests": {
                "Guest": roomGuests
              }
            }
      })
      
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
                "ContactNumber": contactDetail
              },
              "Email": [
                {
                  "Address": email,
                  "NameNumber": "1.1"
                }
              ],
              "PersonName": personDetail
            }
          },
          "HotelBook": {
            "BookingInfo": {
              "BookingKey": bookingKey
            },
            "Rooms": {
              "Room": roomDetail
            },
            "PaymentInformation": {
              "Type": "GUARANTEE",
              "FormOfPayment": {
                "PaymentCard": {
                  "PaymentType": paymentDetail.type,
                  "CardCode": paymentDetail.cardCode,
                  "CardNumber": paymentDetail.cardNumber,
                  "ExpiryMonth": paymentDetail.expiryMonth,
                  "ExpiryYear": paymentDetail.expiryYear,
                  "FullCardHolderName": {
                    "FirstName": paymentDetail.firstName,
                    "LastName": paymentDetail.lastName
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
      if(
        result.CreatePassengerNameRecordRS && 
        result.CreatePassengerNameRecordRS.ApplicationResults.status === "Complete"
      ){

        let PNR = result.CreatePassengerNameRecordRS.ItineraryRef.ID;
        let user_id = request.user.id;
        let is_applied_code = request.body.appliedCode ? request.body.appliedCode : false;
        let code_id = request.body.code_id ? request.body.code_id : null;
        let from = request.body.from;
        let to = request.body.to;
        let hotel_id = request.body.hotel_id;
        let amount = request.body.amount;

        let hotelDetail = await HotelBooking.create({
                                  pnr : PNR,
                                  user_id : user_id,
                                  is_applied_code : is_applied_code,
                                  hotel_id : hotel_id,
                                  code_id : code_id,
                                  from : from,
                                  to : to,
                                  amount: amount,
                                  booking_key : bookingKey
                                });

            

      let guestList = [];
      roomList.forEach( (room ) =>{
        room.guests.forEach((guest) =>{
          let guestDetail = {};
          					
          guestDetail.type = guest.type;
          guestDetail.hotel_booking_id = hotelDetail.id;
          guestDetail.first_name = guest.firstName;
          guestDetail.last_name = guest.lastName;
          guestDetail.is_lead_guest = guest.leadGuest ? guest.leadGuest : false;
          guestDetail.phone_number = guest.phone ? guest.phone : null;
          guestDetail.age = guest.age ? guest.age : null;
          guestDetail.email = guest.email ? guest.email : null;

          guestList.push(guestDetail);
        });

      });


        await Guest.bulkCreate(guestList);

        await PaymentDetail.create({
                                booking_id	:  hotelDetail.id,
                                first_name	: paymentDetail.firstName,
                                last_name	: paymentDetail.lastName,
                                card_type : paymentDetail.type,
                                card_code: paymentDetail.cardCode,
                                card_number:	paymentDetail.cardNumber,
                                card_expiry_month: paymentDetail.expiryMonth,	
                                card_expiry_year: paymentDetail.expiryYear
                            });

        return response.status(200).json({
          status : true,
          message : "Booking created successfully"
        });

      } else {
        return response.status(200).json({ status : false , data : result});
      }

      
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
