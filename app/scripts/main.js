window.GitHub = {};

GitHub.Issue = Backbone.Model.extend({
    url: function() {
        return this.get('url') || ("https://api.github.com/repos/" + (this.get('path')) + "/issues/" + (this.get('id')));
    }
}, {
    fetch: function(owner, repoName, id, options) {
        var issue = new GitHub.Issue({
            path: "" + owner + "/" + repoName,
            id: id
        });
        issue.fetch(options);
        return issue;
    }
});

GitHub.Issues = Backbone.Collection.extend({
    url: function() {
        return this.toJSON()[0].url || ("https://api.github.com/repos/" + this.toJSON()[0].path + "/issues");
    },
    model: GitHub.Issue
}, {
    fetch: function(owner, repoName, options) {
        var issues = new GitHub.Issues({
            path: "" + owner + "/" + repoName
        });
        issues.fetch(options);
        return issues;
    }
});

GitHub.Issues.fetch("rails", "rails", {success: function(repo) {
  console.log(repo.toJSON());
}});