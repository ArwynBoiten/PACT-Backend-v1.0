/** Import presets **/
var CarRent = require("./presets/CarRent");
var Test = require("./presets/Test");
var presets = {
    Autoverhuur: CarRent,
    Test: Test
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