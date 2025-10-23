const Joi = require('joi');
const today = new Date();


const hotelSearchSchema = Joi.object({
  checkIn: Joi.date()
    .iso()
    .greater(today)
    .required()
    .messages({
      "date.greater": "Check-in date must be after today.",
      "date.base": "Check-in must be a valid date.",
      "any.required": "Check-in date is required.",
    }),
  checkOut: Joi.date()
    .iso()
    .greater(Joi.ref("checkIn"))
    .required()
    .messages({
      "date.greater": "Check-out date must be after check-in date.",
      "any.required": "Check-out date is required.",
    }),

  cityCode: Joi.string()
    .alphanum()
    .length(3)
    .uppercase()
    .required()
    .label('City code'),

  countryCode: Joi.string()
    .alphanum()
    .length(2)
    .uppercase()
    .required()
    .label('Country code'),

  rooms: Joi.array()
    .items(
      Joi.object({
        Adults: Joi.number().integer().min(1).required(),

        Children: Joi.number().integer().min(0).required(),

        ChildAges: Joi.string().allow('', null).default(null),
      }).custom((room, helpers) => {
        const { Children, ChildAges } = room;

        if (Children > 0) {
          if (!ChildAges || String(ChildAges).trim() === '') {
            return helpers.message('ChildAges is required when there are children.');
          }

          const ages = String(ChildAges)
            .split(',')
            .map(a => Number(a.trim()));

          if (ages.length !== Children) {
            return helpers.message(
              `ChildAges count (${ages.length}) must match number of Children (${Children}).`
            );
          }

          const invalidAge = ages.some(age => isNaN(age) || age < 0 || age > 17);
          if (invalidAge) {
            return helpers.message('Each child age must be a valid number between 0 and 17.');
          }
        } else {
          // ✅ No children, ChildAges must not exist
          if (ChildAges && String(ChildAges).trim() !== '') {
            return helpers.message('ChildAges should not be provided when there are no children.');
          }
        }

        // ✅ Must always return the full validated object
        return room;
      })
    )
    .min(1)
    .required(),

});


const hotelCompareSchema = Joi.object({
  checkIn: Joi.date()
    .iso()
    .greater(today)
    .required()
    .messages({
      'date.greater': 'Check-in date must be after today.',
      'date.base': 'Check-in must be a valid date.',
      'any.required': 'Check-in date is required.',
    }),

  checkOut: Joi.date()
    .iso()
    .greater(Joi.ref('checkIn'))
    .required()
    .messages({
      'date.greater': 'Check-out date must be after check-in date.',
      'any.required': 'Check-out date is required.',
    }),

  cityCode: Joi.string().alphanum().length(3).uppercase().required(),

  countryCode: Joi.string().alphanum().length(2).uppercase().required(),

  rooms: Joi.array()
    .items(
      Joi.object({
        Adults: Joi.number().integer().min(1).required(),

        Children: Joi.number().integer().min(0).required(),

        ChildAges: Joi.string().allow('', null).default(null),
      }).custom((room, helpers) => {
        const { Children, ChildAges } = room;

        if (Children > 0) {
          if (!ChildAges || String(ChildAges).trim() === '') {
            return helpers.message('ChildAges is required when there are children.');
          }

          const ages = String(ChildAges)
            .split(',')
            .map(a => Number(a.trim()));

          if (ages.length !== Children) {
            return helpers.message(
              `ChildAges count (${ages.length}) must match number of Children (${Children}).`
            );
          }

          const invalidAge = ages.some(age => isNaN(age) || age < 0 || age > 17);
          if (invalidAge) {
            return helpers.message('Each child age must be a valid number between 0 and 17.');
          }
        } else {
          // ✅ No children, ChildAges must not exist
          if (ChildAges && String(ChildAges).trim() !== '') {
            return helpers.message('ChildAges should not be provided when there are no children.');
          }
        }

        // ✅ Must always return the full validated object
        return room;
      })
    )
    .min(1)
    .required(),

  hotelCodes: Joi.array()
    .items(
      Joi.alternatives().try(
        Joi.string().pattern(/^\d+$/).messages({
          'string.pattern.base': 'Hotel code must contain only digits.',
        }),
        Joi.number().integer().positive()
      )
    )
    .min(1)
    .required(),
});


