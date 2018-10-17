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
var EthereumService = new (require("./../ethereum/EthereumService"));
var SessionService = new (require("./../session/SessionService"));
var ContractService = new (require("./../ethereum/ContractService"))();
var PACTFactoryService = new (require("./../ethereum/PACTFatoryService"))();

/** Make instances of Controllers. **/
require("./../http/HttpController").http_listen(http, config);
require("./../http/HttpController").app_listen(app, config, path);
require("./../session/SessionController").listen(io, SessionService);
require("./../ethereum/EthereumController").listen(app, PACTFactoryService, ContractService);

//PACTFactoryService.createContract("0x4ed14a80bc682d3506d46ff599157bdbb2d705b3", "0x23f20b4b1d01cdc73f945ed40180fcc58620cebea26dd79f67b779c8f0a1245e");

module.exports = {
    app: app,
    http: http,
    path: path,
    config: config,
    REConnector: REConnector
}


// Author: Arwyn Boiten