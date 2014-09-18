var fs = require('fs');
var repeat = require('repeat');
var promise = require('promise');
var config = require('./config.json');
var canvas = require('./services/canvas');
var repo = require('./services/repo');

var getJulian = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    return Math.ceil((date - onejan) / 86400000);
};

var getRequiredCommits = function(){
    return canvas.getCanvas(config.input).then(function(data) {
        var julian =  getJulian(new Date());

        if(data.length > julian)
            return data[julian];
        else
            return 0;
    });
};

var appendFile = function() {
    fs.appendFile(config.file, new Date(), [], function (error) {
        if(error) throw error;
    });
};

var updateCanvas = function() {
    try
    {
        console.log('Updating canvas at ' + new Date());
        getRequiredCommits()
            .then(function(requiredCommits){
                for(var i = 0; i < requiredCommits; i++) {
                    appendFile().then(repo.addCommit(config.repo_url, "Updated " + config.file));
                }
        })
            .then(repo.pushCommits(config.repo_url));
    }
    catch(error){
        console.log("Error: " + error);
    }
};

//running method
//repeat(updateCanvas).every(24, 'h').start.now()

//test methods
//var data = canvas.getCanvas(config.input); //still need to get the ghostscript font issue sorted
appendFile(); repo.addCommit(config.repo_url, "Updated " + config.file);