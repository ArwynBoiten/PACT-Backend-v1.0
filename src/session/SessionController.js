/*******************************
 **  SOCKET SERVER CONTROLLER  **
 *******************************/

module.exports.listen = function(
    io, SessionService, ContractService, PresetService,
    RuleEngine, PACTFactoryService, stringifyObject, SC_ContractService)
{

    io.on('connect', function (socket) {
        
        /** Create new contract models **/
        socket.on('createSession', function (data) {
            if (!SessionService.getSessionById(data.id)) {
                var session = SessionService.createSession(data.id);
                session.addMember(data.member);

                /** Create socket room with contract ID **/
                socket.join(session.getID());
                sendSession(data.id, session);

                var presets = PresetService.getPresetList();
                sendPresetList(data.id, presets);
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
                    if(session.getMembers().length >= preset.member_limit ) {
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
                    sendPresetList(data.id, session.getContractType());
                } else {
                    sendErrorMessage(socket, data.id, error);
                }

            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });
        
        /** Update contract with new session info. **/
        socket.on('updateSession', function (data) {
            if (SessionService.getSessionById(data.id)) {
                var session = SessionService.getSessionById(data.id);
                var preset = data.preset;

                //var preset = PresetService.getPreset(data.preset.index);
                //console.log(preset);


                if(session.getMembers().length > data.preset.member_limit){
                    sendErrorMessage(socket, data.id, " Session contains too much members for this preset.");
                } else {
                    session.setContractType(preset);
                    session.setMembers(data.members);
                    session.setData(data.data);

                    sendSession(data.id, session);
                }
            } else {
                sendErrorMessage(socket, data.id, "doesn't exist.");
            }
        });

        /** Generate contract for session-page. **/
        socket.on('generateContract', function (sessionID) {
            var session = SessionService.getSessionById(sessionID);

            /** Check if session has data for contract. **/
            if(session.getData().length > 0){
                session.setData(parseArrayToElement(session.getData()));
                generateContract(socket, session);
            } else {
                sendErrorMessage(socket, sessionID, "has no data.");
            }
        });

        /** Sign genereated contract. **/
        socket.on('signContract', function (sessionID) {
            var session = SessionService.getSessionById(sessionID);
            var contract = session.getContract();

            if(contract){
                if(typeof contract.sign() == 'number'){
                    sendSession(sessionID, session);
                } else {
                    sendContract(sessionID, contract);
                    saveContract(session, contract);
                }
            } else {
                sendErrorMessage(socket, sessionID, "has no contract.");
            }
        })

        socket.on('getContract', function (data) {
            var contract = SC_ContractService.getData(data.address, data.pk);
            contract.then(function (result) {
                sendSCData(data.id, JSON.parse(result.data));
            });
        })
    });


    /** HELPER FUNCTIONS **/

    /** Socket error emit function. **/
    function sendErrorMessage(socket, contract, message) {
        socket.emit('errorMessage', "Session " + contract + " " + message);
    }

    /** Socket sends session element. **/
    function sendSession(roomName, session) {
        io.to(roomName).emit('session', session);
    }

    /** Socket sends generated contract. **/
    function sendContract(roomName, contract){
        io.to(roomName).emit('contract', contract);
    }

    /** Socket sends presetlist. **/
    function sendPresetList(roomName, presetList){
        io.to(roomName).emit("presets", presetList);
    }

    /** Socket sends ethereum status. **/
    function sendStatus(roomName, status){
        io.to(roomName).emit("status", status);
    }

    function sendContractAddress(roomName, address){
        io.to(roomName).emit("contract-address", address);
    }

    function sendSCData(roomName, smartContract){
        io.to(roomName).emit("contract-data", smartContract);
    }


    function parseArrayToElement(array){
        var element = {};
        for(var obj in array){
            for(var key in array[obj]){
                if(key == "object"){
                    element[key] = parseArrayToElement(array[obj][key]);
                } else {
                    element[key] = array[obj][key];
                }
            }
        }
        return element;
    }

    function generateContract(socket, session){

        var body = session.getData();
        var preset = session.getContractType().rule_preset;

        RuleEngine.runEngineWithPreset(body, preset, function (response) {

            if(response.data.error){
                io.to(session.getID()).emit('errorMessage', "Partijen voldoen niet aan eisen. " + response.data.error + " )");
            } else {
                ContractService.createContract(session ,response.data);
                sendSession(session.getID(), session);
            }
        });
    }

    function saveContract(session, contract){
        var data = {};
        data['data'] = contract.data;
        data['members'] = contract.members;

        var members = [];
        contract.members.forEach(function (member) {
            members.push(member.address);
        });

        var pk = session.members[0].privateKey;

        sendStatus(session.getID(), "Contract wordt opgeslagen");

        PACTFactoryService.createContract(pk, JSON.stringify(data), members, function(result){
            var data = result.logs[0].data;
            var address = "0x" + data.substr(data.length - 40);

            sendStatus(session.getID(), "Contract opgeslagen");
            sendContractAddress(session.getID(), address);

            console.log("New contract: " + address);
        });
    }


};

