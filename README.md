# Photo Archive (Tome Generator)
web-to-print booklet of archived iPhone photos, by year

## To Do
- [x] build in recursive loading of all photos
- [ ] build in image sorting script (by year)
	- [x] sort images to appear chronologically
	- [ ] use EXIF data to sort rather than dropbox upload date
		- maybe use [node-exif](https://www.npmjs.com/package/exif)
	- ~~alternate: group photos by folder manually~~
- [ ] build in bindery design
	- [ ] rotate images if they are landscape
	- [ ] divide bindery book by year

## Interface Flow
- home page gets full contents of dropbox folder, produces buttons that show year and image amount
- button click 
	- sends request to get temporary links for respective year, scaling down the total amount of requests needed
	- generates year booklet 

## Build Resources

- [Preact](https://preactjs.com) (with a babel webpack build)
- [Bindery js](https://evanbrooks.info/bindery/)
- [Dropbox API](https://github.com/dropbox/dropbox-sdk-js)