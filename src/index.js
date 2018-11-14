//containers have routes inside
import { h, render } from 'preact';
import Application from 'Root/components/Application';

import { getContents } from 'Root/services/datalayer'; // services directory is anything that isnt UI

//const results = getContents(); //gets notices from json
const results = []; // start out empty
	
	//console.log(results)

render(<Application allPages={ results } />, document.getElementById('root'));