/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/issueView.js
 * Description: Backbone Views & rendering logic
 */

require.config({
    paths: {
        "text": "http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        "jquery": "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
        "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min"
    }
});

define([
        "jquery",
        "underscore",
        "backbone",
        "models",
        "text!../../templates/issue.html",
        "text!../../templates/loading.html"
    ], function($, _, Backbone, models, issueTemplate, loadingSpinner){

    var issueView = Backbone.View.extend({
        template: _.template(issueTemplate),

        initialize: function(options) {
            this.options = options;
            _.bindAll(this, "render");
        },

        render: function() {
            this.$el.html(loadingSpinner);

            var self = this;
            var data = {
                issue: {},
                comments: [],
                owner: this.options.owner,
                repo: this.options.repo
            };

            // Fetch the issue model specified by this issueID
            this.model.fetch(data.owner, data.repo, this.options.issueId, {
                success: function(resp){
                    data.issue = resp.attributes;

                    // Re-render the page when we have new data to pass in
                    self.$el.html(self.template(data));
                },
                error: function(){
                    // @TODO: Better error messaging
                    window.location = "/#/error";
                }
            });

            // Fetch the comments as well - these come from a separate endpoint
            this.options.comments.fetch(data.owner, data.repo, this.options.issueId, {
                success: function(resp){
                    data.comments = resp.models.map(function(obj){return obj.attributes;});

                    // Re-render the page when we have new data to pass in
                    self.$el.html(self.template(data));
                },
                error: function(){
                    // @TODO: Better error messaging
                    window.location = "/#/error";
                }
            });

            return this;
        }
    });

    return issueView;
});
