const express  = require("express");
const route = express.Router();

route.use('/doctors' , require('./doctors'));
route.use('/patients', require('./patients'));



module.exports = route;



