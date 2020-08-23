const express = require('express');
const app = express();
const port = 5000;

const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

//require all for session cookie
const session = require('express-session');
const passport = require('passport');


const passportjwtStrategy = require('./config/passport-jwt-strategy');
app.use(express.urlencoded());


app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log("Error in connection" , err);
        return;
    }
    console.log("Server is running on port" , port);
})