var gift = require('gift');
var repeat = require('repeat');
var fs = require('fs');
var config = require('./config.json');

var requiresUpdate = function(){
    //converts input to 7x50 grid, gets commit schedule, if on scheduled day returns true
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
