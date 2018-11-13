//preact
import { h, Component } from 'preact';
// extends preact class: Component
import { Link } from 'preact-router';
import List from 'Root/components/List';
import { getContents } from 'Root/services/datalayer'; // services directory is anything that isnt UI
import { getImage } from 'Root/services/individual-image'; // services directory is anything that isnt UI



export default class Home extends Component {

	// helpful for passing properties to route
	constructor(props){
		console.log("constructor")
		super(props);

		this.state = {
			items: [{"name" : "loading"}]
		}		
		console.log("constructor, after empty state.items")
	}


	componentWillMount(){

		console.log("componentWillMount")
		
		getContents()
		.then(items => this.setState({ items }));
		
		console.log("componentWillMount, end")
	}

	componentDidMount(){
		console.log("componentDidMount", this.items.length)


		for (var i = 0; i < this.items.length; i++) {
			console.log(this.items[i].path_lower)
			getImage([this.items[i].path_lower, i])
			.then(function(results){

				console.log("componentDidMount results: ", results)

				items[results[1]].link = results[0];
				items => this.setState({ items });
			})
			
			//.then(function(result){
				//items => this.setState({ link : result})
			//});
		}

		//console.log("we got this far: ", result)
	}

	renderItem(item){
		// here you would format the item that is placed into the List
		//var slug = slugify(item.title, {replacement: "_", lower: true})

		if(item.link){
			return (
				<div>
					<h1>{item.name}</h1>
					<img src={item.link} />
					<hr /><br />
				</div>
			);
		}else{
			return (
				<div>
					<h1>{item.name}</h1>
					<hr /><br />
				</div>
			);
		}
	}

	render({}, {items}){
		console.log("rendering!")
		return (

			<div>Homepage
				<List items={items} renderItem={this.renderItem.bind(this)} />
			</div>

		)
	}
}