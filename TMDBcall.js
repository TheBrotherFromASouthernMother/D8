
/*To be refactored, we should eventually add a feature that allows users
to select from a drop down menu their state
so that we can provide now playing info for more than just Texas */

let genres = {
      "28": "Action",
      "12": "Adventure",
      "16": "Animation",
      "35": "Comedy",
      "80": "Crime",
      "99": "Documentary",
      "18": "Drama",
      "10751": "Family",
      "14": "Fantasy",
      "36": "History",
      "27": "Horror",
      "10402": "Music",
      "9648": "Mystery",
      "10749": "Romance",
      "878": "Science Fiction",
      "10770": "TV Movie",
      "53": "Thriller",
      "10752": "War",
      "37": "Western"
};


function makeMovieRequest() {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1&ISO 3166-2:US-TX`;

  $.get(url).done(function(response) {
      // console.log(response)
      // updateUISucces()
    }).fail(function(err) {
      console.log(err)
    }).then(function (response) {
        movieData = handleResponseObjectMovies(response)
        updateUISuccesMovies(movieData)
    })


  function handleResponseObjectMovies(data) {
    let posterURL = "http://image.tmdb.org/t/p/w342"
    let filteredData = [];
    let obj = null;
    for (let i = 0; i < data.results.length; i ++) {
      obj = {
        title: data.results[i].title,
        description: data.results[i].overview,
        poster: posterURL + data.results[i].poster_path,
        genre: data.results[i].genre_ids
      }
      filteredData.push(obj)
    }
    console.log(filteredData)
    return filteredData;

  }


  function updateUISuccesMovies(data) {
    let carousel = document.querySelectorAll(".carousel-item")
    let movieTitle = document.querySelectorAll(".resultTitleMovies h5");
    let movieGenre = document.querySelectorAll(".resultGenre");
    let moviePoster = document.querySelectorAll(".resultsImageCoverMovies")
    for (let i = 0; i < carousel.length; i++) {
      movieTitle[i].textContent = data[i].title;
      moviePoster[i].src = data[i].poster;
      movieGenre[i].textContent = genres[String(data[i].genre[0])];
    }



  }

} //end makeMovieRequest

makeMovieRequest();
