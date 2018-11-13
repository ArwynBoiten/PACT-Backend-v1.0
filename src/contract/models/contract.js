/** contract.js **/

var Contract = function () {
    this.data = "";
    this.members = [];
    this.agreed = 0;
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

Contract.prototype.sign = function () {
    this.agreed++;

    if(this.agreed >= this.getMembers().length){
      this.agreed = true;
    }

    return this.agreed;
};



module.exports = Contract;