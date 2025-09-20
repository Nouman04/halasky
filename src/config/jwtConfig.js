require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User , Role , GeneralSetting , LogActivity } = require("../database/models");
const bcrypt = require("bcrypt");
const moment = require('moment');
const { Op } = require('sequelize');
const transport = require('../config/mailConfig');


function generateRandomToken(){
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    // Loop to generate characters for the specified length
    for (let i = 0; i < 6; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomInd);
    }
    return token;
}


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

        const startOfDay = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
        const endOfDay   = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");

        const logs = await LogActivity.findAll( { where : {
                          title: 'login failed',
                          user_id : userDetail.id,
                          created_at: {
                              [Op.between]: [startOfDay, endOfDay]
                            }
                        }});

        if(logs.length > 2){
            await LogActivity.create({ 
                              user_id : userDetail.id,
                              title : 'Suspicious Activity',
                              action : 'login failed',
                              ip : request.ip,
                              information : 'Suspicious activity perform'
                            })  
        } else {
            await LogActivity.create({ 
                                user_id : userDetail.id,
                                title : 'login failed',
                                action : 'failed',
                                information : 'login failed password not match'
                              }) 
        }

        
        return response
          .status(200)
          .json({ status: false, error: "Your password doesn't match" });
      }

      let userData = userDetail.get();
      const generalSetting = await GeneralSetting.findOne({where : {type : '2fa'}});

      if( userDetail.Roles.length && userDetail.Roles[0].title !== 'user' && generalSetting.is_enabled ){
        const token = generateRandomToken();
        const tokenExpiryTime = moment().add( 10 , 'minutes').format('YYYY-MM-DD HH:mm:ss');
        
        User.update(
          {
            verification_token : token,
            expires_at : tokenExpiryTime
          },
          {where : {id : userDetail.id}}
        )

          const mailOptions= {
              from : process.env.EMAIL_FROM,
              to : userDetail.email,
              subject : 'Verification Token',
              text : `Here is your verification token: ${token}`
          }
        
          transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent successfully:', info.response);
              }
          });

        return response
          .status(200)
          .json({ status: true, message: "Verification token has been sent to your email" });
      }


      delete userData.password;

      let token = jwt.sign(userData, process.env.NODE_SECRET_KEY, {
        expiresIn: "4h",
      });


      const imageUrl =  `${process.env.APP_URL}/uploads/image`;
      const roles = userDetail.Roles;
      return response.status(200).json({
        status: true,
        message: "Login Successful",
        token: token,
        user: userData,
        imageUrl: imageUrl,
        roles : roles
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  verifyLoginToken : async (request , response ) => {
    try{
       const { email, token } = request.body;
       const user = await User.findOne({ include : {
                                        model : Role
                                      }, 
                                      where : {email : email}});
       
       if(user.verification_token === token){
          let userData = user.get();
          const roles = user.Roles;
          delete userData.password;
          let token = jwt.sign(userData, process.env.NODE_SECRET_KEY, {
            expiresIn: "4h",
          });

          const imageUrl =  `${process.env.APP_URL}/uploads/image`;

          return response.status(200).json({
                          status: true,
                          message: "Login Successful",
                          token: token,
                          user: userData,
                          imageUrl: imageUrl,
                          roles : roles
                        });

       } else {
          return response.status(500).json({
            status: false,
            message: "Token doesn't match correctly",
          });
       }
        


    } catch(error) {
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

        const imageUrl =  `${process.env.APP_URL}/uploads/image`;

      return response.status(200).json({
        status: true,
        message: "Login Successfull",
        token: token,
        user: userData,
        imageUrl: imageUrl
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
