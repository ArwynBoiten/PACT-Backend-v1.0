/** contract.js **/

var Contract = function () {
    this.data = "";
    this.members = [];
};

Contract.prototype.setMembers = function (members) {
    this.members = members;
};

Contract.prototype.setData = function (data) {
    this.data = data;
};

Contract.prototype.getMembers = function() {
    return this.members;
};

Contract.prototype.getData = function () {
    return this.data;
};



module.exports = Contract;