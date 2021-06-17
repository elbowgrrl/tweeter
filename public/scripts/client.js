/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = require('..initial-tweets.json'); //???????
// console.log("tweetData", tweetData);





$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
  const $targetContainer = $('#tweet-container');
  let $tweet;
  // loops through tweets
  for (const tweet of tweets) {
  // calls createTweetElement for each tweet
  $tweet = createTweetElement(tweet);
  $targetContainer.append($tweet);
  }
  // takes return value and appends it to the tweets container
  return;
  };

  function createTweetElement(data) {
    
    let $tweet = $(`<article class="tweet-container">
    <header class="tweet-container"><img src=${data.user.avatars}/>${data.user.name}<span>${data.user.handle}</span></header>
    <p>${data.content.text}</p>
    <footer class="tweet-container">${timeago.format(data.created_at)}<span id="icons"><i class="fas fa-flag"></i><i class="fas fa-heart"></i><i class="fas fa-retweet"></i></span></footer>
    </article>`);
  
    return $tweet;
  };

  renderTweets(tweetData)


});

