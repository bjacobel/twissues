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
            xhr.setRequestHeader('Accept', 'application/vnd.github+json');
            if (GitHub.token) {
                return xhr.setRequestHeader('Authorization', "bearer " + GitHub.token);
            }
        }
    }, options);
    return Backbone.sync(method, model, extendedOptions);
};


// Set up custom Models and Collections that use our custom .sync method
GitHub.Model = Backbone.Model.extend({
    sync: GitHub.sync
});

GitHub.Collection = Backbone.Collection.extend({
    sync: GitHub.sync
});

GitHub.Issue = GitHub.Model.extend({
    url: function() {
        return baseURL + this.get('repo') + "/issues/" + this.get('issueId');
    }
}, {
    fetch: function(repo, issueId, options) {
        var issue = new GitHub.Issue({
            repo: repo,
            issueId: issueId
        });
        issue.fetch(options);
        return issue;
    }
});

GitHub.Issues = GitHub.Collection.extend({
    url: function() {
        return baseURL + this.toJSON()[0].repo + "/issues";
    },
    model: GitHub.Issue
}, {
    fetch: function(repo, options) {
        var issues = new GitHub.Issues({
            repo: repo
        });
        issues.fetch(options);
        return issues;
    }
});

GitHub.Comment = GitHub.Model.extend({
    url: function() {
        return baseURL + this.get('repo') + "/issues/" + this.get('issueId') + "/comments/" + this.get('commentId');
    }
}, {
    fetch: function(repo, issueId, commentId, options) {
        var issue = new GitHub.Issue({
            repo: repo,
            issueId: issueId,
            commentId: commentId
        });
        issue.fetch(options);
        return issue;
    }
});

GitHub.Comments = GitHub.Collection.extend({
    url: function() {
        return baseURL + this.toJSON()[0].repo + "/issues/" + this.toJSON()[0].issueId + "/comments";
    },
    model: GitHub.Issue
}, {
    fetch: function(repo, issueId, options) {
        var issues = new GitHub.Issues({
            repo: repo,
            issueId: issueId
        });
        issues.fetch(options);
        return issues;
    }
});

// GitHub.Comment.fetch("rails/rails", 2000, 74706317, {success: function(repo) {
//   console.log(repo.toJSON());
// }});