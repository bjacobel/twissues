define(function(require) {
    var models = require('../../app/scripts/models');
    var chai = require("chai")

    describe('The Backbone model for a comment', function(){
        it('should be able to fetch() from the GitHub API', function(){
            GitHub.Issues.fetch("rails", "rails", 1, {
                success: function(resp){
                    chai.assert.isObject(resp)
                    chai.assert.isArray(resp.models)
                    chai.assert(resp.models[0], "attributes")
                },
                error: function(){
                    chai.assert.fail("Fetch returned an error", "Fetch returned successfully");
                }
            });
        })
    })
});