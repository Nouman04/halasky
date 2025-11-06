const Joi = require("joi");

// Allowed passenger types
const passengerTypes = ["ADT", "C06", "INF"];


//AIRPORT LIST SCHEMA======================================
const searchAirportSchema = Joi.object({
  searchQuery: Joi.string().min(2).max(100).required()
});


//FLIGHT LIST SCHEMA=======================================
const listDestinationSchema = Joi.object({
  travelDate: Joi.date().iso().greater("now").required().messages({
    "date.base": "Travel date must be a valid date",
    "date.format": "Travel date must be in ISO format (YYYY-MM-DDTHH:mm:ss)",
    "date.greater": "Travel date must be greater than today",
    "any.required": "Travel date is required"
  }),
  DepartureAirport: Joi.string().length(3).uppercase().required(),
  ArrivalAirport: Joi.string().length(3).uppercase().required()
});


const listPassengerSchema = Joi.object({
  type: Joi.string().valid(...passengerTypes).required(),
  total: Joi.number().integer().min(1).required()
});

const searchFlightSchema = Joi.object({
  destinationList: Joi.array()
    .items(listDestinationSchema)
    .min(1)
    .custom((value, helpers) => {
      for (let i = 1; i < value.length; i++) {
        const prev = new Date(value[i - 1].travelDate);
        const curr = new Date(value[i].travelDate);
        if (curr < prev) {
          return helpers.error("any.invalid", {
            message: "Travel dates must be in ascending order"
          });
        }
      }
      return value;
    })
    .required(),
  travelClass: Joi.string().valid("Y", "F", "C").required(),
  passengerList: Joi.array().items(listPassengerSchema).min(1).required()
});


//ALTERNATE DAYS SCHEMA================================================================

const alternateDateFlightSchema = Joi.object({
  originLocation: Joi.string().length(3).uppercase().required().messages({
    "string.length": "Origin location must be a 3-letter IATA code",
    "any.required": "Origin location is required"
  }),

  destinationLocation: Joi.string().length(3).uppercase().required().messages({
    "string.length": "Destination location must be a 3-letter IATA code",
    "any.required": "Destination location is required"
  }),

  departureDate: Joi.date()
    .iso()
    .greater("now")
    .required()
    .messages({
      "date.base": "Departure date must be a valid date",
      "date.format": "Departure date must be in ISO format (YYYY-MM-DDTHH:mm:ss)",
      "date.greater": "Departure date must be greater than today",
      "any.required": "Departure date is required"
    }),

  passengerDetail: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid(...passengerTypes).required().messages({
          "any.only": "Passenger type must be ADT, C06, or INF",
          "any.required": "Passenger type is required"
        }),
        total: Joi.number().integer().min(1).required().messages({
          "number.base": "Passenger total must be a number",
          "number.min": "Passenger total must be at least 1",
          "any.required": "Passenger total is required"
        })
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Passenger detail must be an array",
      "array.min": "At least one passenger must be provided",
      "any.required": "Passenger detail is required"
    })
});





//AVAILABILITY SCHEMA=========================================================

const availAirlineSchema = Joi.object({
  marketing: Joi.string().length(2).uppercase().required().messages({
    "string.length": "Airline marketing code must be 2 letters"
  }),
  operating: Joi.string().length(2).uppercase().required().messages({
    "string.length": "Airline operating code must be 2 letters"
  })
});

