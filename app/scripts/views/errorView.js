/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/errorView.js
 * Description: Backbone Views & rendering logic
 */

// A very basic view - nothing dynamic, just template rendering
define(["scripts/models", "text!templates/error.html"], function(models, errorTemplate){
    var errorView = Backbone.View.extend({
        template: _.template(errorTemplate),

        initialize: function(options) {
            _.bindAll(this, "render");
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return errorView;
});
