var gm = require('gm');
var png = require('png-js');

var getCanvas = function(input){
    if(input == null || input.length > 7)
        throw new Error('GetCanvas requires a string that is 7 characters or fewer.');

    gm('./services/canvas.png')
        .drawText(0, 0, input)
        .resize(50, 7).colorspace('GRAY')
        .write('./services/temp/canvas.png', function (error) {
            if (!error)
                png.decode('./temp/canvas.png', function(pixels) {
                    var canvas = [];
                    //convert pixel color to 1-4 scale.
                    // pixels is a 1d array (in rgba order) of decoded pixel data.
                });
        });
};

module.exports.getCanvas = getCanvas;