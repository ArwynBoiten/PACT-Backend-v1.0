/**********************
 **  Modules Loader  **
 **********************/
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var config = require("./config");
var REConnector = require("./../modules/REconnector");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/** Make instances of Controllers. **/
require("./../controllers/SessionController").listen(http);
require("./../controllers/HttpController").http_listen(http, config);
require("./../controllers/HttpController").app_listen(app, config, path);

module.exports = {
    app: app,
    http: http,
    path: path,
    config: config,
    REConnector: REConnector
}
