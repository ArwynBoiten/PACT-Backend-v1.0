/** session.js **/
var Member = require("./member.js");


var Session = function (id, ct) {
    this.id = id;
    this.preset = ct;
    this.members = [];
    this.data = [];
    this.contract = null;
}

Session.prototype.addMember = function (member) {
    this.members.push(member);
}

Session.prototype.setContractType = function (ct) {
    this.preset = ct;
}

Session.prototype.getID = function() {
    return this.id;
}

Session.prototype.getContractType = function () {
    return this.preset;
}

Session.prototype.getMembers = function () {
    return this.members;
}

Session.prototype.getMembersByName = function(name){
    return this.members.find(element => element.name === name);
};

Session.prototype.setMembers = function(_members){
    /** Set users and remove roles from preset list. **/
    this.members = _members;
    var availableRoles = [];

    function checkElement(preset, element){
        preset.roles.forEach(compareElement.bind(null, element));
    }

    function compareElement(element, preset){
        if(element.role.name != preset.name){
            availableRoles.push(preset);
        }
    }

    _members.forEach(checkElement.bind(null, this.preset));
    this.preset.roles = availableRoles;


};

Session.prototype.getData = function(){
    return this.data;
};

Session.prototype.setData = function(_data){
    this.data = _data;
};

Session.prototype.addData = function (_data) {
    this.data = this.data.concat(_data);
};

Session.prototype.getContract = function () {
    return this.contract;
};

Session.prototype.setContract = function (_contract) {
    this.contract = _contract;
};

module.exports = Session;