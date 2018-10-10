var lib = require('./config/loader');
var SessionController = require("./services/SessionService");
var ContractService = require("./services/ContractService");

var CONFIG = lib.config;
var sessionCtrl = new SessionController();
var contractService = new ContractService();

/*******************************
 **  SOCKET SERVER FUNCTIONS  **
 *******************************/

lib.io.on('connect', function(socket){

    /* Create new contract session */
    socket.on('createSession', function(data) {
        if(!sessionCtrl.getSessionById(data.id)){
            var session = sessionCtrl.createSession(data.id, data.ct);
            session.addMember(data.member);

            // Create socket room with contract ID//
            socket.join(session.getID());
            sendSession(data.id, session);
        } else{
            sendErrorMessage(socket, data.id, "already exist.");
        }
    });

    /* Join exisiting contract session */
    socket.on('joinSession', function(data) {
        /* Check if session exists. */
        if(sessionCtrl.getSessionById(data.id)){
            var session = sessionCtrl.getSessionById(data.id);

            /* Check if name isn't already used. */
            if(!session.getMembersByName(data.member.name)) {
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

    /* Generate contract for contract session */
    socket.on('generateContent', function(data) {
        lib.REConnector.makePostCall("rules", {age: data.age}, function(response){
            sendErrorMessage(socket, data.contract, "{'age': " + response.data.age + ", 'result':" + response.data.result + ", 'matchPath':" + response.data.matchPath + "}");
        });
    });
});

/* Socket send functions */
function sendErrorMessage(socket, contract, message){
    socket.emit('errorMessage', "[ERROR] - [" + contract + "] " + message);
}

function sendSession(roomName, session){
    lib.io.to(roomName).emit('session', session);
}



/****************************
 **  HTTP CLIENT COMPONENT  **
 ****************************/

lib.http.listen(CONFIG.APP.PORT, function(){
    console.log('listening on *:' + CONFIG.APP.PORT);
});

lib.app.get('/', function(req, res){
    res.sendFile(lib.path.join(__dirname, CONFIG.APP.PUBLIC));
});

lib.app.get('/dist/socketClient.js', function(req, res){
    res.sendFile(lib.path.join(__dirname, CONFIG.APP.PUBLIC + 'dist/socketClient.js'));
});


/************************
 **  ETHEREUM SECTION  **
 ************************/


/** Get "Contract" data from Ethereum network
 * @Param: Address - Address of "contract"
 * @Param: PrivateKey - Private key of member
 */
lib.app.post('/eth/', function(req, res){
    contractService.getData(req.body.address, req.body.privateKey).then(function(result){
        res.send(result);
    });
});



