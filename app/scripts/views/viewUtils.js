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
        "emoji": "http://cdn.jsdelivr.net/js-emoji/0.1.0/emoji.min",
        "marked": "http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min"
    }
});


// String truncation to a clean word boundary in approximately `n` chars
// Borrowed in part from http://stackoverflow.com/a/1199420/2178152
String.prototype.trunc =
    function(n){
        var tooLong = this.length > n,
            s_ = tooLong ? this.substr(0, n) : this;

        return tooLong ? s_.substr(0, s_.lastIndexOf(" ")) + "&hellip;" : s_;
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

        return marked(      // Convert to markdown
            emoji.replace_colons(   // Display emoji
                linkify_users(
                    text
                )
            )
        );
    };
});
/* jshint ignore:end */