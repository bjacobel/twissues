define(function(require) {
    var issueView = require('../../app/scripts/views/issueView');
    var chai = require("chai");

    describe('The Backbone view for an issue', function(){
        it('can be initialized with no data', function(){
            view = new issueView();
        });

        it('initialized successfully when sent an options dict', function(){
            view = new issueView({
                model: GitHub.Issue,
                comments: GitHub.Comments,
                owner: "rails",
                repo: "rails",
                issueId: 2000
            });
        });

        it('can be sent an options dictionary and rendered into a template', function(){
            view = new issueView({
                model: GitHub.Issue,
                comments: GitHub.Comments,
                owner: "rails",
                repo: "rails",
                issueId: 2000
            });

            view.render();
        });
    });
});