var CONF = require("./../config/config");
var EthereumService = require("./EthereumService");
var ContractModel = require("./../models/ethereum/Contract");
var ethService = new EthereumService();


var ContractService = function() {

};

/** Make calls to getData() and getMembers() functions of the smart-contract.
*   Fill ContractModel-instance with retrieved data. **/
ContractService.prototype.getData = function(_ADDRESS, _PRIVATE){
    var SmartContract = ethService.getContract(
        CONF.ETHEREUM.SC_CONTRACT.ABI,
        _ADDRESS
    );

    ethService.setDefaultAccount(_PRIVATE);

    var txOptions = ethService.getTXOptions();
    var contract = new ContractModel(_ADDRESS);

    return SmartContract.methods.getData().call(txOptions).then(function (result) {
            contract.setData(result);

            return SmartContract.methods.getMembers().call(txOptions).then(function (result) {
                contract.setMembers(result);
                return contract;
            });
    });
};

module.exports = ContractService;
