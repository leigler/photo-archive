//preact
import { h, Component } from 'preact';
// extends preact class: Component
import { Link } from 'preact-router';
import List from 'Root/components/List';
// dropbox
import { getContents } from 'Root/services/datalayer'; // services directory is anything that isnt UI
import { getImage } from 'Root/services/individual-image'; // services directory is anything that isnt UI
import { sortChrono } from 'Root/services/chronological-sorting'; // services directory is anything that isnt UI
import { getImageMetadata } from 'Root/services/image-metadata'; // services directory is anything that isnt UI


export default class Home extends Component {

	constructor(props){
		console.log("constructor")
		super(props);

		this.state = {
									items: [
													{
														"name" : "loading",
														"date" : {
																"general" : "",
																"integer" : "",
																"year" : "year",
																"month" : "month",
																"day" : "day",
																"time" : "time"
															}
													}
												 ],
									years : [
														{
															year: "0000",
															entries : [
																{
																	"name" : "loading",
																	"date" : {
																			"general" : "",
																			"integer" : "",
																			"year" : "year",
																			"month" : "month",
																			"day" : "day",
																			"time" : "time"
																		}
																}
															]
														}
													]
								}

		console.log("constructor, after empty state.items")
	};

	componentWillMount(props){
		console.log("componentWillMount")
		
		getContents()
		.then(function(items){ 
			console.log("first .then, items: ", items.entries);
			return items.entries;
		})
		.then(function(items){
			console.log("call for metadata submitted: ")
			// get metadata for each image
			let updatedItems = []
			items.forEach((item, index, array) => {
					if(index < 100){
						updatedItems.push(new Promise((resolve, reject) => {
							//console.log(index)
							getImageMetadata({"imageIndex": index, "imageId" : item.id})
							.then((thisItem) => {
								console.log(thisItem)
								// update array of items timestamp
								items[thisItem.imageIndex].imageMetaData = thisItem.imageMetaData;

								resolve(items[thisItem.imageIndex])
							})
						}))
					}
				})
			return Promise.all(updatedItems)
		})
		.then(function(items){
			console.log("sorting all the items based off of their file's metadata")
			return sortChrono(items)
		})
		.then(function(items){
			console.log("sorting items into their years")

			var entriesByYear = [];

			var addYear = function(thisYear){
				var newYear = {
					year: thisYear,
					entries:[]
				}
				entriesByYear.push(newYear)
			}

			var addEntry = function(thisItem, i){
				entriesByYear[i].entries.push(thisItem)
			}

			items.forEach((item, index, array) => {

				var itemYear = item.date.year;

				if(entriesByYear.length > 0){
					console.log("array entriesByYear exists")
					for (var i = 0; i < entriesByYear.length; i++) {
						console.log("looping through year array", i, entriesByYear[i].year)
						
						if(entriesByYear[i].year == itemYear){
							// if year exists/matches
							console.log("year exists/matches,\nadding entry")
							addEntry(item, i);
							return; // end for loop
						}else if(i + 1 == entriesByYear.length){
							// if last item
							console.log("last item and no year match,\n adding year\nadding entry")
							addYear(itemYear);
							addEntry(item, i);
						}
					}
				}else{ // if years has no length
					console.log("year doesnt exist, create new year and add entry")
					addYear(itemYear);
					addEntry(item, 0);
				}
				console.log("finished adding entries")
			})

			var updatedState = {
				items: items,
				years: entriesByYear
			}

			console.log("updated State: ", updatedState)

			return updatedState;
		})
		.then(items => this.setState({ items }))
		console.log("componentWillMount, end")
		console.log("the state: ", this.state)
	}

	renderItem(item){
		//var link = "";
		//if(item.link){ 
			//link = item.link 
			//console.log("rendered Item w/ updated link: ", item)
		//}
		console.log("rendering item", item)
		
			return (
				<div>
					<h1>{ item.name }</h1>
					<h2>{ item.date.month }/{ item.date.day }/{ item.date.year }</h2>
					<h2>{ item.date.time }</h2>
					<h2>{ item.date.general }</h2>
					<hr /><br />
				</div>
			);
	}

	render({}, {years}){
		console.log("********\nRENDERING!\n********", years)
		return (

			<div>
				<h1>{years.length}</h1>
				<List years={years} renderItem={this.renderItem.bind(this)} />
			</div>

		)
	}
}


	/*

		// get actual image (needs to be put into onclick function w/ custom url)
		.then(function(items){
				console.log("second .then, items: ", items);
				let updatedItems = []
				items.forEach((item, index, array) => {

						updatedItems.push(new Promise((resolve, reject) => {
							//console.log(index)
							getImage({"path": item.path_lower, "imageIndex": index, "imageId" : item.id})
							.then((thisItem) => {
								console.log(thisItem)
								// update array of items
								items[thisItem.imageIndex].link = thisItem.temp;
								items[thisItem.imageIndex].imageIndex = thisItem.imageIndex;
								//items[thisItem.imageIndex].imageMetaData = thisItem.imageMetaData;

								resolve(items[thisItem.imageIndex])
							})
						}))
					})
				return Promise.all(updatedItems)
			})



	*/
