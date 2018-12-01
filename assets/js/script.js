var topics = ["spider-man", "batman", "daredevil", "green lantern", "wonder woman", "hawkeye", "green arrow"];

console.log("yay"); 
//  create buttons for topics
function createButtons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("topic btn btn-defualt");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $(".buttons").append(newButton);

    }
};
// add new topic to find gifs on.
$("#addTopic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topicSearch").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "topic" + "&api_key=qrRjSyJ81cU7AMJ7hRJu6GqW6sF6nS8E&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        if (response.data.length == 0) {
            alert("No Gifs found!");
        }
        else if (topics.indexOf(topic) != -1) {
            alert("Already have topic");
        }
        else {
            topics.push(topic);
            createButtons();
        }

    });
});
// display still gifs to page
function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=qrRjSyJ81cU7AMJ7hRJu6GqW6sF6nS8E&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        console.log();

        $(".gifs").empty();
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

            var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            gifImage.addClass("gif");

            var imageDiv = $("<div>");
            imageDiv.addClass("play");
            imageDiv.attr("data-state", "still");
            imageDiv.attr("data-name", topic);
            imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
            imageDiv.attr("data-animate", response.data[i].images.fixed_height.url)

            $(imageDiv).append(gifImage);
            $(gifDiv).append(imageDiv);
            $(".gifs").append(gifDiv);
        }

    });
};
// plays gif on image press 
function playGif() {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};


$(document).on("click", ".topic", displayGifs);
$(document).on("click", ".play", playGif);

//Running Code
createButtons();
