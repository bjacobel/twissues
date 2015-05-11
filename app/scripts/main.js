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

require(['scripts/views/viewUtils', 'scripts/views/issueView', 'scripts/views/issuesView'], function(viewUtils, issueView, issuesView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "*owner/*repo/*issueId": "issueController",
            "*owner/*repo": "issuesController",
            "*actions": "reposController"
        }
    });

    var app_router = new AppRouter;

    // Thin controllers - AFAICT Backbone is more of an MTV than a MVC

    app_router.on("route:issueController", function(owner, repo, issueId){
        if (issueId === null){
            // triggered if the user adds a trailing slash (they should not)
            app_router.navigate("#/"+owner+"/"+repo, true);
        } else {
            $("#content").html(new issueView({
                model: GitHub.Issue,
                owner: owner,
                repo: repo,
                issueId: issueId
            }).render().el);
        }

    });

    app_router.on("route:issuesController", function(owner, repo, args){
        var data = {
            collection: GitHub.Issues,
            owner: owner,
            repo: repo,
        };

        // Parse the querystring to obtain pagination
        if (args && args.match("page=(.)")){
            data.page = args.match("page=(.)")[1];
        }

        $("#content").html(new issuesView(data).render().el);
    });

    // pushState is difficult when you're not running a real server (plan is to
    // host this on S3) so we'll just use /#/ urls
    Backbone.history.start();
});

