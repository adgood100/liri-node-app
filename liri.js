// LIRI - Language Interpretive Recognition Interface

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var fs = require("fs");
var keys = require("./keys.js");

var client = new Twitter(keys.twitterKeys);
var client2 = new Spotify(keys.spotifyKeys);
inquirer
  .prompt([
    {
      type: "list",
      name: "liribot",
      message: "What would you like to do?",
      choices: [
        "my-tweets",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ],
      default: "Check my-tweets"
    }
  ])
  .then(function(answers) {
    console.log(answers.liribot);
    if (answers.liribot === "my-tweets") {
      myTweets();
    }
    if (answers.liribot === "spotify-this-song") {
      spotifyThisSong();
    }
    if (answers.liribot === "movie-this") {
      movieThis();
    }
    if (answers.liribot === "do-what-it-says") {
      doWhatItSays();
    }

    // --- Case Structure for LIRI ---
  });

// --- Twitter Function API Call ---

function myTweets() {
  console.log("myTweets");
  var forEachTweet;
  var params = { screen_name: "AllyGood2", count: 25 };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      tweets.map(function(tweet) {
        console.log("These are my tweets");
        console.log("Created at: ", tweet.created_at);
        console.log("Tweet: ", tweet.text);
      });
    }
  });
}

function spotifyThisSong() {
// Artist(s) artists: object
// The song's name name:
// A preview link of the song from Spotify preview_url:
// The album that the song is from album: name:
  var songs = "";
  console.log("You are in spotifyThisSong now...");
  var questions = [
    {
      type: "input",
      name: "song",
      message: "What song(s) would you like to learn about?",
      default: function() {
        return "The Sign";
      }
    }
  ];
  inquirer.prompt(questions).then(function(answers) {
    client2.search({ type: "track", query: answers.song }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
//      console.log(data.tracks.items);
      if (!err) {
      data.tracks.items.map(function(data) {
        console.log(" ");
        console.log("Artists: ........ " + data.artists);
        console.log("Song Name: ...... " + data.name);
        console.log("Preview Link: ... " + data.preview_url);
        console.log("Album: .......... " + data.album.name);
        console.log("***************** ");
      });
    }
    });
  });
}

// --- Spotify Function API Call ---

// --- OMDB Function API Call ---

function movieThis() {
  var movies = "";
  console.log("You are in movieThis now...");
  var questions = [
    {
      type: "input",
      name: "moviebot",
      message: "What movie(s) would you like to learn about?",
      default: function() {
        return "Mr. Nobody";
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
      } else {
        movies += strMovies[i];
        //				console.log(movies);
        requestMovie(movies);
      }
    }
  });

  function requestMovie(movies) {
    function MovieList(
      title,
      year,
      imdbrating,
      ratings,
      country,
      language,
      plot,
      actors
    ) {
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
          "Title: " +
            this.title +
            "\nYear: " +
            this.year +
            "\nimdbrating: " +
            this.imdbrating +
            "\nRotten Tomatoes Rating: " +
            this.ratings +
            "\nCountry: " +
            this.country +
            "\nLanguage: " +
            this.language +
            "\nPlot: " +
            this.plot +
            "\nActors: " +
            this.actors
        );
        console.log("\n-------------\n");
      };
    }

    // Then run a request to the OMDB API with the movie specified
    //				console.log("This is the value of movies:..." + movies);
    if (movies === "") {
      movies = "Mr. Nobody";
    }

    var queryUrl =
      "http://www.omdbapi.com/?t=" +
      encodeURI(movies) +
      "&y=&plot=short&apikey=40e9cece";

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
    });
  }
}

// --- Do What It Says Function API Call ---

function doWhatItSays() {
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

    if (doCommand === "my-tweets") {
      myTweets();
    }

    if (doCommand === "spotify-this-song") {
      spotifyThisSong();
    }

    if (doCommand === "movie-this") {
      movieThis();
    }
  });
}

// --- Do What It Says Function API Call ---
