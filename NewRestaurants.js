let actionAdventure = [73, 150, 1, 227, 193];

let hipster = [161, 3, 308, 70, 491];

let romance = [100, 177, 55, 143, 83];

let disney = [25, 304, 996, 82, 168]



function makeRequest(arr) {
  let apiKey = "c5d3000aa27c15341e4ef99bcd037e51"
  let url = `https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&count=10&radius=25000&cuisines=${arr[0]}%2C%20${arr[1]}%2C%20${arr[2]}%2C%20${arr[3]}%2C%20${arr[4]}&sort=rating`

  $.get(url + "&apikey=" + apiKey).done(function(response) {
    console.log(response.restaurants[0])
    handleResponseObject(response);
    }).fail(function(error) {
        console.log(error);
      })
}// end makeRequest



function handleResponseObject(data) {
    let relevantRestaurantData = [];
		let obj = null;
		for (let i = 0; i < data.restaurants.length; i ++) {
			obj = {
					name: data.restaurants[i].restaurant.name,
					location: data.restaurants[i].restaurant.location,
					featuredImage: data.restaurants[i].restaurant.featured_image,
					// rating: data.restaurants[i].user_rating.aggregate_rating,
					thumbnail: data.restaurants[i].restaurant.thumb,
					price: data.restaurants[i].restaurant.price_range
				}
			relevantRestaurantData.push(obj)
		}
		console.log(relevantRestaurantData)
		return relevantRestaurantData;

}

makeRequest(actionAdventure)
