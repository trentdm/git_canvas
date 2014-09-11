var gm = require('gm');
var png = require('png-js');

var getCanvas = function(input){
    if(input == null || input.length > 7)
        throw new Error('GetCanvas requires a string that is 7 characters or fewer.');

    gm('./services/canvas.png')
        .font("Helvetica.ttf", 12)
        .drawText(0, 0, input)
        .resize(50, 7).colorspace('GRAY')
        .write('/../temp/canvas.png', function (error) {
            if (!error)
                png.decode('/../temp/canvas.png', function(pixels) {
                    // pixels is a 1d array (in rgba order) of decoded pixel data.
                    //once have data generating, determine threshold points for converting grayscale shade to 0-4 scale.
                    var canvas = [];

                    for(var i = 0; i < pixels.length; i++){
                        var scale = pixels[i] / 16; //completely arbitrary value, need to look at real data first
                        canvas.push(scale);
                    }

                    return canvas;
                });
        });
};

module.exports.getCanvas = getCanvas;