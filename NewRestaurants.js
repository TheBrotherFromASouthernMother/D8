var actionAdventure = [73, 150, 1, 227, 193];

var hipster = [161, 3, 308, 70, 491];

var romance = [100, 177, 55, 143, 83];

var disney = [25, 304, 996, 82, 168]



function makeRequest(arr) {
  var apiKey = "c5d3000aa27c15341e4ef99bcd037e51"
  var url = `https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&radius=25000&cuisines=${arr[0]}%2C%20${arr[1]}%2C%20${arr[2]}%2C%20${arr[3]}%2C%20${arr[4]}`

  $.get(url + "&apikey=" + apiKey).done(function(response) {
    console.log(response)
    // updateUISuccess(response, arr);
    }).fail(function(error) {
        console.log(error);
      })
}// end makeRequest



// function updateUISuccess(response, personality) {
//     var newResponse = response.cuisines.filter(function(element) {
//         if (personality.includes(element.cuisine.cuisine_id))
//         console.log(element.cuisine.cuisine_id);
//             return element.cuisine.cuisine_id;
//
//     })
//
//
// }

makeRequest(actionAdventure)
