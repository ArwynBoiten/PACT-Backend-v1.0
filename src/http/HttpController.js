/****************************
 **  HTTP CLIENT COMPONENT  **
 ****************************/

module.exports.http_listen = function(_http, CONFIG) {


    _http.listen(CONFIG.APP.PORT, function () {
        console.log('listening on *:' + CONFIG.APP.PORT);
    });
};

module.exports.app_listen = function(_app, CONFIG, path) {

    _app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,  CONFIG.APP.PUBLIC));
    });

    _app.get('/dist/socketClient.js', function (req, res) {
        res.sendFile(path.join(__dirname,  CONFIG.APP.PUBLIC + 'dist/socketClient.js'));
    });
}
