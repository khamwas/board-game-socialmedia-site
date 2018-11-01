import React from 'react';
import './GameCard.css';

function GameCard(props) {
	return (
		<div key={props.elem.game_id} className="gameCardContainer">
			<img
				className="gameScrollImg"
				src={props.elem.img}
				alt={props.elem.title}
			/>
			<div className="line" />
			<div className="cardBottom">
				<div>{props.elem.title.toUpperCase()}</div>
				<div>
					{props.elem.reviews ? props.elem.reviews : 0} Review
					{parseInt(props.elem.reviews) !== 1 ? 's' : null}
				</div>
			</div>
		</div>
	);
}

export default GameCard;
