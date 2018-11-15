import token from 'Root/services/token.json';
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: token.token, fetch: fetch });

export const getImageMetadata = imageInfo => dbx.filesGetMetadata({"path": imageInfo.imageId, "include_media_info" : true})
	.then(function(response){

		console.log("metadataresponse", response)

		return {
			"imageIndex" : imageInfo.imageIndex,
			"imageMetaData" : response
		}

	})
  .catch(function(error) {
	  console.log(error);
  });
