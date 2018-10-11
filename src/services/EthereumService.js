const Web3 = require('web3');
const CONF = require("./../config/config");
const web3 = new Web3(new Web3.providers.HttpProvider(CONF.INFURA.API_ENDPOINT));

/** ETHEREUM SERVICE INTERFACE **/
/** Make connection to the Ethereum network **/
function EthereumService(){};

/** Set default Ethereum account based on private Key **/
/** @Input Private key of ethereum wallet **/
EthereumService.prototype.setDefaultAccount = function(_privateKey){
    var account = web3.eth.accounts.privateKeyToAccount(_privateKey).address;
    web3.eth.defaultAccount = account;
    return this;
};

/** Get default Ethereum account **/
EthereumService.prototype.getDefaultAccount = function () {
    return web3.eth.defaultAccount;
};

/** Get smart-contract instance from ABI **/
/** @Input ABI **/
/** @Return Smart-contract interface **/
EthereumService.prototype.getContract = function (_ABI, _SC_ADDRESS) {
    return new web3.eth.Contract(_ABI, _SC_ADDRESS);
};

/** Request balance of an Ethereum account **/
/** @Return Promise **/
EthereumService.prototype.getBalance = function(walletAddress){
    return web3.eth.getBalance(walletAddress);
};

EthereumService.prototype.getTXOptions = function () {
    return {
        from: this.getDefaultAccount(),
        gas: CONF.ETHEREUM.TRANSACTION.GAS
    };
};


module.exports = EthereumService;