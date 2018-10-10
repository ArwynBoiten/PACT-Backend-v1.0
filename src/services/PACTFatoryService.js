var CONF = require("./../config/config");
var EthereumService = require("./EthereumService");

var ethService = new EthereumService();
var PACTFactoryContract = null;

var PACTFactoryService = function() {

    PACTFactoryContract = ethService.getContract(
        CONF.ETHEREUM.SC_CONTRACT.ABI,
        CONF.ETHEREUM.SC_CONTRACT.ADDRESS
    );
};

PACTFactoryService.prototype.getData = function(){
    var txOptions = ethService.getTXOptions();
    return PACTFactoryContract.methods.getData().call(txOptions);
};



module.exports = PACTFactoryService;
