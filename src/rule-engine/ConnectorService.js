/**********************************
 **  Rule-Engine (RE) Connector  **
 **********************************/

const axios = require('axios');
const config = require('../config/config');

module.exports = {
    runEngineWithPreset: function(body, endpoint, callback){
        axios.post(config.RULEENGINE.HOST + ":" + config.RULEENGINE.PORT + config.RULEENGINE.ENDPOINT + "/preset/" + endpoint, body)
            .then(function (response) {
                return callback(response);
            })
            .catch(function (error) {
                return callback(error);
            });
    }
};

