/** contractType.js **/

var ContractType = function (name) {
    this.name = name;
}

ContractType.prototype.getName = function () {
    return this.name;
}

module.exports = ContractType;