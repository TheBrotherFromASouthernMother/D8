var url = `https://api.themoviedb.org/3/movie/76341?api_key=${TMDB_KEY}`;


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
