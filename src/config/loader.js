/*********************
 **  Module Loader  **
 *********************/

/** Load Node_modules. **/
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var config = require("./config");
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

/** Load custom modules. **/
var REConnector = require("./../modules/REconnector");

/** Set plugin settings. **/
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/** Make instances of Services. **/
var EthereumService = new (require("./../services/EthereumService"));
var SessionService = new (require("./../services/SessionService"));
var ContractService = new (require("./../services/ContractService"))();
var PACTFactoryService = new (require("./../services/PACTFatoryService"))();

/** Make instances of Controllers. **/
require("./../controllers/HttpController").http_listen(http, config);
require("./../controllers/HttpController").app_listen(app, config, path);
require("./../controllers/SessionController").listen(io, SessionService);
require("./../controllers/EthereumController").listen(app, PACTFactoryService, ContractService);

module.exports = {
    app: app,
    http: http,
    path: path,
    config: config,
    REConnector: REConnector
}
