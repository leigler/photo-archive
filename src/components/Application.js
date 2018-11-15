import { h, Component } from 'preact';
import Router from 'preact-router'; // import Router (url handling) from preact-router module
import Match from 'preact-router/match';
import Header from 'Root/components/Header'; // import Header (i.e. nav) template
import Home from 'Root/containers/Home'; // post template
//import Page from 'Root/containers/Page'; // post template

var slugify = require('slugify');

// the syntax in this app is babel's es2015(6?). 
// Home and About call their views (i.e. they are containers) and define the route that is used when they called upon
// <Router> is imported from preact-router and handles the views

export default class Application extends Component {

	componentWillMount(props, state) {
		console.log("test", this.props.allPages)
		//console.log("state: ", this.state)
	}

	render(props, state){
		//console.log("here are the props in application.js: ", props)
		// path is passed as a usual prop (same as postcontent and result)
		return(
			<div>
				<Header />
				<Router>
					<Home path='/' props={this.props.allPages} />
				</Router>
			</div>
		)
	}
};

// <Post path="/:path/:view?" postcontent={ props } />
// <Post path="/:path/" postcontent={ props.allPosts } />

/*
	probably want to be able to put in the year i.e. 
//<Page path='/:year' props={this.props.allPages} />
	/2016
	/2017
	/2018

	etc to get the contents

*/