var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotifyKeys);


if (process.argv[2] === 'my-tweets') { 
    console.log ('my tweets'); 
} else if (process.argv[2] === 'spotify-this-song') { 
    console.log ('time to spotify'); 
    
} else if (process.argv[2] === 'movie-this') { 
    console.log ('what movie?');
} else if (proccess.argv[2] === 'do-what-it-says') { 
    console.log ('follow orders');
}


spotify
  .search({ 
      type: 'track', 
      query: 'All the Small Things' })
  .then(function(response) {
    console.log(response.tracks.items[0]);
  })
  .catch(function(err) {
    console.log(error);
});
