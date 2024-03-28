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

        if (remainingChars < 1) {
            $(".counter").addClass("over-limit").text("Woah there! Calm down, you're over the limit!");
        } else {
            $(".counter").removeClass("over-limit");
        }
    }); 
    
    // animated error message when trying to submit an empty tweet
    $(".new-tweet form").on("submit", function(event) {
        event.preventDefault();

        var tweetText = $(this).find("textarea").val().trim();

        if (tweetText < 1) {
           $(".counter").addClass("empty-error").text("You cannot submit an empty tweet!");

           setTimeout(function() {
               $(".counter").removeClass("empty-error").text("");
           }, 1000);
         } else {
            $(".counter").removeClass("empty-error").text("");
        }
        });
    });


  