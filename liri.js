// List of Require Statements
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require('request'); 

// Calling my API keys 
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

// Global variables... they probably belong in an app object with functions (maybe) 
var spotifySong = '';
var omdbSearch = '';
var inputArray = process.argv;

function getTweets() { 
    var params = {screen_name: 'contrapuntist'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) { 
            for (var i = 0; i < tweets.length; i++)
            console.log(tweets[i].text);
            
            // console.log(response);
        }
        // console.log(tweets);
    });
}

function joinString() { 
    var stringArray = [];
    for (var i = 3; i < inputArray.length; i++ ) {
        stringArray.push(inputArray[i]);    
    } 
    // console.log(stringArray); 
    if (process.argv[2] === 'spotify-this-song') { 
        spotifySong = stringArray.join(' ');
    } else if (process.argv[2] === 'movie-this') {
        movieTitle = stringArray.join('+');
        console.log(movieTitle);
        omdbSearch = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieTitle;
    }
}

function getSong (song) {
    console.log('get song reached with song ' + song);
    spotify
    .search({ 
        type: 'track', 
        query: song })
    .then(function(response) {
        console.log(response);
        console.log('Song: ' + response.tracks.items[0].name);
        console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
        console.log('Album: ' + response.tracks.items[0].album.name);
        console.log('Preview Url: ' + response.tracks.items[0].preview_url);
    // * A preview link of the song from Spotify
    // * The album that the song is from
    })
    .catch(function(err) {
        console.log(err);
    });
}

function getMovie(filmTitle) { 
    console.log('get movie reached');
    request(filmTitle, function (error, response, body) { 

        // console.log('error:', error); // Print the error if one occurred 
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        // console.log('body:', body); // Print the HTML for the Google homepage.  
        
        var movieCheck = JSON.parse(body).Title;
        console.log(movieCheck);
        // response.statusCode === '200' &&
        if (movieCheck === 'undefined') { 
        
            console.log ('Not a valid movie title');  
        
        } else if (error) {
          
            console.log(error);
        
        } else { 

            console.log('Movie Title: ' + JSON.parse(body).Title);
            console.log('Year Released: ' + JSON.parse(body).Year);
            console.log('Movie Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('IMDB rate: ' + JSON.parse(body).imdbRating);
        
            if (JSON.parse(body).Ratings.includes('"Source":"Rotten Tomatoes"')) {
                console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            } else { 
                console.log('Rotten Tomatoes Rating: N/A');
            }
        
            console.log('Country produced: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);    
        
        }

    });
} 

if (process.argv[2] === 'my-tweets') { 
    // console.log ('my tweets');
    getTweets();
} else if (process.argv[2] === 'spotify-this-song') { 

    // console.log ('time to spotify');
    joinString()
    getSong(spotifySong);

} else if (process.argv[2] === 'movie-this') {
    // Contingency needed if TV show entered? i.e. The Big Bang Theory 
    // console.log ('what movie?');    
    
    if (inputArray.length < 4 ) { 
        movieTitle = 'mr+nobody';
        console.log('mr nobody reached');
        omdbSearch = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieTitle; 
        getMovie(omdbSearch);
    } else {
        joinString();
        console.log(omdbSearch);
        getMovie(omdbSearch);
    }
    
} else if (process.argv[2] === 'do-what-it-says') { 
    // console.log ('follow orders');
    
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        } else { 
            // console.log(data);
            var dataArr = data.split(",");
            var doThis = dataArr[0]; 
            var searchThis = dataArr[1];

            // console.log(dataArr);
            
            if (doThis === 'spotify-this-song') { 
                getSong(searchThis);
            } else {
                console.log ('action not recognized'); 
            }
        }
    });

}
