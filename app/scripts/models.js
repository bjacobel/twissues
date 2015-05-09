window.GitHub = {};

GitHub.token = null;

var baseURL = "https://api.github.com/repos/";

GitHub.authenticate = function(username, password, options) {
    var postData = {};
    if (options.scope != null) postData.scope = options.scope;
    return $.ajax({
        url: "https://api.github.com/authorizations",
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(postData),
        headers: {
            'Authorization': "Basic " + (btoa("" + username + ":" + password))
        },
        success: function(d, s, x) {
            GitHub.token = d.token;
            if (options.success != null) return options.success(d, s, x);
        },
        error: options.error
    });
};

// Override Backbone's default .sync with Github's custom accept mimetype
// also set an authorization token, if we've obtained it already
// Rate limiting will kick in *very* quickly if you do not authenticate
GitHub.sync = function(method, model, options) {
    var extendedOptions = _.extend({
        beforeSend: function(xhr) {
            // Custom mimetype
            xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');

            // Authorize using OAuth2 in header
            if (GitHub.token) {
                return xhr.setRequestHeader('Authorization', "token " + GitHub.token);
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