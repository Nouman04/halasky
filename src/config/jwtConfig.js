require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User , Role } = require("../database/models");
const bcrypt = require("bcrypt");
const moment = require('moment');

module.exports = {
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const userDetail = await User.findOne({ 
        include : {
          model : Role
        },
        where: { email: email } 
      });

      if (!userDetail) {
        return response
          .status(200)
          .json({ status: false, error: "No user found" });
      }

      const match = await bcrypt.compare(password, userDetail.password);

      if (!match) {
        return response
          .status(200)
          .json({ status: false, error: "Your password doesn't match" });
      }

      let userData = userDetail.get();

      delete userData.password;

      let token = jwt.sign(userData, process.env.NODE_SECRET_KEY, {
        expiresIn: "4h",
      });

      console.log("Generated Token:", token);

      return response.status(200).json({
        status: true,
        message: "Login Successful",
        token: token,
        user: userData,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  verifyNativeToken : async (request, response) => {
    try {
      const { email, token } = request.body;

      const user = await User.findOne({ where : {email : email}});

        if(!user){
            return response.status(200).json({
                status: false,
                message: 'User does not found with this email',
            }); 
        }

        if(user.is_email_verified){
            return response.status(200).json({
                status: false,
                message: 'User already verified',
            }); 
        }

       let addedTokenTime  = moment(user.expires_at);
       let currentTime = moment();

       if(addedTokenTime.isBefore(currentTime) ){
          return response.status(200).json({
              status: false,
              message: 'Your verification token is expired'
          })
      }


      if(user.token == token){
          await User.update(
              { is_email_verified : 1},
              {where : {email : email}}
          );


        const userDetail = await User.findOne({ 
          include : {
            model : Role
          },
          where: { email: email } 
        });

        let userData = userDetail.get();

        delete userData.password;

        let token = jwt.sign(userData, process.env.NODE_SECRET_KEY, {
          expiresIn: "4h",
        });


      return response.status(200).json({
        status: true,
        message: "Login Successful",
        token: token,
        user: userData,
      });

      }else{
          return response.status(200).json({
              status: false,
              message: 'Your token does not match'
          })
      }

    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  }
};
