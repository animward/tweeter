
// scripts/client.js
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

//Spent so much time trying to make it appear how I want visually... 
//The following code is heavily influinced by ChatGPT's code. I was unable to get the tweets to render in the way I wanted them to. I will continue to work on this and try to get it to render the way I want it to.

// Function to render tweets
const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container'); // Get the tweets container

    for (const tweet of tweets) {
        const userId = tweet.user.name; // Get the user ID

        // Create a new main container for each user
        const $mainContainer = $('<main class="main-container"></main>');
        $mainContainer.attr('id', `tweets-container-${userId}`); // Set the ID for the main container

        const $tweetSection = $('<section class="tweet"></section>'); // Create a new tweet section
        const $tweet = createTweetElement(tweet);
        $tweetSection.append($tweet); // Append the tweet to the tweet section

        $mainContainer.append($tweetSection); // Append the tweet section to the main container
        $(`#tweets-container-${userId}`).remove(); // Remove existing main container if it exists
        $tweetsContainer.append($mainContainer); // Append the main container to the tweets container
    }
};

$(document).ready(function() {
    // Fake data
    const tweets = [
        {
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png",
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": "https://i.imgur.com/nlhLi3I.png",
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ];

    // Render tweets
   renderTweets(tweets);
});








