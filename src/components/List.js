import { h } from 'preact';

export default ({years, renderItem}) => (

	<div>
		<h1>{years.year}</h1>
		<ul>
			{years.entries.map(item => (
				<li>
					{renderItem(item)}
				</li>
			))}
		</ul>
	</div>

);