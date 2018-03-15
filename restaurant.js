"use strict";

//Jquery request.

(function() {

	var url = "https://developers.zomato.com/api/v2.1/cuisines?city_id=277";
	var apiKey = "c5d3000aa27c15341e4ef99bcd037e51";
    var newResponse;

    $.get(url + "&apikey=" + apiKey).done(function(response) {
        // console.log(response.cuisines[0].cuisine.cuisine_id);
        // console.log(response.cuisines)
        // console.log(response.cuisines.cuisine);
        updateUISuccess(response);
        // console.log(newResponse);
    }).fail(function(error) {
        console.log(error);

        // updateUIError();
    })



// Handle XHR succes.

function updateUISuccess(response) {
    var categoryOneArray:
    var testArray = [73, 150, 1, 83, 227, 25, 304, 996, 995, 143, 193, 55, 82, 161, 177, 168, 3, 100, 308, 997];
    var newResponse = response.cuisines.filter(function(element) {
        if (testArray.includes(element.cuisine.cuisine_id))
        console.log(element.cuisine.cuisine_id);
            return element.cuisine.cuisine_id;
        

        // for (var i = 0; i < response.cuisines.length; i++) {
        //     if (element.cuisines[element] in testArray) {
        //         return element.cuisines[i].cuisine.cuisine_id;  
        //     }
        // } 
    })
    // console.log(newResponse)

 
}
// Handle XHR failure.

// function updateUIError()

})();