
// scripts/client.js
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to create a new tweet element

$(document).ready(function() {
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

    // Function to render tweets
    const renderTweets = function(tweets) {
        const $tweetsContainer = $('#tweets-container'); // Get the tweets container

        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $tweetsContainer.prepend($tweet);
        }
    };

    // Function to load tweets from the server
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
        const tweetText = $('#tweet-text').val();
        if (!tweetText) {
            alert('Tweet cannot be empty!');
            return;
        }

        $.ajax({
            url: '/tweets',
            method: 'POST',
            contentType: 'application/json',    
            data: JSON.stringify({ text: tweetText }),
            success: function(response) {
                $('#tweet-text').val('');
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





