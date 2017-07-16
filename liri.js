
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
var spotifySong = '';
var inputArray = process.argv;
var client = new Twitter(keys.twitterKeys);


function getTweets() { 
    var params = {screen_name: 'contrapuntist'};
    // client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
    //     if(error) throw error;
    //     console.log(tweet);  // Tweet body. 
    //     // console.log(response);  // Raw response object. 
    // });

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) { 
            for (var i = 0; i < tweets.length; i++)
            console.log(tweets[i].text);
            // console.log(response);
        }
    });
}

function joinString() { 
    var stringArray = [];
    for (var i = 3; i < inputArray.length; i++ ) {
        stringArray.push(inputArray[i]);    
    } 
    // console.log(stringArray); 
    spotifySong = stringArray.join(' ');
    // console.log(spotifySong);
}
joinString();

if (process.argv[2] === 'my-tweets') { 
    console.log ('my tweets');
    getTweets();
} else if (process.argv[2] === 'spotify-this-song') { 
    console.log ('time to spotify');
    joinString();
    getSong(spotifySong);
} else if (process.argv[2] === 'movie-this') { 
    console.log ('what movie?');
} else if (process.argv[2] === 'do-what-it-says') { 
    console.log ('follow orders');
}

function getSong (song) {
    spotify
    .search({ 
        type: 'track', 
        query: song })
    .then(function(response) {
        console.log(response.tracks.items[0]);
    })
    .catch(function(err) {
        console.log(error);
    });
}

