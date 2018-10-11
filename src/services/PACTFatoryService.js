var CONF = require("./../config/config");
var EthereumService = new (require("./EthereumService"))();
var PACTFactoryContract = null;

function PACTFactoryService() {

    PACTFactoryContract = EthereumService.getContract(
        CONF.ETHEREUM.SC_PACTFACTORY.ABI,
        _ADDRESS
    );
};

PACTFactoryService.prototype.getData = function(){
    var txOptions = EthereumService.getTXOptions();
    return PACTFactoryContract.methods.getData().call(txOptions);
};



module.exports = PACTFactoryService;
