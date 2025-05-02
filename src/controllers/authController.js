const { User , Role , UserRole } = require('../database/models');
const transport = require('../config/mailConfig');
const bcrypt = require('bcrypt');
const moment = require('moment');

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

    register : async (request , response ) =>{
        try{
            const { name , number , email , password  } = request.body;
            const user = await User.findOne({ where : { email : email}});
            if(user){
                return response.status(200).json({
                    status: false,
                    message: 'Already register with this email try login',
                })
            }
            
            let saltcount  = 10;
            let hashedPassword = await bcrypt.hash( password , saltcount);
            const token = generateRandomToken();
            const tokenExpiryTime = moment().add( 10 , 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const imageName = request.file ? request.file.filename : null;
            let createdUser = await User.create({
                name : name,
                email : email,
                password : hashedPassword,
                platform_image : imageName,
                number : number,
                token : token,
                expires_at : tokenExpiryTime
            })

            let role = await Role.findOne({where : {title : 'user'}});

            await UserRole.create({
                user_id : createdUser.id,
                role_id : role.id
            });

            const mailOptions= {
                from : 'test@gmail.com',
                to : email,
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


            return response.status(200).json({
                status: true,
                message: 'Verification code has been sent to your email address, please verify your email',
            })



        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    verifyToken : async (request , response) =>{
        try{
            const { email , token } = request.body;
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

                return response.status(200).json({
                    status: true,
                    message: 'Your email verified successfully'
                })

            }else{
                return response.status(200).json({
                    status: false,
                    message: 'Your token does not match'
                })
            }



        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    generateToken : async (request, response) =>{
        try{

            const { email } = request.body;

            const token = generateRandomToken();
            const tokenExpiryTime = moment().add( 10 , 'minutes').format('YYYY-MM-DD HH:mm:ss');

            const user = await User.findOne({
                where : {email : email}
            })

            if(!user){
                return response.status(500).json({
                    status : false,
                    message : "User not found with this email"
                })
            }

            await User.update(
                { token : token, expires_at : tokenExpiryTime}, 
                { where :  {email : email} } 
            )

            const mailOptions = {
                from : 'test@gmail.com',
                to : email,
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


            return response.status(200).json({
                status: true,
                message: 'Verification code has been sent to your email address, please verify your email',
            })
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    updateForgotPassword : async ( request , response ) => {
        try {

            const { token , email , password } = request.body;

            const user = await User.findOne({
                where : { email : email}
            });

            if(!user){
                return response.status(500).json({
                    status : false,
                    message : "User not found with this email"
                })
            }

            if(user.token != token){
                return response.status(500).json({
                    status : false,
                    message : "Code doesn't match"
                })
            }


            let addedTokenTime  = moment(user.expires_at);
            let currentTime = moment();

            if(addedTokenTime.isBefore(currentTime) ){
                return response.status(200).json({
                    status: false,
                    message: 'Your verification token is expired'
                })
            }


            let saltcount  = 10;
            let hashedPassword = await bcrypt.hash( password , saltcount);

            await User.update(
                {password : hashedPassword},
                {where : {email : email} }
            )


            return response.status(200).json({
                status: true,
                message: 'Password Updated',
            })
        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },

   

}
