/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/issueView.js
 * Description: Backbone Views & rendering logic
 */

define(["scripts/models", "text!templates/issue.html"], function(models, issueTemplate){
    var issueView = Backbone.View.extend({
        template: _.template(issueTemplate),

        initialize: function(options) {
            this.options = options;
            _.bindAll(this, "render");
        },

        render: function() {
            this.$el.html("loading...");

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
                    console.table(data.comments);

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
