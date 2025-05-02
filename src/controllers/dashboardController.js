const { Op , fn , col } = require('sequelize');
const { HotelBooking , FlightBooking , User , Flight } = require('../database/models');
const appConst = require('../appConst');
let moment = require("moment");

module.exports = {
    
    getDashboardInformation : async (request, response) => {
        let currentDate = moment();
        let previousDate = moment().subtract(1, 'months');
        const [ 
            userCount, activeUser , nonActiveUser, 
            hotelsBookingCount , FlightBookingCount,
            flightDR, flightWR,  flightMR,
            hotelDR, hotelWR,  hotelMR,
            completedFlightBooking , pendingFlightBooking , cancelledFlightBooking, 
            completedHotelBooking , pendingHotelBooking , cancelledHotelBooking,
            countriesFlightBooking , countriesHotelBooking,
            flightYearlyReport , hotelYearlyReport
        ] = await Promise.all([
            User.count(),
            User.count({where : {status : 1}}),
            User.count({where : {status : 0}}),
            HotelBooking.findAll({ where : {
                                    created_at : {
                                       [Op.between] : [previousDate.format('YYYY-MM-DD') , currentDate.format('YYYY-MM-DD') ] 
                                    }
                                }
                            }),
            FlightBooking.findAll({ where : {
                                        created_at : {
                                            [Op.between] : [previousDate.format('YYYY-MM-DD') , currentDate.format('YYYY-MM-DD') ] 
                                        }
                                    }
                                }),
            FlightBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { created_at : moment().format('YYYY-MM-DD')},
                raw: true
            }),
            FlightBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { 
                    created_at : {
                        [Op.between] : [moment().subtract(1, 'weeks').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                raw: true
            }),
            FlightBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { 
                    created_at : {
                        [Op.between] : [moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                raw: true
            }),
            HotelBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { created_at : moment().format('YYYY-MM-DD')},
                raw: true
            }),
            HotelBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { 
                    created_at : {
                        [Op.between] : [moment().subtract(1, 'weeks').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                raw: true
            }),
            HotelBooking.findOne({
                attributes: [
                  [fn('SUM', col('amount')), 'total_amount']
                ],
                where: { 
                    created_at : {
                        [Op.between] : [moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                raw: true
            }),

            FlightBooking.count({
                where : {
                    status : 1,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            FlightBooking.count({
                where : {
                    status : 0,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            FlightBooking.count({
                where : {
                    status : 2,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            HotelBooking.count({
                where : {
                    status : 1,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            HotelBooking.count({
                where : {
                    status : 0,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            HotelBooking.count({
                where : {
                    status : 2,
                    created_at : {
                        [Op.between] :[moment().subtract(1, 'month').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                }
            }),

            Flight.findAll({
                attributes: [
                    'country',
                    [fn('COUNT', col('id')), 'flight_count']
                ],
                group: ['country'],
                order: [[fn('COUNT', col('id')), 'DESC']],
                limit: 5
            }),

            HotelBooking.findAll({
                attributes: [
                    'country',
                    [fn('COUNT', col('id')), 'hotel_count']
                ],
                group: ['country'],
                order: [[fn('COUNT', col('id')), 'DESC']],
                limit: 5
            }),

            FlightBooking.findAll({
                attributes: [
                    [fn('DATE_FORMAT', col('created_at'), '%Y-%m'), 'month'],
                    [fn('COUNT', col('id')), 'hotel_count']
                ],
                where: {
                    created_at: {
                    [Op.between]: [moment().subtract(1, 'year').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                group: [fn('DATE_FORMAT', col('created_at'), '%Y-%m')]
            }),


            HotelBooking.findAll({
                attributes: [
                    [fn('DATE_FORMAT', col('created_at'), '%Y-%m'), 'month'],
                    [fn('COUNT', col('id')), 'hotel_count']
                ],
                where: {
                    created_at: {
                    [Op.between]: [moment().subtract(1, 'year').format('YYYY-MM-DD') ,moment().format('YYYY-MM-DD')]
                    }
                },
                group: [fn('DATE_FORMAT', col('created_at'), '%Y-%m')]
            }),


        ])

        console.log(userCount)
        console.log(activeUser.length)
        console.log(nonActiveUser.length)
        console.log(hotelsBookingCount.length)
        console.log(FlightBookingCount.length)
        console.log(flightDR)
        console.log(flightWR)
        console.log(flightMR)
        console.log(hotelDR)
        console.log(hotelWR)
        console.log(hotelMR)
        console.log('completedFlightBooking:', completedFlightBooking);
        console.log('pendingFlightBooking:', pendingFlightBooking);
        console.log('cancelledFlightBooking:', cancelledFlightBooking);
        console.log('completedHotelBooking:', completedHotelBooking);
        console.log('pendingHotelBooking:', pendingHotelBooking);
        console.log('cancelledHotelBooking:', cancelledHotelBooking);
        console.log('hotelCountryCount:', countriesFlightBooking);
        console.log('flightCountryCount:', countriesHotelBooking);
        console.log('flightYearlyReport:', flightYearlyReport);
        console.log('hotelYearlyReport:', hotelYearlyReport);
        
    }

}