//Twitter API

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'xzvFMzprqguriJ3KQ45BPrAp0',
  consumer_secret: 'rXLy3LE6tyNV9fwFv82nTaWrqPpNhvRjy6lcx4nzx2m2og3Z8E',
  access_token_key: '912383265859915776-suOfUczBXndiuRXFGGTw4aMnYE8MWa1',
  access_token_secret: 'yi3eH5Ly56nsjErkVv1vnZqIHojGabk3JXPkKqxLLRJE5'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


