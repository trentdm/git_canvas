var gift = require('gift');

var addCommit = function() {
    var repo = gift(config.repo_url);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.commit("Updated " + config.file, [], function(error) {
        if(error) throw error;
    });

    console.log(repo);
}

var pushCommits = function() {
    var repo = gift(config.repo_url);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.push("Updated " + config.file, [], function(error) {
        if(error) throw error;
    });

    console.log(repo);
}

module.exports.addCommit = addCommit;
module.exports.pushCommits = pushCommits;