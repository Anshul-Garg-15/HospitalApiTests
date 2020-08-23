const passport = require('passport');
const passportJwtStrategy = require('passport-jwt').Strategy;

//to extract header from passport-jwt
const extractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../model/doctor');


let option = {
    
    //this extract jwt from header then token from passport-jwt
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    //this is decrypted key
    secretOrKey: 'hospital'
}

passport.use(new passportJwtStrategy(option , function(jwtPayLoads , done){

    Doctor.findById(jwtPayLoads._id , function(err , doctor)
    {
        if(err){console.log("error in finding doctor",err); return;}

        if(doctor){
            return (null , doctor);
        }else{
            return (null,false);
        }
    });

}));


//check the user is authenticate
passport.checkAuthentication = function(req , res , next){
    //if the user is signed in then show the next page of the user means next request execute
    if(req.isAuthenticated()){
        return next();
    }
  
}

//to send the user data to views if user is authenticated
//middleware
passport.setAuthenticatedUser = function(req , res , next,){
    
    if(req.isAuthenticated()){

        //req.user contains the user data from the session cookies and we send this data to local
        res.locals.user = req.user;
    }
    

    next();
   

}

module.exports = passport;