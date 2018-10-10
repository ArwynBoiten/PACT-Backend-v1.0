/**********************************
 **  Rule-Engine (RE) Connector  **
 **********************************/

const axios = require('axios');
const config = require('../config/config');


module.exports = {
    makePostCall: function (endpoint, body, callback) {
        axios.post(config.RULEENGINE.HOST + ":" + config.RULEENGINE.PORT + config.RULEENGINE.ENDPOINT, body)
            .then(function (response) {
                return callback(response);
            })
            .catch(function (error) {
                return callback(error);
            });
    }
}

