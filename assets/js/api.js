//Variables
var topics = ["Dogs", "Cats", "Dolphins"];


//Functions
var buttonMaker = function() {
    $("#buttons").empty();
    for(var i = 0; i < topics.length; i++){
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-success mx-2");
        newButton.attr("data-value", topics[i]);
        $("#buttons").append(newButton);
    }
}


//Calls