// server/routes/tweets.js
"use strict";

const userHelper = require( "../lib/util/user-helper" );
const DataHelpers = require("../lib/data-helpers"); // Import the DataHelpers module

const express = require('express');
//const { text } = require("body-parser");
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(_req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    const tweetText = req.body.text;
    if (!tweetText || tweetText.trim() === ""){
      res.status(400).json({ error: 'invalid request: no tweet text provided'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: tweetText
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
