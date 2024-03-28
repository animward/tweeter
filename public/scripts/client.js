
// scripts/client.js
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to create a new tweet element

$(function() {
    // Function to create a new tweet element
    const createTweetElement = function(tweet) {
        const $tweet = $(`
                <section class="tweet">
                    <h2 class="littleUsername">
                    ${tweet.user.name}
                    </h2>
                    <h3>Says:</h3>
                    <div class="tweet-content">
                        <p>
                            ${tweet.content.text}
                        </p>
                    </div>
                    <footer>
                        <div class="tweet-footer">
                            <div class="tweet-icons">
                                <span class="material-symbols-outlined">favorite</span>
                                <span class="material-symbols-outlined">repeat</span>
                                <span class="material-symbols-outlined">share</span>
                            </div>
                        </div>
                        <div class="tweet-date">
                            <span>
                            ${(tweet.created_at)}
                            </span>
                        </div>
                    </footer>
                </section>
        `);
        return $tweet;
    };

    // look into bem css


    // Function to render tweets
    const renderTweets = (tweets) => {
        tweets.forEach((tweet) => {
            const $tweet = createTweetElement(tweet);
            $('#tweets-container').prepend($tweet);
        });
    };

    const loadTweets = function() {
        $.ajax({
            url: '/tweets',
            method: 'GET',
            dataType: 'json',
            success: function(tweets) {
                renderTweets(tweets);
            },
            error: function(error) {
                console.error('Error loading tweets:', error);
            }
        });
    };
  

    $('#tweet-form').on('submit', function(event) {
            event.preventDefault();

            const tweetText = $('#tweet-text').val().trim();

            console.log('Tweet Text: ', tweetText);
            if (tweetText.length > 140) {
                console.error('Tweet is too long');
                return;
            }

            const tweetData = $(this).serialize();

            $.ajax({
                url: '/tweets',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded',    
                data: { text: tweetText },
                success: function(response) {
                    console.log('Tweet submitted successfully:', response);
                    $('#tweet-text').val('');
                    $(".counter").text("0/140").removeClass("over-limit");
                    loadTweets();
                },
                error: function(error) {
                    console.error('Error submitting tweet:', error);
                }
            });
        
    });

    // Call the loadTweets function to fetch and render tweets
    loadTweets();
});





