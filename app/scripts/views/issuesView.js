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
                repo: this.options.repo,
                page: this.options.page
            };

            this.collection.fetch(data.owner, data.repo, this.options.page, {
                success: function(resp){
                    data.issues = resp.models.map(function(obj){return obj.attributes;});
                    data.maxPage = 30; // @TODO: Figure out how to set this dynamically
                    self.$el.html(self.template(data));
                }
            });

            return this;
        }
    });

    return issuesView;
});

var paginate = function(increment){
    if (window.location.hash.match(/\?page=(\d)/)){
        var currentPage = parseInt(window.location.hash.match(/\?page=(\d)/)[1], 10);
        window.location = window.location.origin + window.location.hash.replace(
            currentPage, currentPage + increment
        )
    } else {
        window.location = window.location + "?page=" + increment
    }
}

var pageNext = function(){paginate(1);}

var pagePrev = function(){paginate(-1);};