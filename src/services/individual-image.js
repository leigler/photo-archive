import token from 'Root/services/token.json';
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });


export const getImage = imagePath => dbx.filesGetTemporaryLink({"path": imagePath.path})
  .then(function(response) {
  	console.log("response: ", imagePath.imageIndex, response)

  	return {
      "temp": response.link, 
      "imageIndex" : imagePath.imageIndex
    }

  })
  .catch(function(error) {
    console.log(error);
  });
