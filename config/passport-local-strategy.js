const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
},
function(req,email,password,done){
    User.findOne({email:email})
    .then((user)=>{
       if(!user || user.password != password){
            console.log("Invalid User name and password");
            return done(null,false);
       }
       return done(null,user);
    })
    .catch((err)=>{
       console.log("Error in finding user");
       return done(err);
    })
}
))

//serializing the user by selecting which key to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);

})

//deserializing the user by decrypting the keys from cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=> done(null,user))
    .catch((err)=>{console.log("Error while decrypting user")});

})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in pass on to the next action whic is controller
    if(req.isAuthenticated())
    {
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    //req.user is authenticated user we are sending it to locals views
    console.log("set authenticated user",req.user);
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}
module.exports = passport;