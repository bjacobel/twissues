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
            this.$el.html("loading...");

            var self = this;
            var data = {
                issues: [],
                owner: this.options.owner,
                repo: this.options.repo
            };

            this.collection.fetch(data.owner, data.repo, this.options.page, {
                success: function(resp){
                    data.issues = resp.models;
                    console.log(data.issues);
                    self.$el.html(self.template(data));
                }
            });

            return this;
        }
    });

    return issuesView;
});