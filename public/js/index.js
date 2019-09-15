$(document).ready(function() {
  console.log("hello");
  $("#submit-btn").on("click", function(e) {
    e.preventDefault();
    console.log("Clicked submit btn");
  });
});
