const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const d = new Date();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//vars
var dir = __dirname;
var jsonParser = bodyParser.json();

var dailyData;

//routes
app.get('/', (req, res) => {
    res.sendFile(dir+'/public/index.html');
});

app.get('/todaysData', (req, res) => {
    var today = '0000';

    if(d.getDate() < 10) {
        today = '0'+d.getDate();
    } else {
        today = d.getDate();
    }

    if(d.getMonth() < 10) {
        today += '0'+d.getMonth();
    } else {
        today += d.getMonth();
    }

    for(var i=0; i<dailyData.length; i++) {
        if(dailyData[i].id == today) {
            console.log("returns todays data ");
            res.json(dailyData[i]);
            return;
        }
    }
    dailyData.push({id:today,pushUp:0,pullUp:0,climbed:false});
    res.sendStatus(200);
});

app.post('/updatePushUpNumber', (req, res) => {
    var today = '0000';

    if(d.getDate() < 10) {
        today = '0'+d.getDate();
    } else {
        today = d.getDate();
    }

    if(d.getMonth() < 10) {
        today += '0'+d.getMonth();
    } else {
        today += d.getMonth();
    }

    for(var i=0; i<dailyData.length; i++) {
        if(dailyData[i].id == today) {
            dailyData[i].pushUp += parseInt(req.body.amount);
            //console.log(dailyData[i].pushUp);

            saveData();
            res.status(200).send("OK");
            return;
        }
    }
    //the day is not found
    dailyData.push({id:today,pushUp:0,pullUp:0,climbed:false});

    res.status(200).send("OK");
});

app.post('/updatePullUpNumber', (req, res) => {
    var today = '0000';

    if(d.getDate() < 10) {
        today = '0'+d.getDate();
    } else {
        today = d.getDate();
    }

    if(d.getMonth() < 10) {
        today += '0'+d.getMonth();
    } else {
        today += d.getMonth();
    }

    for(var i=0; i<dailyData.length; i++) {
        if(dailyData[i].id == today) {
            dailyData[i].pullUp += parseInt(req.body.amount);
            //console.log(dailyData[i].pullUp);

            saveData();
            res.status(200).send("OK");
            return;
        }
    }
    //the day is not found
    dailyData.push({id:today,pushUp:0,pullUp:0,climbed:false});

    res.status(200).send("OK");
});

//static functions
function readData() {
    console.log("Loading user JSON data");
    fs.readFile('public/dailyData.json', 'utf-8', (err, data) => {
        if(err) {
            throw err;
        }
        dailyData = JSON.parse(data.toString());
    });
}

function saveData() {
    console.log("Backing up user JSON data");
    fs.writeFileSync(path.resolve(dir, 'public/dailyData.json'), JSON.stringify(dailyData, null, 2));
}

app.use(express.static(__dirname + '/public'));

app.listen(4567, function() {
    console.log("server started");
    readData();
});