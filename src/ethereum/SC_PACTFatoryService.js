var CONF = require("./../config/config");
var EthereumService = new (require("./EthereumService"))();

function PACTFactoryService(){};

PACTFactoryService.prototype.createContract = function(_PRIVATE, _DATA, _MEMBERS, callback){
    var PACTFactoryContract = EthereumService.getContract(
        CONF.ETHEREUM.SC_PACTFACTORY.ABI,
        CONF.ETHEREUM.SC_PACTFACTORY.ADDRESS
    );

    EthereumService.setDefaultAccount(_PRIVATE);

    var contract = PACTFactoryContract.methods.createContract(_MEMBERS, _DATA);
    var TX = {
        to: CONF.ETHEREUM.SC_PACTFACTORY.ADDRESS,
        from: EthereumService.getDefaultAccount(),
        gas: CONF.ETHEREUM.SC_PACTFACTORY.GAS
    };

    return EthereumService.sendSignedTX(contract, TX, _PRIVATE, callback);
};

module.exports = PACTFactoryService;
