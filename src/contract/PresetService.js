/** Import presets **/
var CarRent = require("./presets/CarRent");
var presets = {
    Autoverhuur: CarRent.template,
    Klaas: CarRent.template
};

/** Constructor **/
function PresetService(){};

/** Helper functions **/
PresetService.prototype.getPresetList = function(){
    return presets;
};

PresetService.prototype.getPreset = function (presetName) {
    return presets[presetName];
};

module.exports = PresetService;