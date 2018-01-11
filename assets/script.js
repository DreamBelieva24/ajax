var topics = ["dog", "monkey", "bird", "turtle", "seahorse"]


//new button doesn't work

$("#newItem").on("click", function () {
  event.preventDefault();

  var input = $("#inputBox").val().trim();

  topics.push(input);

  $("#buttons").append("<button data-animal= ' " + input + " ' class=animalButton>" + input + "</button>  ")

})

for (i = 0; i < topics.length; i++) {
  $("#buttons").append("<button data-animal= ' " + topics[i] + " ' class=animalButton>" + topics[i] + "</button>  ")

}

$(".animalButton").on("click", function () {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div class='item'>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("data-still", results[i].images.original_still.url);
      animalImage.attr("src", results[i].images.original_still.url);
      animalImage.attr("class", "gif");
      animalImage.attr("data-state", "still");
      animalImage.attr("data-animate", results[i].images.fixed_width.url);
      animalImage.attr("width", "356px");
      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);

      $(".gif").on("click", function () {
        
            var state = $(this).attr("data-state")
        
            if (state === "still") {
        
              $(this).attr("src", $(this).attr("data-animate"))
              $(this).attr("data-state", "animate")
            }
        
            else {
        
              $(this).attr("src", $(this).attr("data-still"))
              $(this).attr("data-state", "still")
            }
            //Only working for every other picture???
          });
        









    }

  });

  
});