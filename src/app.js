var gift = require('gift');
var repeat = require('repeat');
var fs = require('fs');
var config = require('./config.json');

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
        default:
            throw new Error('Unsupported character, ' + letter);
    }
};

var getCanvas = function(input){
    if(input != null && input.length > 7)
        throw new Error('Input must be 7 characters or fewer.');

    var canvas = [];

    config.input.forEach(function(letter){
      var letterCanvas = getLetterArray(letter);
      canvas.concat(letterCanvas);
    })
};

var getJulian = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    return Math.ceil((date - onejan) / 86400000);
}

var getRequiredCommits = function(){
    var canvas = getCanvas(config.input);
    var julian =  getJulian(new Date());
    return canvas[julian];
}

var addCommit = function() {
    fs.appendFile('bucket.txt', new Date(), function (error) {
        if(error) throw error;
    });
}

var commitChange = function() {
    var repo = gift(config.repo_url);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.commit("Updated bucket.txt.", [], function(error) {
        if(error) throw error;
    });

    console.log(repo);
}

var updateCanvas = function() {
    console.log('updating canvas at ' + new Date())
    try
    {
        var requiredCommits = getRequiredCommits();
        for(var i = 0; i < requiredCommits; i++) {
            addCommit();
            commitChange();
        }
    }
    catch(error){
        console.log("Error: " + error)
    }
}

repeat(updateCanvas).every(24, 'h').start.now()
