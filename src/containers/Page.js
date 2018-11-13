mport { h, Component } from 'preact';
import { Link } from 'preact-router';
var slugify = require('slugify');
//import { getContents } from 'Root/services/getpost';



export default class Page extends Component {

	componentWillMount(props, state) {
		//prior to loading the post
	//	const testing = getContents(this.props.path )
		console.log("props: ", this.props)
	}

	render(props, state){
		return (

			<div>{ props }</div>

		)
	}
}