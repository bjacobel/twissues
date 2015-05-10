/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: main.js
 * Description: General application setup, routing and utility functions.
 */

var serverURL = "http://localhost:9000/"

require.config({
    paths: {
        "text": "../bower_components/text/text"
    }
});

require(['scripts/views/issueView', 'scripts/views/issuesView'], function(issueView, issuesView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "repo/*owner/*repo/issues/*issueId": "issueController",
            "repo/*owner/*repo/issues": "issuesController",
            "*actions": "reposController"
        }
    });

    var app_router = new AppRouter;

    // Thin controllers - AFAICT Backbone is more of an MTV than a MVC
    app_router.on("route:issueController", function(owner, repo, issueId){
        $("#content").html(new issueView({
            model: GitHub.Issue,
            owner: owner,
            repo: repo,
            issueId: issueId
        }).render().el);
    });

    app_router.on("route:issuesController", function(owner, repo){
        $("#content").html(new issuesView({
            collection: GitHub.Issues,
            owner: owner,
            repo: repo
        }).render().el);
    });

    // PushState is difficult when you're not running a real server (plan is to
    // host this on S3) so we'll just use /#/ urls
    Backbone.history.start();
});

