/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  //Utilizes the create tweet function to render all tweets in data set
  const renderTweets = function (tweets) {
    const $targetContainer = $("#tweet-container");
    let $tweet;
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      $tweet = createTweetElement(tweet);
      $targetContainer.prepend($tweet);
    }
    // takes return value and appends it to the tweets container
    return;
  };

  //returns a dynamic html elemt based on Tweet data
  function createTweetElement(data) {
    const $content = $().text(data.content.text);///maybe not the best solution
    let $tweet = $(`<article class="tweet-container">
    <header class="tweet-container"><img src=${data.user.avatars}/>${
      data.user.name
    }<span>${data.user.handle}</span></header>
    <p>${$content}</p>
    <footer class="tweet-container">${timeago.format(
      data.created_at
    )}<span id="icons"><i class="fas fa-flag"></i><i class="fas fa-heart"></i><i class="fas fa-retweet"></i></span></footer>
    </article>`);

    return $tweet;
  }

  //makes a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function () {
    $.ajax({ url: "/tweets/", method: "GET" }).then((tweets) => {
      renderTweets(tweets);
    });
  };

  loadTweets();

  //Uses Ajax to capture data from tweet form and sends to server
  $("form").on("submit", function (event) {
    event.preventDefault();
    const $data = $(this).serialize();
    console.log("this", $data)
    $("#tweet-text").val("");
    $("#tweet-text").trigger("input");
    
    const inputTextLength = $data.length - 5;

    if (inputTextLength <= 0 || $data === null) {
      alert("Please enter a tweet");
      return;
    }

    if (inputTextLength >= 140) {
      alert("Please enter a tweeet 140 char or less");
      return;
    }

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: $data,
      
    }).then(() => {
      loadTweets();
    });
    
  });
});
