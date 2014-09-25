var gift = require('gift');

var addCommit = function(repoUrl, message) {
    var repo = gift(repoUrl);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.commit(message, [{all: true}], function(error) {
        if(error)
            throw error;

        console.log('Add succeeded for: ' + repo);
    });
}

var pushCommits = function(repoUrl) {
    var repo = gift(repoUrl);
    if(repo == undefined)
        throw new Error("Failed to get repo.");

    repo.push("Updated " + config.file, [], function(error) {
        if(error)
            throw error;

        console.log('Commit pushed at ' + new Date())
    });

    console.log(repo);
}

module.exports.addCommit = addCommit;
module.exports.pushCommits = pushCommits;