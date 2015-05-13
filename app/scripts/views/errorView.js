/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/9/2104
 * File: views/errorView.js
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
        "text!../../templates/error.html"
    ], function($, _, Backbone, errorTemplate){
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
