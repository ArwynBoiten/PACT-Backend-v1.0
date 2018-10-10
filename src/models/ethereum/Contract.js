/** contractType.js **/

var Contract = function (_address) {
    this.address = _address;
};

Contract.prototype.setData = function (_data) {
    this.data = _data;
};

Contract.prototype.setMembers = function (_members) {
    this.members = _members;
};

Contract.prototype.getAddress = function () {
    return this.address;
};

Contract.prototype.getData = function () {
    return this.data;
};

Contract.prototype.getMembers = function () {
    return this.members;
};

module.exports = Contract;