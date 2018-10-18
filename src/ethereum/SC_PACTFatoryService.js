var CONF = require("./../config/config");
var EthereumService = new (require("./EthereumService"))();

function PACTFactoryService(){};

PACTFactoryService.prototype.createContract = function(_PRIVATE, _DATA, callback){
    var PACTFactoryContract = EthereumService.getContract(
        CONF.ETHEREUM.SC_PACTFACTORY.ABI,
        CONF.ETHEREUM.SC_PACTFACTORY.ADDRESS
    );

    EthereumService.setDefaultAccount(_PRIVATE);

    var _MEMBERS = ["0x5bcb19f00e6725d0bc337af763289ea237905083"];

    var contract = PACTFactoryContract.methods.createContract(_MEMBERS, _DATA);
    var TX = {
        to: CONF.ETHEREUM.SC_PACTFACTORY.ADDRESS,
        from: EthereumService.getDefaultAccount(),
        gas: CONF.ETHEREUM.SC_PACTFACTORY.GAS
    };

    return EthereumService.sendSignedTX(contract, TX, _PRIVATE, callback);
};

module.exports = PACTFactoryService;
