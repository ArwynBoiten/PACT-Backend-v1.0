/** session.js **/
var Member = require("./member.js");


var Session = function (id, ct) {
    this.id = id;
    this.contractType = ct;
    this.members = [];
}

Session.prototype.addMember = function (member) {
    this.members.push(member);
}

Session.prototype.editContractType = function (ct) {
    this.contractType = ct;
}

Session.prototype.getID = function() {
    return this.id;
}

Session.prototype.getContractType = function () {
    return this.contractType;
}

Session.prototype.getMembers = function () {
    return this.members;
}

Session.prototype.getMembersByName = function(name){
    return this.members.find(element => element.name === name);
};



module.exports = Session;