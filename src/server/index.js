const dotenv = require('dotenv');
dotenv.config();


const API_KEY='c42671487bfe1d54838001ec879c5b30'
console.log(`Your API key is ${API_KEY}`);

var path = require('path')
var cors=require('cors')


const fetch=require('node-fetch') 
const mockAPIResponse = require('./mockAPI.js')




const port=8085

const express = require('express')
const app = express()



var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)







// designates what port the app will listen to for incoming requests
app.listen(port, function () {
   console.log("server running");
   console.log(`running on localhost: ${port}`);
})

ProjectData={};

app.get(`http://localhost:${port}/`, function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get(`http://localhost:${port}/test`, function (req, res) {
    res.send(mockAPIResponse)
})

app.post(`http://localhost:${port}/addWeatherData`,function (req, res){
    ProjectData.temp=req.body.temp;
    ProjectData.date=req.body.date;
    ProjectData.newFeelings=req.body.newFeelings;
    res.send(ProjectData);    
    console.log(ProjectData);
})

//module.exports = app;

