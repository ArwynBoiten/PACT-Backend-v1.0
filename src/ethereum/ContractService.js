var CONF = require("./../config/config");
var EthereumService = new (require("./EthereumService"))();
var ContractModel = require("./models/Contract");


function ContractService() {};

/** Make calls to getData() and getMembers() functions of the smart-contract.
*   Fill ContractModel-instance with retrieved data. **/
ContractService.prototype.getData = function(_ADDRESS, _PRIVATE){
    var SmartContract = EthereumService.getContract(
        CONF.ETHEREUM.SC_CONTRACT.ABI,
        _ADDRESS
    );

    EthereumService.setDefaultAccount(_PRIVATE);

    var txOptions = EthereumService.getTXOptions();
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
