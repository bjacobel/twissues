/**
 * Application: twissues
 * Author: Brian Jacobel
 * Email: brian@bjacobel.com
 * Date: 5/10/2104
 * File: views/viewUtils.js
 * Description: Helpers for Underscore templates
 */

require.config({
    paths:{
        "emoji": "../../bower_components/js-emoji/emoji",
        "marked": "../../bower_components/marked/lib/marked"
    }
});


// String truncation to a clean word boundary in approximately `n` chars
// Borrowed in part from http://stackoverflow.com/a/1199420/2178152
String.prototype.trunc =
    function(n){
        var tooLong = this.length > n,
            s_ = tooLong ? this.substr(0, n).substr(0, this.lastIndexOf(" ")) : this;

        return tooLong ? s_ + "&hellip;" : s_;
    };


/* Translate @mentions into links to that user's GitHub profile
 * @params {string} text The text to be transformed
 */
var linkify_users = function(text){
    return text.replace(/@(\w+)/g, "<a href='https://github.com/$1'>@$1</a>");
};



/* Parse text into as close as we can get it to GitHub-flavored-markdown
 * Includes emoji support, because what is GitHub without the :shipit: squirrel?
 * @params {string} text The text to be transformed
 *
 * js-hint HATES this function but I think it looks fine.
 */
 /* jshint ignore:start */
define(["emoji", "marked"], function(emoji, marked){
    return gfm = function(text){
        emoji.img_path = "https://raw.githubusercontent.com/github/gemoji/master/images/emoji/unicode/";

        var gfmified = marked(      // Convert to markdown
            emoji.replace_colons(   // Display emoji
                linkify_users(
                    text
                )
            )
        );

        return gfmified;
    };
});
/* jshint ignore:end */