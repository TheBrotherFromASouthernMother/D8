
/*To be refactored, we should eventually add a feature that allows users
to select from a drop down menu their state
so that we can provide now playing info for more than just Texas */
function makeMovieRequest() {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1&ISO 3166-2:US-TX`;

    $.get(url).done(function(response) {
      console.log(response)
      updateUISucces()
    }).fail(function(err) {
      console.log(err)
    }).then(function (response) {
      console.log(response)
    })


    function updateUISucces(response) {

    }



  function handleResponseObjectMovies(data) {
    let posterURL = "http://image.tmdb.org/t/p/w342"
    let filteredData = [];
    let obj = null;
    for (let i = 0; i < data.length; i ++) {
      obj = {
        title: data.results[i].title,
        description: data.results[i].overview,
        poster: posterURL + data.results[i].poster_path
      }
      filteredData.push(obj)
    }

  }

}

makeMovieRequest();
