import React from 'react';
import GameCard from '../GameCard/GameCard';
import GameReview from '../GameReview/GameReview';

function NewsCard(props) {
	if (props.elem.email) {
		let profile = [];
		let obj = Object.assign({}, props.elem);
		for (let i = 0; i < 15; i++) {
			for (let x in obj) {
				if (parseInt(obj[x]) === i && x !== 'lvl' && x !== 'gamer_id') {
					profile.push(x.toUpperCase(), <br />);
				}
			}
		}
		console.log(profile);
		return (
			<div className="module">
				<div className="moduleTitle">
					{props.elem['handle']}
					<br />
					lvl: {props.elem['lvl']}
					<br />
					{props.elem['role']}
				</div>

				<h4>{profile}</h4>
			</div>
		);
	} else if (props.elem.description) {
		return <GameCard elem={props.elem} />;
	} else if (props.elem.review_id) {
		return <GameReview match={props.match} elem={props.elem} />;
	} else {
		return <div>Nothing</div>;
	}
}

export default NewsCard;
