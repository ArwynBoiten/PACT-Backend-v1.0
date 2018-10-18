/** Import models **/
var Session = require("./models/session.js");

/** Data save **/
var sessions = [];

/** Constructor **/
function SessionService(){
    this.sessions = [];
};

/** Helper functions **/
SessionService.prototype.createSession = function(id){
    var session = new Session(id, null);

    this.sessions.push(session);
    return session;
};

SessionService.prototype.joinSession = function(id, member){
    this.findSession(id).addMember(member);
};

SessionService.prototype.getSessionById = function(id){
    return this.sessions.find(element => element.id === id);
};

module.exports = SessionService;