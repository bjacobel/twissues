/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: models.js
 * Description: Backbone models & collections to fetch data from the GitHub API.
 */

window.GitHub = {};

/** Hardcoding my Github OAuth token here, which isn't ideal;
 * I gave implementing full OAuth a shot but found it wasn't possible without
 * a) having some server-side component of this application, or
 * b) writing my client ID and secret into this file in cleartext, which is
 *    significantly *less* secure than this is
 */
GitHub.token = "a43361eb824dd5a6bc9a1442d0cc84208458297c";

var baseURL = "https://api.github.com/repos/";

// Override Backbone's default .sync with Github's custom accept mimetype
// also set an authorization token, if we've obtained it already
// Rate limiting will kick in *very* quickly if you do not authenticate
GitHub.sync = function(method, model, options) {
    var extendedOptions = _.extend({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
            if (GitHub.token) {
                return xhr.setRequestHeader('Authorization', "bearer " + GitHub.token);
            }
        }
    }, options);
    return Backbone.sync(method, model, extendedOptions);
};


// Set up custom Models and Collections that use our custom .sync method
// Wrap these sync methods in cachingSync (https://github.com/ggozad/Backbone.cachingSync)
// because this Amtrak's wifi is very bad
GitHub.Model = Backbone.Model.extend({
    sync: GitHub.sync
});

GitHub.Collection = Backbone.Collection.extend({
    sync: GitHub.sync
});

GitHub.Issue = GitHub.Model.extend({
    url: function() {
        return baseURL + this.get('path') + "/issues/" + this.get('issueId');
    }
}, {
    fetch: function(owner, repo, issueId, options) {
        var issue = new GitHub.Issue({
            path: owner + "/" + repo,
            issueId: issueId
        });
        issue.fetch(options);
        return issue;
    }
});

GitHub.Issues = GitHub.Collection.extend({
    url: function() {
        var url = baseURL + this.toJSON()[0].path + "/issues";
        if (this.toJSON()[0].page){
            url += "?page=" + this.toJSON()[0].page
        }
        return url;
    },
    model: GitHub.Issue
}, {
    fetch: function(owner, repo, page, options) {
        var issues = new GitHub.Issues({
            path: owner + "/" + repo,
            page: page ? page : 1
        });
        issues.fetch(options);
        return issues;
    }
});

GitHub.Comment = GitHub.Model.extend({
    url: function() {
        return baseURL + this.get('path') + "/issues/" + this.get('issueId') + "/comments/" + this.get('commentId');
    }
}, {
    fetch: function(owner, repo, issueId, commentId, options) {
        var issue = new GitHub.Comment({
            path: owner + "/" + repo,
            issueId: issueId,
            commentId: commentId
        });
        issue.fetch(options);
        return issue;
    }
});

GitHub.Comments = GitHub.Collection.extend({
    url: function() {
        return baseURL + this.toJSON()[0].path + "/issues/" + this.toJSON()[0].issueId + "/comments";
    },
    model: GitHub.Issue
}, {
    fetch: function(owner, repo, issueId, options) {
        var issues = new GitHub.Comments({
            path: owner + "/" + repo,
            issueId: issueId
        });
        issues.fetch(options);
        return issues;
    }
});