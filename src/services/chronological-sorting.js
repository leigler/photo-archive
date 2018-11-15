import { h } from 'preact';

export const sortChrono = items => {
	let chronoItems = []
	items.forEach((item, index, array) => {

		console.log("item\n", item)

		if(item[".tag"] != "folder"){
			
			var itemMod = item.client_modified;
			
			if(item.imageMetaData && item.imageMetaData.media_info && item.imageMetaData.media_info.metadata && item.imageMetaData.media_info.metadata.time_taken){
				itemMod = item.imageMetaData.media_info.metadata.time_taken
			}

			
			var	itemDate = itemMod.substring(0, 10),
					itemTime = itemMod.substring(11, 18),
					itemDateArray = itemDate.split("-"),
					itemInteger = "" + itemDateArray[0] + itemDateArray[1] + itemDateArray[2];

			itemInteger = parseInt(itemInteger, 10);
			console.log("\n", item.name, "\n", itemInteger);
			item.date = {
										"general" : itemDate,
										"integer" : itemInteger,
										"year" : itemDateArray[0],
										"month" : itemDateArray[1],
										"day" : itemDateArray[2],
										"time" : itemTime
									}

			chronoItems.push(item)
		}
	})

	chronoItems.sort(function(a, b){
		var dateA = a.date.integer, 
				dateB = b.date.integer
    return dateA - dateB 
	})

	return chronoItems
	// initial format: 2015-03-05T21:09:55Z
}