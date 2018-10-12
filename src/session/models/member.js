/** member.js **/

var Member = function (data) {
    this.data = data;
}

Member.prototype.getData = function () {
    return this.member;
}

Member.prototype.setData = function (data) {
    this.data = data;
    return this.member;
}

module.exports = Member;