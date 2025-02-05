require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../database/models');


const initializePassport = (passport) => {
    passport.use( new JwtStrategy({
        secretOrKey : process.env.NOD_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },  async function(payload , next){
        const email = payload.email;
        const user = await User.findOne({ where : {email}});

        if(!user){
            return next("Unauthorized" , false );
        } 

        if(user){
            next(null , user);
        } else {
            next(null , false);
        }

    }))

}


module.exports = initializePassport;

