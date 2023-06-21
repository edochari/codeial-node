const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:'22675481744-5tlbnjdclulaeia8pver7idlano7mr8s.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec().then((user)=>{
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }).then((user)=>{
                    return done(null,user);
                }).catch((err)=>{
                    console.log('Error in finding user strategy-passport',err);
                        return ;
                })
                
                
               
            }
        }).catch((err)=>{
            if(err){
                console.log('Error in strategy-passport',err);
                return ;
            }
        })
           

    }
));        



    



module.exports = passport;