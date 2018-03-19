// Arrays containing cuisine type IDs from Zomato API.

let actionAdventure = [73, 150, 1, 227, 193];

let hipster = [161, 3, 308, 70, 491];

let romance = [100, 177, 55, 143, 83];

let disney = [25, 304, 996, 82, 168]

function checkProfile () {
	// Pulls masterProfileObject from the masterJavascript file.
	let pullData = JSON.parse(localStorage.getItem("userAnswers"));
	// Saves highest value in masterProfileObject in 'highestScore' variable.
	let highestScore = Math.max(pullData.categoryOne, pullData.categoryTwo, pullData.categoryThree, pullData.categoryFour);
	let userCategory = null;
	// Runs for loop over masterProfileObject and sets 'userCategory' to key name that has the highest value.
	for (key in pullData) {
		if (highestScore === pullData[key]) {
			userCategory = key;
		}
	}

	// Switch statement replaces userCategory value with related array.
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
} //end checkProfile

checkProfile();


function makeRequest(arr) {
  // let apiKey = "c5d3000aa27c15341e4ef99bcd037e51"
	// Sets url variable to API url that pulls the five highest rated restaurants from the specific cuisine IDs determined in checkProfile.
  let url = `https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&count=10&radius=25000&cuisines=${arr[0]}%2C%20${arr[1]}%2C%20${arr[2]}%2C%20${arr[3]}%2C%20${arr[4]}&sort=rating&apikey=${ZAMATO_KEY}`
	// Actually gets the five restaurant objects.
  let restaurantData = null
  $.get(url).done(function(response) {
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
		// Pulls restaurant name, type of cuisine, menu, location, a featured image, rating, thumbnail, and price from each restaurant object.
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
		return filteredData;

} //end handleResponseObject


function updateUISucces(restaurantData) {

	//Gets the html fields that will be populated with restaurant information based on the data returned from the AJAX request
	let carousel = document.querySelectorAll(".carousel-item");
	let restaurantTitles = document.querySelectorAll('.resultTitle h5');
	let restaurantCuisines = document.querySelectorAll('.resultCuisine');
	let restaurantImages = document.querySelectorAll('.resultsImageCover');
	let address = document.querySelectorAll(".resultReview");
	let restaurantCost = document.querySelectorAll(".resultCost");
	let restaurantLink = document.querySelectorAll('.resultLink a');
	let addToItinerary = document.querySelectorAll(".addToItinerary");
	let map = document.getElementById('map');
	// Runs for loop that uses the DOM to fill each HTML element with correspondent JSON data.
  for (let i = 0; i < carousel.length; i++) {
    restaurantTitles[i].innerHTML = restaurantData[i].name;
  	restaurantCuisines[i].innerHTML = restaurantData[i].cuisine;
		// Checks to see if the restaurant object contains an image. If not, runs setDefaultImage.
  	if (restaurantData[i].featuredImage) {
  		restaurantImages[i].src = restaurantData[i].featuredImage;
  	} else if (restaurantData[i].thumbnail) {
  		restaurantImages[i].src = restaurantData[i].thumbnail
  	} else {
      setDefaultImage(restaurantData[i].cuisine, restaurantImages[i])
    }

		restaurantLink[i].href = restaurantData[i].menu;
  	restaurantCost[i].textContent = "$".repeat(Number(restaurantData[i].price));
		address[i].textContent = restaurantData[i].location;

		//Opens an embedded map on the page based on the restaurant selected by the user
		addToItinerary[i].addEventListener("click", function(e) {
			map.src = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=`;
			let parameters = restaurantData[i].location.replace(" ", "+")
			map.src += parameters
			map.style.display = "block";

			let resultTitle = document.querySelector('.itineraryCard h5');
			let resultCost = document.querySelector('.restaurantFinal .resultCost');
			let resultCuisine = document.querySelector('.restaurantFinal .resultCuisine');
			let resultLink = document.querySelector('.restaurantFinal .resultLink a');
			let resultImage = document.querySelector('.finalImage');
			resultTitle.innerHTML = restaurantData[i].name;
			resultCost.innerHTML = restaurantCost[i].textContent
			resultCuisine.innerHTML = restaurantData[i].cuisine;
			resultLink.href = restaurantLink[i].href;
			resultImage.src = restaurantImages[i].src;
		})
    }
} //end updateUISucces


// Switch statement in a function that when called returns an image from the defaultImages file.
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
} //end setDefaultImage
