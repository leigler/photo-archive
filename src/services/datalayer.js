import token from 'Root/services/token.json';

var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });
import { getMoreContents } from 'Root/services/pagination'; // services directory is anything that isnt UI


export const getContents = text => dbx.filesListFolder({path: '/iphone-photos'})
  .then(function(response) {
    console.log(response.entries);
    
    if(response.has_more){
      
      return getMoreContents({
        "existing_entries" : response.entries,
        "cursor" : response.cursor
      })

    }else{
      return { "entries" : response.entries };
    }
  })
  .catch(function(error) {
    console.log(error);
  });


/*

	- get the paths to everything inside iphone-photos
	- use the paths to produce a temporary url
	- output that url for 

  20140502
  20140508

*/