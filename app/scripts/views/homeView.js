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
        "text": "../../bower_components/text/text",
        "jquery": "../bower_components/jquery/dist/jquery",
        "underscore": "../bower_components/underscore/underscore",
        "backbone": "../bower_components/backbone/backbone"
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

    return homeView;
});

define(["../../bower_components/jquery/dist/jquery"], function($){
// Route form input to the correct application pag
    var goToRepo = function(){
        window.location = "/#/" + $("#owner").val() + "/" + $("#repo").val();
    };

    $(document).keypress(function(e) {
        if(e.which == 13) {
            goToRepo();
        }
    });
});