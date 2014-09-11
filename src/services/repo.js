var gift = require('gift');

var addCommit = function(repoUrl, message) {
    var repo = gift(repoUrl);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.commit(message, [], function(error) {
        if(error)
            throw error;
    });

    console.log(repo);
}

var pushCommits = function(repoUrl) {
    var repo = gift(repoUrl);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.push("Updated " + config.file, [], function(error) {
        if(error) throw error;
    });

    console.log(repo);
}

module.exports.addCommit = addCommit;
module.exports.pushCommits = pushCommits;