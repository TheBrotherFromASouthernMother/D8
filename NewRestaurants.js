

let actionAdventure = [73, 150, 1, 227, 193];

let hipster = [161, 3, 308, 70, 491];

let romance = [100, 177, 55, 143, 83];

let disney = [25, 304, 996, 82, 168]

// var pullData = localStorage.getItem("userAnswers");

var pullData = {
	categoryOne: 0,
	categoryTwo: 0,
	categoryThree: 5,
	categoryFour: 0
  };


function checkProfile () {
	var highestScore = Math.max(pullData.categoryOne, pullData.categoryTwo, pullData.categoryThree, pullData.categoryFour);
	var userCategory = null;
	(function() {
		for (key in pullData) {
			if (highestScore === pullData[key]) {
				userCategory = key;
			}
		}
	})();
	console.log(highestScore);
	console.log(userCategory);

	switch (userCategory) {
		case("categoryOne"):
			makeRequest(actionAdventure);
			console.log("Action");
			break;
		case("categoryTwo"):
			makeRequest(hipster);
			console.log("Hipster");
			break;
		case("categoryThree"):
			makeRequest(romance);
			console.log("Romance");
			break;
		case("categoryFour"):
			makeRequest(disney);
			console.log("Disney");
			break;
		default:
			console.log("You done fucked up, brah.");
	}
}

checkProfile();


function makeRequest(arr) {
  let apiKey = "c5d3000aa27c15341e4ef99bcd037e51"
  let url = `https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&count=10&radius=25000&cuisines=${arr[0]}%2C%20${arr[1]}%2C%20${arr[2]}%2C%20${arr[3]}%2C%20${arr[4]}&sort=rating`

  let restaurantData = null
  $.get(url + "&apikey=" + apiKey).done(function(response) {
    }).fail(function(error) {
        console.log(error);
        //updateUIError
      }).then(function (response) {
        console.log(response)
        restaurantData = handleResponseObject(response);
        console.log(restaurantData)
        updateUISucces(restaurantData)
      })
}// end makeRequest


function handleResponseObject(data) {
    let relevantRestaurantData = [];
		let obj = null;
		for (let i = 0; i < data.restaurants.length; i ++) {
			obj = {
					name: data.restaurants[i].restaurant.name,
					cuisine: data.restaurants[i].restaurant.cuisines,
					menu: data.restaurants[i].restaurant.menu_url,
					location: data.restaurants[i].restaurant.location.address,
					featuredImage: data.restaurants[i].restaurant.featured_image,
					rating: data.restaurants[i].restaurant.user_rating.aggregate_rating,
					thumbnail: data.restaurants[i].restaurant.thumb,
					price: data.restaurants[i].restaurant.price_range
				}
			relevantRestaurantData.push(obj)
		}
		console.log(relevantRestaurantData);
		return relevantRestaurantData;

}


function updateUISucces(restaurantData) {
  let $imgClass = $('.restaurantImage')[0];
  let imgSource = ""
  let defaultImg = "./defaultImages/Vegetarian.jpg"
  if (imgSource)  {
    $imgClass.src = imgSource
  } else {
    $imgClass.src= defaultImg;
  }


  var carousel = document.querySelectorAll('.carousel-item');
console.log(carousel)
for (let i = 0; i < carousel.length; i++) {
	carousel[i].querySelector('.resultTitke').innerHTML = restaurantData[i].name;
	carousel[i].querySelector('.resultCuisine').innerHTML = restaurantData[i].cuisines;

	if (estaurantData[i].featured_image) {
		carousel[i].querySelector('.restaurantImage').src = restaurantData[i].featured_image;
	} else {
		carousel[i].querySelector('.restaurantImage').src = restaurantData[i].thumbnail
	}

	carousel[i].querySelector('.resultLink').href =  restaurantData[i].menu;



}
}
