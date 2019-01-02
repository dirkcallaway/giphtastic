
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
var cardGif;
var gifRating = "";
var searchInput;



//Functions
var buttonMaker = function () {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-success mx-2");
        newButton.attr({
            "data-value": topics[i],
            "id": "gifSearch"
        });
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
            $("#gif-box").empty();
            for (var i = 0; i < response.data.length; i++) {
                cardGif = $("<div>").addClass("card mb-3 p-1 text-white bg-info");
                gif = $("<img>").attr({
                    "src": response.data[i].images.fixed_width_still.url,
                    "data-static": response.data[i].images.fixed_width_still.url,
                    "data-play": response.data[i].images.fixed_width.url,
                    "data-state": "still",
                    "class": "gif card-img-top"});
                gifRating = $("<p class='card-text'>").text("Rated: " + response.data[i].rating);
                cardGif.append(gif);
                cardGif.append(gifRating);
                $("#gif-box").append(cardGif);
            }
        });

};


//Calls
$(document).ready(function(){
//Button clicks
buttonMaker();
$(document.body).on("click", "#gifSearch", function () {
    params.q = this.dataset.value;
    queryURL += $.param(params);
    ajaxCall();
});

//Gif Button click action
$(document.body).on("click", ".gif", function(){
    //Checks the state of the button clicked
    //If the gif is still it will switch the URL to animation
    if(this.dataset.state === "still"){
        this.dataset.state = "play";
        $(this).attr("src", this.dataset.play);
    //If the gif is playing it will switch the URL to a static img
    } else {
        this.dataset.state = "still";
        $(this).attr("src", this.dataset.static);
    }
});

$("#search").on("click", function(){
    searchInput = $("#search-input").val().trim();
    if(searchInput === ""){
        alert("Please enter a valid search!");
    } else{
        console.log(searchInput);
        searchInput = searchInput.toLowerCase();
        searchInput.charAt(0).toUpperCase();
        topics.push(searchInput);
        buttonMaker();
        $("#search-input").text("");
    }
});


});