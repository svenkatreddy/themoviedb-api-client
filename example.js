var tmdb = require('./lib/moviedb')('dc4940972c268b026150cf7be6f01d11');

tmdb.movieInfo({id: 11})
  .then(function(res){
    console.log('--------','popular');
    console.log(JSON.stringify(res.body));
  })
  .catch(function(error) {
    console.log(error)
  });
  
// tmdb.miscPopularMovies({}).then(function(res){
//   console.log('--------','ninja');
//   console.log(JSON.stringify(res.body));
// })
// .catch(function(error) {
//   console.log(error)
// });

// tmdb.searchMovie({ query: 'Alien' }).then((res) => {
//   console.log(res.body);
// })
// .catch(function(error) {
//   console.log(error)
// });


// tmdb.movieInfo({ id: 666}).then((res) => {
//   console.log(res.body);
// })
// .catch(function(error) {
//   console.log(error)
// });
