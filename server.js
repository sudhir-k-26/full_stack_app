if (process.env.NODE_ENV !== 'production') {
   const dotenv =  require('dotenv');
   dotenv.config({path:'./.env'});
  }
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const routes = require('./routes/index');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex:true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error',error=>{
    console.log(err);
});
db.once('open',()=>{console.log("Connected")});



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/',routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`server running on port ${PORT}`);
});
