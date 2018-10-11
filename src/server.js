var lib = require('./config/loader');

var ContractService =
    new (require("./services/ContractService"))();
var PACTFactoryService =
    new (require("./services/PACTFatoryService"))();


/************************
 **  ETHEREUM SECTION  **
 ************************/


/** Get "Contract" data from Ethereum network
 * @Param: Address - Address of "contract"
 * @Param: PrivateKey - Private key of member
 */
lib.app.post('/eth/contract', function(req, res){
    ContractService.getData(req.body.address, req.body.privateKey).then(function(result){
        res.send(result);
    });
});


lib.app.post('/eth/factory', function(req, res){
    PACTFactoryService.getData();
});



