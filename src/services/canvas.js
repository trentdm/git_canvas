var gm = require('gm');
var png = require('png-js');

var getCanvas = function(input){
    if(input != null && input.length > 7)
        throw new Error('Input must be 7 characters or fewer.');

    gm('img.png').drawText(0, 0, input);
    gm('img.png').resize(50, 7).colorspace('GRAY');

    png.decode('img.png', function(pixels) {
        var canvas = [];
        //convert pixel color to 1-4 scale.
        // pixels is a 1d array (in rgba order) of decoded pixel data.
    });
};

module.exports.getCanvas = getCanvas;