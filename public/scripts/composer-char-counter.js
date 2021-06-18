// console.log("char counter");

$(document).ready(function() {
  
  $("#tweet-text").keyup(function(event) {
    $("#error").html("");
    const $inputCounter = $(this).val();
    let $charCounter = $(this).parent().children(".button-counter").children("#char-counter");
    const $count = $charCounter.html(140 - $inputCounter.length);
    if ($inputCounter.length > 140) {
      $charCounter.addClass('over-count');
    } else {
      $charCounter.removeClass('over-count');
    }
  });

});
