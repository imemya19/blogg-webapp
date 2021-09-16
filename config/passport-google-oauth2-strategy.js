const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

//tell passport to use this strtegy for googe login
passport.use(new googleStrategy({
    clientID:"", //add the client id
    clientSecret: "", //add client secret
    callbackURL:"http://localhost:8000/users/auth/google/callback"
}, 
    function(accessToken, refreshToken,profile,done){
       //find a user
        User.findOne({ email: profile.emails[0].value}).exec(function(err, user){
            if(err){console('err in google startegy-passport.',err); return;}
            console.log(profile);
            console.log(accessToken,refreshToken);


            if(user){
                //if found, set this use as reqq.user
                return done(null,user);
            }
            else{
                //if not found,create the use user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console('err in creating user google startegy-passport.',err); return;}
                    return done(null,user);

                })
            }
    });
})
)
    
module.exports= passport;