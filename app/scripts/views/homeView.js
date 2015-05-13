/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/homeView.js
 * Description: Backbone Views & rendering logic
 */

// A very basic view - nothing dynamic, just template rendering
define(["scripts/models", "text!templates/home.html"], function(models, homeTemplate){
    var homeView = Backbone.View.extend({
        template: _.template(homeTemplate),

        initialize: function(options) {
            _.bindAll(this, "render");
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return homeView;
});

// Route form input to the correct application pag
var goToRepo = function(){
    window.location = "/#/" + $("#owner").val() + "/" + $("#repo").val();
};