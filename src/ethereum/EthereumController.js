/****************************
 **  ETHEREUM API SECTION  **
 ****************************/

module.exports.listen = function(app, PACTFactoryService, ContractService) {

    /** Get "Contract" data from Ethereum network
     * @Param: Address - Address of "contract"
     * @Param: PrivateKey - Private key of member
     */
    app.post('/eth/contract', function (req, res) {
        ContractService.getData(req.body.address, req.body.privateKey).then(function (result) {
            res.send(result);
        });
    });


    app.post('/eth/factory', function (req, res) {
        PACTFactoryService.getData();
    });
}