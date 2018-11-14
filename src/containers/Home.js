//preact
import { h, Component } from 'preact';
// extends preact class: Component
import { Link } from 'preact-router';
import List from 'Root/components/List';
import { getContents } from 'Root/services/datalayer'; // services directory is anything that isnt UI
import { getImage } from 'Root/services/individual-image'; // services directory is anything that isnt UI
import { sortChrono } from 'Root/services/chronological-sorting'; // services directory is anything that isnt UI

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
			// order photos chronologically (still feels buggy)
			return sortChrono(items)
		})
		.then(function(items){
			console.log("second .then, items: ", items);
			let updatedItems = []
			items.forEach((item, index, array) => {

					updatedItems.push(new Promise((resolve, reject) => {
						console.log(index)
						getImage({"path": item.path_lower, "imageIndex": index})
						.then((thisItem) => {
							console.log(thisItem)
							// update array of items
							items[thisItem.imageIndex].link = thisItem.temp;
							items[thisItem.imageIndex].imageIndex = thisItem.imageIndex;

							resolve(items[thisItem.imageIndex])
						})
					}))
				})
			return Promise.all(updatedItems)
		})
		.then(items => this.setState({items}))
		console.log("componentWillMount, end")
	}

	renderItem(item){
		var link = "";
		if(item.link){ 
			link = item.link 
			console.log("rendered Item w/ updated link: ", item)
		}
			return (
				<div>
					<h1>{ item.name }</h1>
					<h2>{ item.date.month }/{ item.date.day }/{ item.date.year }</h2>
					<h2>{ item.date.time }</h2>
					<h2>{ item.date.general }</h2>
					<img src={ link } />
					<hr /><br />
				</div>
			);
	}

	render({}, {items}){
		console.log("********\nRENDERING!\n********")
		return (

			<div>Homepage
				<h1>{items.length}</h1>
				<List items={items} renderItem={this.renderItem.bind(this)} />
			</div>

		)
	}
}