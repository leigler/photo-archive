import token from 'Root/services/token.json';

var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });

export const getMoreContents = submitted => dbx.filesListFolderContinue({cursor: submitted.cursor})
  .then(function(response) {
    
    var allEntries = submitted.existing_entries;
    allEntries = allEntries.concat(response.entries);

    if(response.has_more){
      // essentially recursive

      getMoreContents({
        "existing_entries" : allEntries,
        "cursor" : response.cursor
      })

    }else{
      return {
        "entries" : allEntries
      }
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