const availFlightSchema = Joi.object({
  airline: availAirlineSchema.required(),
  number: Joi.number().integer().required().messages({
    "number.base": "Flight number must be a number"
  }),
  departureDateTime: Joi.date().iso().greater("now").required().messages({
    "date.greater": "Flight departure date must be greater than today"
  }),
  originLocationCode: Joi.string().length(3).uppercase().required().messages({
    "string.length": "Origin location code must be a 3-letter IATA code"
  }),
  arrivalDateTime: Joi.date().iso().required().custom((value, helpers) => {
    const { departureDateTime } = helpers.state.ancestors[0];

    // Convert to local date (ignore time & timezone)
    const dep = new Date(departureDateTime);
    const arr = new Date(value);

    const depDate = dep.getFullYear() + "-" + (dep.getMonth() + 1) + "-" + dep.getDate();
    const arrDate = arr.getFullYear() + "-" + (arr.getMonth() + 1) + "-" + arr.getDate();

    // Compare by calendar day only
    if (new Date(arrDate) < new Date(depDate)) {
      return helpers.error("date.invalidOrder");
    }

    return value;
  }, "Date-only comparison")
  .messages({
    "date.invalidOrder": "Arrival date must be on or after the departure date",
  }),
  destinationLocationCode: Joi.string().length(3).uppercase().required().messages({
    "string.length": "Destination location code must be a 3-letter IATA code"
  })
});


const availLegSchema = Joi.object({
  originLocation: Joi.string().length(3).uppercase().required(),
  destinationLocation: Joi.string().length(3).uppercase().required(),
  departureDate: Joi.date().iso().greater("now").required().messages({
    "date.greater": "Leg departure date must be greater than today"
  }),
  flights: Joi.array().items(availFlightSchema).min(1).required()
});

const availPassengerSchema = Joi.object({
  type: Joi.string().valid(...passengerTypes).required(),
  total: Joi.number().integer().min(1).required()
});

const availabilityFlightSchema = Joi.object({
  priceSource: Joi.string().required(),
  legList: Joi.array().items(availLegSchema).min(1).required(),
  passengerDetail: Joi.array().items(availPassengerSchema).min(1).required()
});




//BOOKING SCHEMA
const bookingPassengerSchema = Joi.object({
  firstname: Joi.string().min(2).max(100).required(),
  lastname: Joi.string().min(2).max(100).required(),
  birthDate: Joi.date().iso().required(),
  type: Joi.string().valid("ADT", "C06", "INF").required(), // Adult, Child, Infant
  passport: Joi.string().alphanum().min(6).max(20).required(),
  expiryDate: Joi.date().iso().greater("now").required(),
  issuingCountryCode: Joi.string().length(2).uppercase().required(),
  residenceCountryCode: Joi.string().length(2).uppercase().required(),
  gender: Joi.string().valid("MALE", "FEMALE").required(),
  email: Joi.string().email().required(),
  phone: Joi.when("type", {
    is: "ADT",
    then: Joi.string().pattern(/^[0-9+\- ]+$/).required(),
    otherwise: Joi.string().pattern(/^[0-9+\- ]+$/).optional().allow("", null)
  })
});

const bookingPassengerCountSchema = Joi.object({
  type: Joi.string().valid("ADT", "C06", "INF").required(),
  total: Joi.number().integer().min(1).required()
});

const bookingFlightSegmentSchema = Joi.object({
  number: Joi.number().integer().required(),
  code: Joi.string().alphanum().min(2).max(3).required(),
  origin: Joi.string().length(3).uppercase().required(),      // IATA code
  destination: Joi.string().length(3).uppercase().required(), // IATA code
  departureDate: Joi.date().iso().required(),
  departureTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // HH:mm
  arrivalDate: Joi.date().iso().required(),
  arrivalTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  stops: Joi.number().integer().min(0).required(),
  totalPassenger: Joi.number().integer().min(1).required()
});

const bookingFlightListSchema = Joi.object({
  description: Joi.object({
    departure_location: Joi.string().length(3).uppercase().required(),
    arrival_location: Joi.string().length(3).uppercase().required(),
    departure_date: Joi.date().iso().required()
  }).required(),
  segments: Joi.array().items(bookingFlightSegmentSchema).min(1).required()
});

const bookingFlightSchema = Joi.object({
  passengers: Joi.array().items(bookingPassengerSchema).min(1).required(),
  passengerCounts: Joi.array().items(bookingPassengerCountSchema).min(1).required(),
  flights: Joi.array().items(bookingFlightListSchema).min(1).required()
});



module.exports = { searchAirportSchema , searchFlightSchema , alternateDateFlightSchema , availabilityFlightSchema , bookingFlightSchema };
