import token from 'Root/services/token.json';

var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });

export const getContents = text => dbx.filesListFolder({path: '/iphone-photos'})
  .then(function(response) {
    console.log(response.entries);
    return response.entries;

  })
  .catch(function(error) {
    console.log(error);
  });


/*

	- get the paths to everything inside iphone-photos
	- use the paths to produce a temporary url
	- output that url for 


*/