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
var stringifyObject = require('stringify-object');

/** Load custom rule-engine. **/
var ruleEngine = require("./../rule-engine/ConnectorService");

/** Set plugin settings. **/
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/** Make instances of Services. **/
var EthereumService = new (require("./../ethereum/EthereumService"));
var SessionService = new (require("./../session/SessionService"));
var SC_ContractService = new (require("./../ethereum/SC_ContractService"))();
var PACTFactoryService = new (require("./../ethereum/SC_PACTFatoryService"))();
var ContractService = new (require("./../contract/ContractService"));
var PresetService = new (require("./../contract/PresetService"));
var RuleEngine = require("./../rule-engine/ConnectorService");

/** Make instances of Controllers. **/
require("./../http/HttpController").http_listen(http, config);
require("./../http/HttpController").app_listen(app, config, path);
require("./../session/SessionController").listen(io, SessionService, ContractService, PresetService, RuleEngine, PACTFactoryService, stringifyObject, SC_ContractService);
require("./../ethereum/EthereumController").listen(app, PACTFactoryService, SC_ContractService);

module.exports = {
    app: app,
    http: http,
    path: path,
    config: config,
    ruleEngine: ruleEngine,
    stringifyObject: stringifyObject
};


// Author: Arwyn Boiten