define(function(require) {
    var models = require('../../app/scripts/models');
    var chai = require("chai")

    describe('The Backbone collection for issues', function(){
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
        });

        it('can paginate', function(){
            var page1 = []

            GitHub.Issues.fetch("rails", "rails", 1, {
                success: function(resp){
                    page1 = resp.models
                    chai.assert.equal(len(page1), 25)
                },
                error: function(){
                    chai.assert.fail("Fetch returned an error", "Fetch returned successfully");
                }
            });

            GitHub.Issues.fetch("rails", "rails", 2, {
                success: function(resp){
                    for(var i = 0; i < len(resp.models); i++){
                        for(var j = 0; l < len(page1); j++){
                            // assert no objects on page 1 are on page 2
                            chai.assert.notEqual(page1[j], resp.models[i]);

                            // assert the IDs of objects on page 1 are all higher than the ones on page 2
                            chai.assert.greater(resp.models[i].attributes.id, page1[j].attributes.id);
                        }
                    }
                },
                error: function(){
                    chai.assert.fail("Fetch returned an error", "Fetch returned successfully");
                }
            });
        })
    })
});