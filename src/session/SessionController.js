/*******************************
 **  SOCKET SERVER CONTROLLER  **
 *******************************/

module.exports.listen = function(io, SessionService, ContractService, PresetService) {

    io.on('connect', function (socket) {

        /** Create new contract models **/
        socket.on('createSession', function (data) {
            if (!SessionService.getSessionById(data.id)) {
                var session = SessionService.createSession(data.id);
                session.addMember(data.member);

                /** Create socket room with contract ID **/
                socket.join(session.getID());
                sendSession(data.id, session);
            } else {
                sendErrorMessage(socket, data.id, "already exist.");
            }
        });

        /** Join exisiting contract models **/
        socket.on('joinSession', function (data) {
            /** Check if models exists. **/
            if (SessionService.getSessionById(data.id)) {
                var session = SessionService.getSessionById(data.id);
                var preset = session.getContractType();
                var error = null;

                if(preset){
                    if(preset.member_limit == session.getMembers().length) {
                        error = " Member limit is reached for this preset (" + preset.member_limit + ").";
                    }
                }
                if (session.getMembersByName(data.member.name)) {
                    error = " User is already joined."
                }
                if(error == null){
                    session.addMember(data.member);
                    socket.join(session.getID());
                    sendSession(data.id, session);
                } else {
                    sendErrorMessage(socket, data.id, error);
                }

            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });

        /** Generate contract for session. **/
        socket.on('generateContract', function (data) {
            /** Check if models exists. **/
            if (SessionService.getSessionById(data.id)) {
                var session = SessionService.getSessionById(data.id);

                ContractService.createContract(session);
            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });

        socket.on('updateSession', function (data) {
            if (SessionService.getSessionById(data.id)) {
                var session = SessionService.getSessionById(data.id);
                var preset = PresetService.getPreset(data.ct);

                if(session.getMembers().length > preset.member_limit){
                    sendErrorMessage(socket, data.id, " Session contains too much members for this preset.");
                } else {
                    session.setContractType(preset);
                    sendSession(data.id, session);
                }
            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });

        /** Generate contract for session. **/
        socket.on('getPresetList', function (data) {
            var presets = PresetService.getPresetList();
            sendPresetList(data.id, presets);
        });
    });

    /** Socket Error emit function. **/
    function sendErrorMessage(socket, contract, message) {
        socket.emit('errorMessage', "[ERROR] - [" + contract + "] " + message);
    }

    /** Socket sends session. **/
    function sendSession(roomName, session) {
        io.to(roomName).emit('session', session);
    }

    /** Socket sends generated contract. **/
    function sendContract(roomName, contract){
        io.to(roomName).emit('contract', contract);
    }

    function sendPresetList(roomName, presetList){
        io.to(roomName).emit("presets", presetList);
    }
};


/** CODE SNIPPET **/

/** Generate contract for contract models **/
/*socket.on('generateContent', function (data) {
 lib.REConnector.makePostCall("rules", {age: data.age}, function (response) {
 sendErrorMessage(socket, data.contract, "{'age': " + response.data.age + ", 'result':" + response.data.result + ", 'matchPath':" + response.data.matchPath + "}");
 });
 });*/