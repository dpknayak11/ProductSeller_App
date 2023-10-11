require('dotenv').config()
const http = require('http');
const express = require('express');
const path = require('path');
const sequelizedb = require('./model/products')
const bodyParser = require("body-parser");
const errorcontroller = require('./controller/404')
const productPage = require('./routes/product')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')))

app.use(productPage);
app.use(errorcontroller.get404);
const port = process.env.PORT;

sequelizedb
// .sync()
.sync({force: true})
.then(() => { 
   app.listen(port , ()=> console.log(`Listening on ${port}`));
 })
.catch((err) => { console.log(err) });