const hotelDetailSchema = Joi.object({
  checkIn: Joi.date()
    .iso()
    .greater(today)
    .required()
    .messages({
      'date.greater': 'Check-in date must be after today.',
      'date.base': 'Check-in must be a valid date.',
      'any.required': 'Check-in date is required.',
    }),

  checkOut: Joi.date()
    .iso()
    .greater(Joi.ref('checkIn'))
    .required()
    .messages({
      'date.greater': 'Check-out date must be after check-in date.',
      'any.required': 'Check-out date is required.',
    }),

  hotelCode: Joi.alternatives()
    .try(
      Joi.string().pattern(/^\d+$/).messages({
        'string.pattern.base': 'Hotel code must contain only digits.',
      }),
      Joi.number().integer().positive()
    )
    .required()
    .messages({
      'any.required': 'Hotel code is required.',
    }),

  rooms: Joi.array()
    .items(
      Joi.object({
        adults: Joi.number().integer().min(1).required().messages({
          'number.base': 'Adults must be a number.',
          'number.min': 'There must be at least 1 adult per room.',
        }),

        childrens: Joi.number().integer().min(0).required().messages({
          'number.base': 'Children must be a number.',
          'number.min': 'Children count cannot be negative.',
        }),

        ChildAges: Joi.string().allow('', null),
      }).custom((room, helpers) => {
        const { childrens, ChildAges } = room;

        if (childrens > 0) {
          if (!ChildAges || String(ChildAges).trim() === '') {
            return helpers.message('ChildAges is required when there are children.');
          }

          const ages = String(ChildAges)
            .split(',')
            .map(a => Number(a.trim()));

          if (ages.length !== childrens) {
            return helpers.message(
              `ChildAges count (${ages.length}) must match number of childrens (${childrens}).`
            );
          }

          const invalidAge = ages.some(age => isNaN(age) || age < 0 || age > 17);
          if (invalidAge) {
            return helpers.message('Each child age must be a valid number between 0 and 17.');
          }
        } else {
          if (ChildAges && String(ChildAges).trim() !== '') {
            return helpers.message('ChildAges should not be provided when there are no children.');
          }
        }

        return room;
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one room must be specified.',
      'any.required': 'Rooms are required.',
    }),
});


const hotelImageSchema = Joi.object({
  hotelCode: Joi.alternatives()
    .try(
      Joi.string().pattern(/^\d+$/).messages({
        'string.pattern.base': 'Hotel code must contain only digits.',
      }),
      Joi.number().integer().positive()
    )
    .required()
    .messages({
      'any.required': 'Hotel code is required.',
    })
})


const rateKeySchema = Joi.object({
  checkIn: Joi.date()
    .iso()
    .greater(today)
    .required()
    .messages({
      'date.greater': 'Check-in date must be after today.',
      'date.base': 'Check-in must be a valid ISO date.',
      'any.required': 'Check-in date is required.',
    }),

  checkOut: Joi.date()
    .iso()
    .greater(Joi.ref('checkIn'))
    .required()
    .messages({
      'date.greater': 'Check-out date must be after check-in date.',
      'any.required': 'Check-out date is required.',
    }),

  rateKey: Joi.string()
    .trim()
    .min(10)
    .required()
    .messages({
      'any.required': 'Rate key is required.',
      'string.empty': 'Rate key cannot be empty.',
      'string.min': 'Rate key must be at least 10 characters long.',
    }),

  rooms: Joi.array()
    .items(
      Joi.object({
        adults: Joi.number().integer().min(1).required().messages({
          'number.base': 'Adults must be a number.',
          'number.min': 'There must be at least 1 adult per room.',
        }),

        childrens: Joi.number().integer().min(0).required().messages({
          'number.base': 'Children must be a number.',
          'number.min': 'Children count cannot be negative.',
        }),

        childAges: Joi.string().allow('', null),
      }).custom((room, helpers) => {
        const { childrens, childAges } = room;

  
        if (childrens > 0) {
          if (!childAges || String(childAges).trim() === '') {
            return helpers.message('childAges is required when there are children.');
          }

          const ages = String(childAges)
            .split(',')
            .map(a => Number(a.trim()));

          if (ages.length !== childrens) {
            return helpers.message(
              `childAges count (${ages.length}) must match number of childrens (${childrens}).`
            );
          }

          const invalidAge = ages.some(age => isNaN(age) || age < 0 || age > 17);
          if (invalidAge) {
            return helpers.message('Each child age must be a valid number between 0 and 17.');
          }
        } else {
          
          if (childAges && String(childAges).trim() !== '') {
            return helpers.message('childAges should not be provided when there are no children.');
          }
        }

        return room;
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one room must be specified.',
      'any.required': 'Rooms are required.',
    }),
});




const hotelBookingSchema = Joi.object({
  contactNumber: Joi.array()
    .items(
      Joi.object({
        phone: Joi.string()
          .pattern(/^[0-9+\-\s()]+$/)
          .required()
          .messages({
            "string.pattern.base": "Invalid phone number format",
          }),
      })
    )
    .min(1)
    .required(),

  hotelName: Joi.string().required(),
  hotelRoom: Joi.string().required(),
  bookingKey: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  from: Joi.date()
    .greater("now")
    .required()
    .messages({
      "date.greater": "Check-in date must be in the future",
    }),
  to: Joi.date()
    .greater(Joi.ref("from"))
    .required()
    .messages({
      "date.greater": "Check-out date must be after check-in date",
    }),

  amount: Joi.number().positive().precision(2).required(),
  hotel_id: Joi.string().required(),
  location_code: Joi.string().length(3).required(),

  personList: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("ADT", "CHD").required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      })
    )
    .min(1)
    .required(),

  roomList: Joi.array()
    .items(
      Joi.object({
        guests: Joi.array()
          .items(
            Joi.object({
              type: Joi.string().valid("ADT", "CHD").required(),
              leadGuest: Joi.boolean().optional(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              phone: Joi.when("type", {
                is: "ADT",
                then: Joi.string().pattern(/^[0-9+\-\s()]+$/).required(),
                otherwise: Joi.forbidden(),
              }),
              email: Joi.when("type", {
                is: "ADT",
                then: Joi.string().email().required(),
                otherwise: Joi.forbidden(),
              }),
              age: Joi.when("type", {
                is: "CHD",
                then: Joi.number().integer().min(0).max(17).required(),
                otherwise: Joi.forbidden(),
              }),
            })
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),

  paymentDetail: Joi.object({
    guaranteeType: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    type: Joi.string().required(),
    cardCode: Joi.string().length(2).required(),
    cardNumber: Joi.string()
      .creditCard()
      .required()
      .messages({
        "string.creditCard": "Invalid credit card number",
      }),
    expiryMonth: Joi.number().integer().min(1).max(12).required(),
    expiryYear: Joi.number()
      .integer()
      .min(new Date().getFullYear())
      .required(),
  }).required(),
});



module.exports = { hotelSearchSchema , hotelCompareSchema , hotelDetailSchema , hotelImageSchema , rateKeySchema , hotelBookingSchema}