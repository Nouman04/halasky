require('dotenv').config();
const jwt = require('jsonwebtoken')
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports  = {
    login : async (request , response ) => {

        try {
            const {email , password}  = request.body;

            const userDetail = await User.findOne({ where : {email : email}});
    
            if(!userDetail){
                return response.status(200).json({status : false , 'error' : "No user found"})
            }
    
            const match = await bcrypt.compare( password , userDetail.password);
    
            if(!match){
                return response.status(200).json({status : false , 'error' : "your password doesn't match"})
            }
            
            let userData = userDetail.get()
    
            delete userData.password;
    
            let token = jwt.sign(userData , process.env.NOD_SECRET_KEY , {expiresIn: '4h'});
    
            return response.status(200).json({status : true , "message" : "Login Successfull" , token : token})

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })  
        }

    }
}