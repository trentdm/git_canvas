var fs = require('fs');
var repeat = require('repeat');
var config = require('./config.json');
var canvas = require('./services/canvas');
var repo = require('./services/repo');

var getJulian = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    return Math.ceil((date - onejan) / 86400000);
}

var getRequiredCommits = function(){
    var data = canvas.getCanvas(config.input);
    var julian =  getJulian(new Date());

    if(data.length > julian)
        return data[julian];
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
