/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/homeView.js
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

// A very basic view - nothing dynamic, just template rendering
define([
        "jquery",
        "underscore",
        "backbone",
        "text!../../templates/home.html"
    ], function($, _, Backbone, homeTemplate){
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

    // Route form input to the correct application pag
    var goToRepo = function(){
        window.location = "/#/" + $("#owner").val() + "/" + $("#repo").val();
    };

    $(document).keypress(function(e) {
        if(e.which === 13) {
            goToRepo();
        }
    });

    return homeView;
});