$(document).ready(function() {
    $(".new-tweet textarea").on("input", function() {
        var tweetLength = $(this).val().length;
        // caps the number of characters in the textarea to 140
        if (tweetLength > 140) {
            $(this).val($(this).val().substring(0, 140));
            tweetLength = 140;
        }
        var remainingChars = 140 - tweetLength;
        $(".counter").text(tweetLength + "/140");
    });  
});

  