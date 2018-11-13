/** Import models **/
var Contract = require("./models/contract.js");

/** Constructor **/
function ContractService(){};

/** Helper functions **/
ContractService.prototype.createContract = function(_session, _data){
    var contract = new Contract();
    contract.setMembers(getNamesOfSession(_session));
    contract.setData(_data);

    _session.setContract(contract);
};

function getNamesOfSession(_session) {
    var members = [];

    _session.members.forEach(function(element){
        members.push({name: element.name, address: element.publicKey, role: element.role.name});
    });

    return members;
}

module.exports = ContractService;