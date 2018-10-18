/** Import models **/
var Contract = require("./models/contract.js");
var PresetService = new (require('./PresetService'))();


/** Constructor **/
function ContractService(){};

/** Helper functions **/
ContractService.prototype.createContract = function(_session){

    /*var contract = new Contract();

    contract.setMembers(getPublicAddressOfSession(_session));
    contract.setData(_session.getContractType());

    console.log(contract);*/

    PresetService.getPreset(_session.getContractType());

};

function getPublicAddressOfSession(_session) {
    var members = [];

    _session.getMembers().forEach(function(element){
        members.push(element.public);
    });

    return members;
}



module.exports = ContractService;