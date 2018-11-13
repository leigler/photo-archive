import token from 'Root/services/token.json';
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });


export const getImage = imagePath => dbx.filesGetTemporaryLink({"path": imagePath[0]})
  .then(function(response) {
  	console.log("response", response)

  	return [response.link, imagePath[1]]

  	// return {
  	// 				"link" : response.link, 
  	// 				"name" : response.metadata.name,
  	// 				"modified" : response.metadata.client_modified 
  	// 			}

  })
  .catch(function(error) {
    console.log(error);
  });
