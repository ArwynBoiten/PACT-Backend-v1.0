/**************************
 **  Libraries importer  **
 **************************/


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var axios = require('axios');
var config = require("./config");
var REConnector = require("./../modules/REconnector");
var SessionController = require("./../controllers/SessionController");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = {
    app: app,
    http: http,
    io: io,
    path: path,
    config: config,
    axios: axios,
    REConnector: REConnector,
    SessionController: SessionController
}
