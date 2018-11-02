import React from 'react';
import StarRatings from 'react-star-ratings';

function GameReview(props) {
	return (
		<div>
			<h4>
				Fantasy
				<StarRatings
					rating={parseFloat(props.elem.fantasy)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Narrative
				<StarRatings
					rating={parseFloat(props.elem.narrative)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Challenge
				<StarRatings
					rating={parseFloat(props.elem.challenge)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Fellowship
				<StarRatings
					rating={parseFloat(props.elem.fellowship)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Expression
				<StarRatings
					rating={parseFloat(props.elem.expression)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Discovery
				<StarRatings
					rating={parseFloat(props.elem.discovery)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>

			<h4>
				Abnegation
				<StarRatings
					rating={parseFloat(props.elem.abnegation)}
					starRatedColor="rgb(43,65,98)"
					numberOfStars={5}
					name="Fantasy"
					starDimension="25px"
				/>
			</h4>
		</div>
	);
}

export default GameReview;
