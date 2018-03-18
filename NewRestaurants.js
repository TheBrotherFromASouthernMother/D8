

let actionAdventure = [73, 150, 1, 227, 193];

let hipster = [161, 3, 308, 70, 491];

let romance = [100, 177, 55, 143, 83];

let disney = [25, 304, 996, 82, 168]

// var pullData = localStorage.getItem("userAnswers");

var pullData = {
	categoryOne: 0,
	categoryTwo: 2,
	categoryThree: 5,
	categoryFour: 3
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
        restaurantData = handleResponseObject(response);
        updateUISucces(restaurantData)
      })
}// end makeRequest


function handleResponseObject(data) {
    let filteredData = [];
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
			filteredData.push(obj)
		}
		console.log(filteredData)
		return filteredData;

}


function updateUISucces(restaurantData) {
	let carousel = document.querySelectorAll(".carousel-item");
	let restaurantTitles = document.querySelectorAll('.resultTitle h5');
	let restaurantCuisines = document.querySelectorAll('.resultCuisine');
	let restaurantImages = document.querySelectorAll('.resultsImageCover');
	let restaurantCost = document.querySelectorAll(".resultCost");
	let restaurantLink = document.querySelectorAll('.resultLink a');

  for (let i = 0; i < carousel.length; i++) {
		console.log(restaurantTitles[i])
    restaurantTitles[i].innerHTML = restaurantData[i].name;
  	restaurantCuisines[i].innerHTML = restaurantData[i].cuisine;

  	if (restaurantData[i].featuredImage) {
  		restaurantImages[i].src = restaurantData[i].featuredImage;
  	} else if (restaurantData[i].thumbnail) {
  		restaurantImages[i].src = restaurantData[i].thumbnail
  	} else {
      setDefaultImage(restaurantData[i].cuisine, restaurantImages[i])
    }

		restaurantLink[i].href = restaurantData[i].menu;
  	restaurantCost[i].textContent = "$".repeat(Number(restaurantData[i].price));
    }
}

function setDefaultImage(cuisine, image) {
  switch(true) {
    case (cuisine.startsWith("Italian")):
      image.src = "./defaultImages/Italian.jpg";
      break;
    case (cuisine.startsWith("American")):
      image.src = "./defaultImages/American.jpg";
      break;
    case (cuisine.startsWith("BarFood")):
      image.src = "./defaultImages/BarFood.jpg";
      break;
    case (cuisine.startsWith("Chinese")):
      image.src = "./defaultImages/Chinese.jpg";
      break;
    case (cuisine.startsWith("Pizza")):
      image.src = "./defaultImages/Pizza.jpg";
      break;
		case (cuisine.startsWith("Burger")):
		  image.src = "./defaultImages/Burger.jpg";
		  break;
		case (cuisine.startsWith("TexMex")):
			image.src = "./defaultImages/TexMexjpg";
			break;
		case (cuisine.startsWith("Healthy")):
	    image.src = "./defaultImages/Healthy.jpg";
	    break;
		case (cuisine.startsWith("Seafood")):
		  image.src = "./defaultImages/Seafood.jpg";
		  break;
		case (cuisine.startsWith("Mediterranean")):
			image.src = "./defaultImages/Seafood.jpg";
			break;
		case (cuisine.includes("Sushi")):
			image.src = "./defaultImages/Sushi.jpg"
			break;
		case (cuisine.startsWith("Sandwich")):
			image.src = "./defaultImages/Sandwich.jpg"
			break;
		case (cuisine.startsWith("Desserts")):
			image.src = "./defaultImages/Desserts.jpg"
			break;
		case (cuisine.startsWith("Cajun")):
			image.src = "./defaultImages/Cajun.jpg"
			break;
		case (cuisine.startsWith("Coffee")):
				image.src = "./defaultImages/Coffee&Tea.jpg"
				break;
    default:
      image.src = "./defaultImages/Vegetarian.jpg"
  }
}
