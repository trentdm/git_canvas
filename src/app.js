var gift = require('gift');
var repeat = require('repeat');
var fs = require('fs');
var config = require('./config.json');

var getLetterArray = function(letter) {
    switch(letter) {
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
                4,4,3,1,0,0,0,
                4,0,1,4,0,0,0,
                4,0,1,3,0,0,0,
                4,4,4,1,0,0,0,
                0,0,0,0,0,0,0
            ];
            break;
        default:
            throw new Error('Unsupported character, ' + letter);
    }
};

var getCanvas = function(){
    if(config.input != null && config.input.length > 7)
        throw new Error('Input must be 7 characters or fewer.');

    var canvas = [];

    config.input.forEach(function(letter){
      var letterCanvas = getLetterArray(letter);
      canvas.concat(letterCanvas);
    })
};

var requiresUpdate = function(){
    //converts input to 7x49 grid, gets commit schedule, checks existing commits for the day,
    //adds commit(s) if there are remaining commits for the day
    return true;
}

var addToBucket = function() {
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
        if(requiresUpdate()) {
            addToBucket();
            commitChange();
        }
    }
    catch(error){
        console.log("Error: " + error)
    }
}

repeat(updateCanvas).every(24, 'h').start.now()
