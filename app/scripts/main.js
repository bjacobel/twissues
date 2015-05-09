/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: main.js
 * Description: General application setup, routing and utility functions.
 */

var serverURL = "http://localhost:9000/"
var baseFolder =  window.location.pathname.replace('/','').split('/')[0];

requirejs(['scripts/models'], function(authentication, models){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "repo/*owner/*repo/issues": "showIssues",
            "repo/*owner/*repo/issues/*issueId": "showIssue",
            "repo/*owner/*repo/comments": "showComments",
            "*actions": "defaultRoute"
        }
    });

    var app_router = new AppRouter;

    app_router.on('route:defaultRoute', function(actions) {
        console.log("Default route! "+actions);
    });

    Backbone.history.start({pushState: true});
});

