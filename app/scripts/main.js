/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: main.js
 * Description: General application setup, routing and utility functions.
 */

require.config({
    paths:{
        "jquery": "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
        "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "backbone": "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min"
    }
});

require([
        "jquery",
        "underscore",
        "backbone",
        "views/viewUtils",
        "views/issueView",
        "views/issuesView",
        "views/homeView",
        "views/errorView",
    ], function($, _, Backbone, viewUtils, issueView, issuesView, homeView, errorView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "*owner/*repo/*issueId": "issueController",
            "*owner/*repo": "issuesController",
            "": "baseController",
            "*actions": "errorController"
        }
    });

    var appRouter = new AppRouter();

    // Thin controllers - AFAICT Backbone is more of an MTV than a MVC

    appRouter.on("route:issueController", function(owner, repo, issueId){
        if (issueId === null){
            // triggered if the user adds a trailing slash (they should not)
            appRouter.navigate("#/"+owner+"/"+repo, true);
        } else {
            $("#content").html(new issueView({
                model: GitHub.Issue,
                comments: GitHub.Comments,
                owner: owner,
                repo: repo,
                issueId: issueId
            }).render().el);
        }

    });

    appRouter.on("route:issuesController", function(owner, repo, args){
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

    appRouter.on("route:baseController", function(){
        $("#content").html(new homeView().render().el);
    });

    appRouter.on("route:errorController", function(){
        $("#content").html(new errorView().render().el);
    });

    // pushState is difficult when you're not running a real server (plan is to
    // host this on S3) so we'll just use /#/ urls
    Backbone.history.start();
});