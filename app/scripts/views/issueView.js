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

            this.model.fetch(data.owner, data.repo, this.options.issueId, {
                success: function(resp){
                    data.issue = resp.attributes;
                    self.$el.html(self.template(data));
                }
            });

            this.options.comments.fetch(data.owner, data.repo, this.options.issueId, {
                success: function(resp){
                    data.comments = resp.models.map(function(obj){return obj.attributes;});
                    console.table(data.comments);
                    self.$el.html(self.template(data));
                }
            });

            return this;
        }
    });

    return issueView;
});
