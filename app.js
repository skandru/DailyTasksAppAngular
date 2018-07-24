const express = require('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const config = require('./config/database');
const dailytasks = require('./controllers/dailytasks');
const mongoose = require ('mongoose');

//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS

app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* express.static  is a built in middleware function to serve static files. we are telling express server public folder is the place  to look for the static files.

*/
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
  res.send("Invalid Page");
})

//listen to port 3000
app.listen(port,()=>{
  console.log(`Starting the server at port ${port}`);
});

//connect to database
mongoose.connect(config.database);

//routing all HTTP requests to /dailytasks to dailytasks controller
app.use('/dailytasks',dailytasks);