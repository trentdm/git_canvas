var fs = require('fs');
var repeat = require('repeat');
var config = require('./config.json');
var canvas = require('./services/canvas');
var repo = require('./services/repo');

var getLetterArray = function(letter) {
    switch(letter) {
        case ' ':
            return [
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'a':
            return [
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,4,4,4,4,0,0,
                4,1,0,0,4,0,0,
                4,1,0,0,4,0,0,
                0,4,4,4,4,4,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'b':
            return [
                4,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                4,4,4,3,0,0,0,
                4,0,1,0,4,0,0,
                4,0,0,1,4,0,0,
                4,4,4,3,0,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'c':
            return [
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,3,4,4,0,0,0,
                4,1,0,1,2,0,0,
                4,0,0,0,0,0,0,
                0,3,4,4,3,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'd':
            return [
                0,0,0,0,4,0,0,
                0,0,0,0,4,0,0,
                0,3,4,4,4,0,0,
                4,0,0,0,4,0,0,
                4,0,0,0,4,0,0,
                0,3,4,4,4,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'e':
            return [
                0,0,0,0,0,0,0,
                0,3,4,4,0,0,0,
                4,0,0,0,4,0,0,
                4,4,4,4,3,0,0,
                4,0,0,0,0,0,0,
                0,3,4,4,3,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'f':
            return [
                0,0,4,0,0,0,0,
                0,4,0,3,0,0,0,
                0,4,0,0,0,0,0,
                4,4,4,3,0,0,0,
                0,4,0,0,0,0,0,
                0,4,0,0,0,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'g':
            return [
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,4,4,4,1,0,0,
                3,0,0,4,0,0,0,
                1,4,4,4,0,0,0,
                0,0,0,4,0,0,0,
                0,4,4,0,0,0,0
            ];
            break;
        case 'h':
            return [
                4,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                4,2,4,3,1,0,0,
                4,1,0,0,4,0,0,
                4,0,0,0,4,0,0,
                4,0,0,0,4,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'i':
            return [
                0,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                4,0,0,0,0,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        case 'j':
            return [
                0,0,0,0,0,0,0,
                0,0,4,0,0,0,0,
                0,0,0,0,0,0,0,
                0,3,4,0,0,0,0,
                0,0,4,0,0,0,0,
                0,0,3,0,0,0,0,
                3,4,1,0,0,0,0
            ];
            break;
        default:
            throw new Error('Unsupported character, ' + letter);
    }
};


var getJulian = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    return Math.ceil((date - onejan) / 86400000);
}

var getRequiredCommits = function(){
    var canvas = canvas.getCanvas(config.input);
    var julian =  getJulian(new Date());

    if(canvas.length > julian)
        return canvas[julian];
    else
        return 0;
}

var appendFile = function() {
    fs.appendFile(config.file, new Date(), [], function (error) {
        if(error) throw error;
    });
}

var updateCanvas = function() {
    console.log('updating canvas at ' + new Date())
    try
    {
        var requiredCommits = getRequiredCommits();
        for(var i = 0; i < requiredCommits; i++) {
            appendFile();
            repo.addCommit();
        }
        repo.pushCommits();
    }
    catch(error){
        console.log("Error: " + error)
    }
}

repeat(updateCanvas).every(24, 'h').start.now()
