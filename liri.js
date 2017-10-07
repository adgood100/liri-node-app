// LIRI - Language Interpretive Recognition Interface
//var Twitter = require('twitterKeys');
var Twitter = require('twitter');
//var Spotify = require('spotifyKeys');

//var Spotify = require('./spotifyKeys');
var request = require("request");
var inquirer = require('inquirer');
var fs = require("fs");
var keys = require('./keys.js')

console.log(Twitter);

// Take two arguments.
// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
// The second will be the parameter that will be passed to the action, etc.
var action = process.argv[2];
var value = process.argv[3];
			

var client = new Twitter (keys.twitterKeys);

//var spotify = new Spotify({
//  id: '8af97ebdd9d64f9f8b52ae7558fbb8e9',
//  secret: '29f85e3924804d58958b8fc759eeb367'
//});


// --- Case Structure for LIRI ---

//   * `my-tweets`

//   * `spotify-this-song`'<song name here>' (default to "The Sign" by Ace of Base)

//   * `movie-this`'<movie name here>' (default to "Mr. Nobody")

//   * `do-what-it-says`(user random.txt to retrieve command to process)

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.

inquirer.prompt([
				{
				type: 'list',
				name: 'liribot',
				message: 'What would you like to do?',
				choices: 
						[
						'my-tweets',
						'spotify-this-song',
						'movie-this',
						'do-what-it-says'
						],
				default: 'Check my-tweets'
				},
				]).then(function (answers) {
    	
    	console.log(answers.liribot);
    	if (answers.liribot === 'my-tweets') {
    		myTweets();
    	}
    	if (answers.liribot === 'spotify-this-song') {
    		spotifyThisSong();
    	}
    	if (answers.liribot === 'movie-this') {
    		movieThis();
    	}
    	if (answers.liribot === 'do-what-it-says') {
    		doWhatItSays();
    	}
    	

// --- Case Structure for LIRI ---
});

// --- Twitter Function API Call ---

function myTweets () {
	console.log('myTweets');
	var params = {screen_name: 'AllyGood2'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

}

// --- Twitter Function API Call ---

// --- Spotify Function API Call ---

function spotifyThisSong () {
	spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}
 
	console.log(data); 
	});

}

// --- Spotify Function API Call ---

// --- OMDB Function API Call ---

function movieThis () { 
	var movies = '';
	console.log('You are in movieThis now...');
	var questions = [ 
		{
			type: 'input',
			name: 'moviebot',
			message: 'What movie(s) would you like to learn about?',
			default: function () {
				return 'Mr. Nobody';
			}
		}
	];
	inquirer.prompt(questions).then(function(movieAnswers) {

		// Loop through all the words in the node argument
		// And do a little for-loop magic to handle the inclusion of "+"s
		console.log("You said:..." + movieAnswers.moviebot);
		console.log("Let's Go!!!...");
		var strMovies = movieAnswers.moviebot.split(" ");
		for (var i = 0; i < strMovies.length; i++) {

			if (i > 0 && i < strMovies.length) {

				movies = strMovies[i];
//				console.log(movies);
				requestMovie(movies);

			}

			else {

				movies += strMovies[i];
//				console.log(movies);
				requestMovie(movies);

			}
		}

	})

			function requestMovie (movies) {
				function MovieList(title, year, imdbrating, ratings, country, language, plot, actors) {
				  this.title = title;
				  this.year = year;
				  this.imdbrating = imdbrating;
				  this.ratings = ratings;
				  this.country = country;
				  this.language = language;
				  this.plot = plot;
				  this.actors = actors;

				  // method which prints all of the stats for a character
				  this.printStats = function() {
				    console.log(
				    	"Title: " + this.title + 
				    	"\nYear: " + this.year +
				    	"\nimdbrating: " + this.imdbrating + 
				    	"\nRotten Tomatoes Rating: " + this.ratings + 
				    	"\nCountry: " + this.country + 
				    	"\nLanguage: " + this.language +
				    	"\nPlot: " + this.plot +
				    	"\nActors: " + this.actors
				    	);
				    console.log("\n-------------\n");
				  };
				}

				// Then run a request to the OMDB API with the movie specified
//				console.log("This is the value of movies:..." + movies);
				if (movies === '') {
					movies = 'Mr. Nobody';
				} 

				var queryUrl = "http://www.omdbapi.com/?t=" + encodeURI(movies) + "&y=&plot=short&apikey=40e9cece";

			// This line is just to help us debug against the actual URL.
//			console.log(queryUrl);

				request(queryUrl, function(error, response, body) {

				// If the request is successful
				if (!error && response.statusCode === 200) {
					var myMovieList = new MovieList(
						JSON.parse(body).Title,
						JSON.parse(body).Year,
						JSON.parse(body).imdbRating,
						JSON.parse(body).Ratings[1].Value,
						JSON.parse(body).Country,
						JSON.parse(body).Language,
						JSON.parse(body).Plot,
						JSON.parse(body).Actors
						);
				myMovieList.printStats();

			  }
			})
			}
	
}

// --- Do What It Says Function API Call ---

function doWhatItSays () {
	
}

// --- Do What It Says Function API Call ---


