const express = require('express');
const app = express();
const port = 5000;

const db = require('./config/mongoose');
app.use(express.urlencoded());







// app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log("Error in connection" , err);
        return;
    }
    console.log("Server is running on port" , port);
})