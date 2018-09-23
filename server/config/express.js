/******************************/
// author : HAJAR A.AZIZ AL MADHOOB
/******************************/
var express=require('express');
var morgan=require('morgan');
var bodyparser=require('compression');
var bodyparser=require('body-parser');
var methodoverride=require('method-override')
var config=require('./config')
var session =require('express-session')
module.exports=function(){

  var app=express()

  if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
  }

  else if(process.env.NODE_ENV==='production'){
    app.use(compress())
  }

app.use(bodyparser.json())
app.use(methodoverride())
app.use(session({
  saveUninitialized: true,
  resave :true,
  secret: config.sessionSecret
}))
app.set('views','../server/views')
app.set('view engine','ejs')


  require('../server/routing/index.server.routes.js')(app);
  app.use(express.static('../public'))
  return app;
}
