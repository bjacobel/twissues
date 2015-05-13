define(function(require) {
    var issuesView = require('../../app/scripts/views/issuesView');
    var chai = require("chai");

    describe('The Backbone view for an issue list', function(){
        it('can be initialized with no data', function(){
            view = new issuesView();
        });

        it('initialized successfully when sent an options dict', function(){
            view = new issuesView({
                collection: GitHub.Issues,
                owner: "rails",
                repo: "rails"
            });
        });

        it('can be sent an options dictionary and rendered into a template', function(){
            view = new issuesView({
                collection: GitHub.Issues,
                owner: "rails",
                repo: "rails"
            });

            view.render();
        });
    });
});