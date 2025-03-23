const nodemailer = require("nodemailer");

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6a763c6d8bd25f",
    pass: "b3544819ba007b",
  },
});

module.exports = transport;
