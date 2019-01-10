
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
var gifDownload;
var gifTitle;
var searchInput;
var gifColumn;



//Functions
var buttonMaker = function () {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-success mx-2 my-1");
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
            // $("#gif-box").empty();
            gifColumn = $("<div class='col-md-12 card-columns' id='gifCol'>");
            for (var i = 0; i < response.data.length; i++) {
                cardGif = $("<div>").addClass("card mb-3 p-1 text-white bg-info");
                gif = $("<img>").attr({
                    "src": response.data[i].images.fixed_width_still.url,
                    "data-static": response.data[i].images.fixed_width_still.url,
                    "data-play": response.data[i].images.fixed_width.url,
                    "data-state": "still",
                    "class": "gif card-img-top"});
                gifRating = $("<p class='card-text'>").text("Rated: " + response.data[i].rating);
                gifDownload = $("<a href= '" + response.data[i].images.original.mp4 + "' class='btn btn-light mx-auto' target='blank' download>" + "Download" + "</a>");
                gifTitle = $("<h5 class='card-title'>" + response.data[i].title + "</h5>");
                cardGif.append(gif);
                cardGif.append(gifTitle);
                cardGif.append(gifRating);
                cardGif.append(gifDownload);
                gifColumn.append(cardGif);
            }
            $("#gif-box").prepend(gifColumn);
        });

};

//Calls
$(document).ready(function(){
//Creates initial buttons
buttonMaker();

//Button Click
$(document.body).on("click", "#gifSearch", function () {
    params.q = this.dataset.value;
    queryURL += $.param(params);
    ajaxCall();
});

//Gif click action
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

//Input Search Button click
$("#search").on("click", function(){
    event.preventDefault();
    searchInput = $("#search-input").val().trim();
    if(searchInput === ""){
        alert("Please enter a valid search!");
    } else{
        //Collects input and makes sure only the first letter is capitalized
        searchInput = searchInput.toLowerCase();
        var firstLetter = searchInput.charAt(0);
        firstLetter = firstLetter.toUpperCase();
        var slicedInput = searchInput.slice(1);
        searchInput = firstLetter + slicedInput;
        topics.push(searchInput);
        //Clears input box
        $("#search-input").val("");
        buttonMaker();
    }
});


});