/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/issuesView.js
 * Description: Backbone Views & rendering logic
 */

define(['scripts/models', 'text!templates/issues.html'], function(models, issuesTemplate){
    var issuesView = Backbone.View.extend({
        template: _.template(issuesTemplate),

        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },

        render: function() {
            var self = this;
            var data = {
                issues: []
            };

            this.collection.fetch(this.options.owner, this.options.repo, {
                success: function(resp){
                    data.issues = resp.models;
                    self.$el.html(self.template(data));
                }
            });

            this.$el.html("loading...");
            return this;
        }
    });

    return issuesView;
});