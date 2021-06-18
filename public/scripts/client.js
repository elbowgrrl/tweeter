//Client-side JS functions

$(document).ready(function () {
  
  //Uses Ajax to capture data from tweet form and sends to server
  $("#tweet-form").on("submit", onSubmit);

  loadTweets();
  
});

//renders html error message
const throwError = function (error) {
  const $targetContainer = $("#error");
  $targetContainer.append(error);
};

//prevents cross site scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//returns a dynamic html elemt based on Tweet data
function createTweetElement(data) {
  const text = data.content.text;
  const avatar = data.user.avatars;
  const name = data.user.name;
  const handle = data.user.handle;

  let $tweet = $(`<article class="tweet-container">
  <header class="tweet-container"><div class="head1"><img src=${escape(
    avatar
  )}/><span>${space}</span>${escape(name)}</div><i class="head2">${escape(
    handle
  )}</i></header>
  <p>${escape(text)}</p>
  <footer class="tweet-container">${timeago.format(
    data.created_at
  )}<span id="icons"><i class="fas fa-flag"></i><i class="fas fa-heart"></i><i class="fas fa-retweet"></i></span></footer>
  </article>`);

  return $tweet;
}


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

//makes a request to /tweets and receive the array of tweets as JSON
const loadTweets = function () {
  $.ajax({ url: "/tweets/", method: "GET" }).then((tweets) => {
    renderTweets(tweets);
  });
};

const onSubmit = function (event) {
  const $errorNoText = $(
    `<article class="error">Please enter some text. We are listening!</article>`
  );
  const $errorToLong = $(
    `<article class="error">Tweeter is only able to accept up to 140 characters of text. Becasue Rules.</article>`
  );

  event.preventDefault();
  const $data = $(this).serialize();
  $("#tweet-text").val("");
  $("#tweet-text").trigger("keyup");

  const inputTextLength = $data.length - 5;

  if (inputTextLength <= 0 || $data === null) {
    throwError($errorNoText);
    return;
  }

  if (inputTextLength >= 140) {
    throwError($errorToLong);
    return;
  }

  $.ajax({
    url: "/tweets/",
    method: "POST",
    data: $data,
  }).then(() => {
    loadTweets();
  });
};