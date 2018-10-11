/*******************************
 **  SOCKET SERVER CONTROLLER  **
 *******************************/

module.exports.listen = function(io, SessionService) {

    io.on('connect', function (socket) {

        /** Create new contract session **/
        socket.on('createSession', function (data) {
            if (!SessionService.getSessionById(data.id)) {
                var session = SessionService.createSession(data.id, data.ct);
                session.addMember(data.member);

                /** Create socket room with contract ID **/
                socket.join(session.getID());
                sendSession(data.id, session);
            } else {
                sendErrorMessage(socket, data.id, "already exist.");
            }
        });

        /** Join exisiting contract session **/
        socket.on('joinSession', function (data) {
            /** Check if session exists. **/
            if (SessionService.getSessionById(data.id)) {
                var session = SessionService.getSessionById(data.id);

                /* Check if name isn't already used. */
                if (!session.getMembersByName(data.member.name)) {
                    session.addMember(data.member);
                    socket.join(session.getID());
                    sendSession(data.id, session);
                } else {
                    sendErrorMessage(socket, data.id, " User is already joined.");
                }
            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });
    });

    /** Socket Error emit function. **/
    function sendErrorMessage(socket, contract, message) {
        socket.emit('errorMessage', "[ERROR] - [" + contract + "] " + message);
    }

    /** Socket send function. **/
    function sendSession(roomName, session) {
        io.to(roomName).emit('session', session);
    }
};


/** CODE SNIPPET **/

/** Generate contract for contract session **/
/*socket.on('generateContent', function (data) {
 lib.REConnector.makePostCall("rules", {age: data.age}, function (response) {
 sendErrorMessage(socket, data.contract, "{'age': " + response.data.age + ", 'result':" + response.data.result + ", 'matchPath':" + response.data.matchPath + "}");
 });
 });*/