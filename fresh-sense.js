"use strict"

var portNumber = 2222;

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var async = require('async');
var global = require('./appConfig');
var base = require('./helpers/base')();
var dbv2 = require('./helpers/db_v2')();


app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));
app.listen(portNumber, function () {
    console.log('server listening at ' + portNumber);
});
app.use(express.static('public'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/views/index.html")
});

app.post('/services/saveUser', function (req, res) {
    var r = req.body;
    var option = base.getQueryObj2(global.dataBase, global.dbName, global.settings.userProfile, r);
    dbv2.saveData(option, function (r) {
        res.json(r);
    })

});
app.post('/services/getSettings', function (req, res) {
    var r = req.body;
    var option = base.getQueryObj2(global.dataBase, global.dbName, global.settings.settings, {})
    dbv2.findOne(option, function (r) {
        res.json(r);
    });
});
app.post('/services/saveOrder', function (req, res) {
    var r = req.body;
    var option = base.getQueryObj2(global.dataBase, global.dbName, global.settings.bill, r);
    dbv2.saveData(option, function (r) {
        res.json(r);
    });
});
app.post('/services/saveSettings', function (req, res) {
    var r = req.body;
    var option = base.getQueryObj2(global.dataBase, global.dbName, global.settings.settings, r);
    dbv2.saveData(option, function (r) {
        res.json(r);
    });
});