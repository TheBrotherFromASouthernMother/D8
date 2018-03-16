
/*To be refactored, we should eventually add a feature that allows users
to select from a drop down menu their state
so that we can provide now playing info for more than just Texas */

var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1&ISO 3166-2:US-TX`;

  $.get(url).done(function(response) {
    console.log(response)
    updateUISucces()

  }).fail(function(err) {
    console.log(err)
  })


  function updateUISucces(response) {
      return 0;
  }


function handle
