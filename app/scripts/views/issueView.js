/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/issueView.js
 * Description: Backbone Views & rendering logic
 */

define(['scripts/models', 'text!templates/issue.html'], function(models, issueTemplate){
    var issueView = Backbone.View.extend({
        template: _.template(issueTemplate),

        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },

        render: function() {
            var self = this;
            var data = {
                issue: {}
            };

            this.model.fetch(this.options.owner, this.options.repo, this.options.issueId, {
                success: function(resp){
                    data.issue = resp.attributes;
                    self.$el.html(self.template(data));
                }
            });

            this.$el.html(this.template(data));
            return this;
        }
    });

    return issueView;
});
