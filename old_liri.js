// LIRI - Language Interpretive Recognition Interface

var Twitter = require('twitter');
var Twit = require('twit');
var Spotify = require('spotify-web-api-node');
var spotify = require('spotify');
var request = require("request");
var inquirer = require('inquirer');
var fs = require("fs");
var keys = require('./keys.js');

console.log(keys.twitterKeys);
console.log('************');
console.log(keys.spotifyKeys);
console.log('************');

//console.log(Twitter);

var twitterKeys = {
  consumer_key: 's0SbSohUYxpnve6h2zxR9cRav',
  consumer_secret: '6ozHOVvMKGu5tXUuxlE0goeovPjLhu5dMSAbi4XyZqUo2TJIz8',
  access_token_key: '912383265859915776-suOfUczBXndiuRXFGGTw4aMnYE8MWa1',
  access_token_secret: 'yi3eH5Ly56nsjErkVv1vnZqIHojGabk3JXPkKqxLLRJE5'
};

var spotifyKeys = {
  id: '8af97ebdd9d64f9f8b52ae7558fbb8e9',
  secret: '29f85e3924804d58958b8fc759eeb367'
};

var client = new Twitter (twitterKeys);
//var client = new Twit (twitterKeys);
//console.log(client);
//console.log('************');

var client2 = new Spotify (spotifyKeys);
//console.log(client2);
//console.log('************');


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
	var forEachTweet;

	var params = {screen_name: 'AllyGood2', count: 25};
	client.get('statuses/user_timeline', params, searchedData);

	function searchedData (error, tweets, response) {
//		console.log(tweets);	
		if (error) {
			console.log("error occured..." + error);
		}
		if (!error) {
				var strTweets = tweets;
				console.log(strTweets);
			for (var i = 0; i < strTweets.length; i++) {

				if (i > 0 && i < strTweets.length) {

					forEachTweet = strTweets[i];
					console.log('entering forEachTweet');
					console.log(body);
					function TweetList(created_at, text, name) {
					  this.created = created_at;
					  this.text = text;
					  this.name = name;
					  // method which prints all of the stats for a character
					  this.printStats = function() {
					    console.log(
					    	"Created At: " + this.created + 
					    	"\nTweet Text: " + this.text +
					    	"\nName: " + this.name 
					    	);
					    console.log("\n-------------\n");
					  };
					}

					var myTweetList = new TweetList(
						JSON.parse(strTweets[i]).created_at,
						JSON.parse(strTweets[i]).text,
						JSON.parse(strTweets[i]).user.name
						);
					myTweetList.printStats();

				}

				else {

					forEachTweet = strTweets[i];
					console.log('entering forEachTweet');
					function TweetList(created_at, text) {
					  this.created = created_at;
					  this.text = text;
//					  this.name = name;
					  // method which prints all of the stats for a character
					  this.printStats = function() {
					    console.log(
					    	"Created At: " + this.created + 
					    	"\nTweet Text: " + this.text 
//					    	"\nName: " + this.name 
					    	);
					    console.log("\n-------------\n");
					  };
					}

					var myTweetList = new TweetList(
						JSON.parse(forEachTweet).created_at,
						JSON.parse(forEachTweet).text
//						JSON.parse(forEachTweet).user.name
						);
					myTweetList.printStats();

				}
			}

		// ---

		}
	}

};

// --- Twitter Function API Call ---

// --- Spotify Function API Call ---

function spotifyThisSong () {
	var songs = '';
	console.log('You are in spotifyThisSong now...');
	var questions = [ 
		{
			type: 'input',
			name: 'songbot',
			message: 'What song(s) would you like to learn about?',
			default: function () {
				return 'The Sign';
			}
		}
	];
	inquirer.prompt(questions).then(function(songAnswers) {

		// Loop through all the songs in the node argument
		// And do a little for-loop magic to handle the inclusion of "+"s
		console.log("You said:..." + songAnswers.songbot);
		console.log("Let's Go!!!...");
		var strSongs = songAnswers.songbot.split("+");

		for (var i = 0; i < strSongs.length; i++) {

		if (i > 0 && i < strSongs.length) {

			songs = strSongs[i];
//			console.log(songs);
//			requestSong(songs);

		}

			else {

			songs = strSongs[i];
//			console.log(songs);
//			requestSong(songs);

			}

	}

	client2.search({ type: 'track', query: "'" + encodeURI(songs) + "'" }, function(err, data) {
		console.log('Error occured' + err);
	if (err) {
		return console.log('Error occurred: ' + err);
	}
 
	console.log(data); 
	console.log(err);
	});

})
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
	
//	var doWhat = [];
	fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    // Break down all the numbers inside
    var doWhat = data.split(",");
    data = data.split(", ");
    console.log(data);

    // Loop through data to grab those commands and default values and load in table.
    for (var i = 0; i < doWhat.length; i++) {
      var doCommand = doWhat[0];
      var doDefault = doWhat[1];
    }

    // We will then print the contents of random.txt
    console.log("doCommand... " + doCommand);
    console.log("doDefault... " + doDefault);

    if (doCommand === 'my-tweets') {
    	myTweets();
    }

    if (doCommand === 'spotify-this-song') {
    	spotifyThisSong();
    }

    if (doCommand === 'movie-this') {
    	movieThis();
    }

  });

}

// --- Do What It Says Function API Call ---


