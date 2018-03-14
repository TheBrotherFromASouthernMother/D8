var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1&ISO 3166-2:US-TX`;


function makeAJAXRequest() {
  movieData = null;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      movieData = JSON.parse(xhr.responseText);
      console.log(movieData)
    }
  }

  xhr.open("GET", url, true)
  xhr.send()
}


makeAJAXRequest()
