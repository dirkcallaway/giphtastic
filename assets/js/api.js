//Variables
var topics = ["Dogs", "Cats", "Dolphins"];
var params = {
    api_key: "cSL3jMX4Dum9k5yVmxjluqt2hEUavvYl",
    q: "",
    limit: 10,
    rating: "pg"
};
var queryURL = "https://api.giphy.com/v1/gifs/search?";
var gif;
var gifRating = "";



//Functions
var buttonMaker = function () {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-success mx-2");
        newButton.attr("data-value", topics[i]);
        $("#buttons").append(newButton);
    }
};

var ajaxCall = function () {
    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            console.log(response);
            //put articals into HTML
            for(var i = 0; i < response.data.length; i++){
            gif = $("<img>").attr("src", response.data[i].embed_url);
            gifRating = $("<p>").text(response.data[i].rating);
            $("#gif-box").append(gif);
            $("#gif-box").append(gifRating);
            }
        });

};

var printGifs = function() {
    gif = $("<img>").attr("src", )
};


//Calls
buttonMaker();
$(".btn").on("click", function () {
    params.q = this.dataset.value;
    queryURL += $.param(params);
    ajaxCall();
});