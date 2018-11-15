import token from 'Root/services/token.json';
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });


export const getImage = imageInfo => dbx.filesGetTemporaryLink({"path": imageInfo.path})
  .then(function(response) {
  	console.log("response: ", imageInfo.imageIndex, response)

  	return {
      "temp": response.link, 
      "imageIndex" : imageInfo.imageIndex
    }

  })
  .catch(function(error) {
    console.log(error);
  });
