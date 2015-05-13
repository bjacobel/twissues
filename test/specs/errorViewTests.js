define(function(require) {
    var errorView = require('../../app/scripts/views/errorView');
    var chai = require("chai")

    describe('The Backbone view for an error page', function(){
        it('doesn\'t need any data to be rendered', function(){
            view = new errorView();
            view.render();
        });
    });
});