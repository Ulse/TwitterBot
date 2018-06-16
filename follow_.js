var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Setting up the search params
var params = {
  q: '#nodejs',
  count: 20,
  result_type: 'popular',
  lang: 'en'
}

//Initiating the search using params above
// npm Twitter module helps make a get equest to 'search/tweets
// via data.statuses obj, get request will return array of tweets
T.get('search/tweets', params, (err, data, response) => {
 // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the screen_name from the returned data
      let screen_name = data.statuses[i].user.screen_name;
      // THE FOLLOWING MAGIC GOES HERE
      T.post('friendships/create', {screen_name}, function(err, response){
        if(err){
          console.log(err);
        } else {
          console.log(screen_name, ': **FOLLOWED**');
        }
      });
    }
  } else {
    console.log(err);
  }
})
