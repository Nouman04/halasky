const nodemailer = require('nodemailer')


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "727248e3f11e83",
      pass: "a44de9c96a5f4f"
    }
  });

  module.exports = transport;