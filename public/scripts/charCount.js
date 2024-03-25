$(document).ready(function() {
    $(".new-tweet textarea").on("input", function() {
        var tweetLength = $(this).val().length;
        // counts the number of characters in the textarea and updates the counter
        var remainingChars = 140 - tweetLength;
        $(".counter").text(tweetLength + "/140");
    });  
});

  