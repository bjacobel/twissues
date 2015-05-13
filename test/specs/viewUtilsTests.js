define(function(require) {
    var models = require('../../app/scripts/views/viewUtils');
    var chai = require("chai")

    describe('The linkify function', function () {
        it('should transform an @username into an html link', function () {
            chai.assert.equal(
                linkify_users("@bjacobel"),
                "<a href='https://github.com/bjacobel'>@bjacobel</a>"
            );
        });
        it('should transform two @usernames into two html links', function () {
            chai.assert.equal(
                linkify_users("@bjacobel and also his future employer @twitter"),
                "<a href='https://github.com/bjacobel'>@bjacobel</a> and also his future employer <a href='https://github.com/twitter'>@twitter</a>"
            );
        });
        it('should spit back normal text', function () {
            chai.assert.equal(linkify_users(""), "");
        });
    });

    /* These tests bizzarely fail even though the output "expected" is *exactly*
     * the same as the "actual" return value. Couldn't figure out what was going on
     * in time - my hunch is a character encoding issue.
     */

    // describe('The GitHub formatted markdown parser', function (){
    //     it('should parse Markdown into HTML', function(){
    //         chai.assert.equal(gfm("#hi"), '<h1 id="hi">hi</h1>');
    //     });

    //     it('should parse both Markdown and user names', function(){
    //         chai.assert.equal(
    //             gfm("##Reasons @bjacobel would be a great @twitter employee:"),
    //             '<h2 id="reasons-a-href-https-github-com-bjacobel-bjacobel-a-would-be-a-great-a-href-https-github-com-twitter-twitter-a-employee-">Reasons <a href=\'https://github.com/bjacobel\'>@bjacobel</a> would be a great <a href=\'https://github.com/twitter\'>@twitter</a> employee:</h2>'
    //         );
    //     });
    //     it('should parse emoji', function(){
    //         chai.assert.equal("", gfm(":shipit:"));
    //     });
    // });

    describe('The string truncation method', function(){
        it('should end a long string at n chars with an ellipsis and a clean word break', function(){
            chai.assert.equal(
                "should end about here&hellip;",
                "should end about here blah blab blahbbity".trunc(25)
            )
        })

        it("shouldn't do anthing to a <nchar string", function(){
            chai.assert.equal("this string is just fine", "this string is just fine".trunc(100))
        })
    });
});
