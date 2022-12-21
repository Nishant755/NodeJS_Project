const express=require('express');
const app=express()
const connection=require('./connection');
const employRoute=require('./route/employ')
var bodyParser = require('body-parser')

//.....................................................................................................................

app.use(bodyParser.json())
app.use('/employ',employRoute)

//.....................................................................................................................
module.exports=app