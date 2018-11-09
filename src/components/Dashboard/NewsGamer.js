import React from 'react';

function NewsGamer(props) {
	return (
		<div className="module">
			<div className="moduleTitle">
				{props.user[0]['handle']}
				<br />
				lvl: {props.user[0]['lvl']}
				<br />
				{this.props.user[0]['role']}
			</div>

			<h4>
				{this.props.user[0]['profile'].map((elem) => (
					<div>
						{elem.toUpperCase()}
						<br />
					</div>
				))}
			</h4>
		</div>
	);
}

export default NewsGamer;
