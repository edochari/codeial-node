const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial', 
}

passport.use(new JwtStrategy(opts,function(JwtPayLoad,done){
    User.findById(payload._id,function(err,user){
        if(err){console.log("Error in finding user from JWT",err)}

        if(user){
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    })
}))

module.exports = passport;