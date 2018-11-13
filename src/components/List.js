import { h } from 'preact';

export default ({items, renderItem}) => (

	<ul>
		{items.map(item => (
			<li>
				{renderItem(item)}
			</li>
		))}
	</ul>

);