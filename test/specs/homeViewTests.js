define(function(require) {
    var homeView = require('../../app/scripts/views/homeView');
    var chai = require("chai")

    describe('The Backbone view for the home page', function(){
        it('doesn\'t need any data to be rendered', function(){
            view = new homeView();
            view.render();
        });
    });
});