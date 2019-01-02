var mdb = require('./lib/moviedb')('dc4940972c268b026150cf7be6f01d11');

mdb.movieInfo({id: 11})
  .then(function(res){
    console.log('--------','popular');
    console.log(JSON.stringify(res.body));
  })
  .catch(function(error) {
    console.log(error)
  });
  
mdb.miscPopularMovies({}).then(function(res){
  console.log('--------','ninja');
  console.log(JSON.stringify(res.body));
})
.catch(function(error) {
  console.log(error)
});

mdb.searchMovie({ query: 'Alien' }).then((res) => {
  console.log(res.body);
})
.catch(function(error) {
  console.log(error)
});


mdb.movieInfo({ id: 666}).then((res) => {
  console.log(res.body);
})
.catch(function(error) {
  console.log(error)
});
