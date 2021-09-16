const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

//how do I encrypt? key needed = generate a random hex

let options={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(options,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('err in finding user from jwt',err);
            return;
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}))

module.exports= passport;