define(function(require) {
    var models = require('../../app/scripts/views/issueView');
    var chai = require("chai")

    describe('The Backbone view for an issue', function(){
        it('should be able to fetch() from the GitHub API', function(){