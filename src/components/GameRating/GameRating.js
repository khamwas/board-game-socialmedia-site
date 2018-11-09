import React from 'react';
import StarRatings from 'react-star-ratings';

function GameReview(props) {
	let review = [];
	for (var x in props.elem) {
		if (
			props.elem[x] !== null &&
			(x === 'sensory' ||
				x === 'fantasy' ||
				x === 'narrative' ||
				x === 'challenge' ||
				x === 'fellowship' ||
				x === 'discovery' ||
				x === 'expression' ||
				x === 'abnegation')
		)
			review.push(
				<h4 key={x + props.elem[x]}>
					{x}
					<StarRatings
						rating={parseFloat(props.elem[x])}
						starRatedColor="rgb(43,65,98)"
						numberOfStars={5}
						name={x}
						starDimension="25px"
					/>
				</h4>
			);
	}
	return <div>{review}</div>;
	// return (
	// 	<div>
	// 		<h4>
	// 			Fantasy
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.fantasy)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Narrative
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.narrative)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Challenge
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.challenge)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Fellowship
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.fellowship)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Expression
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.expression)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Discovery
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.discovery)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>

	// 		<h4>
	// 			Abnegation
	// 			<StarRatings
	// 				rating={parseFloat(props.elem.abnegation)}
	// 				starRatedColor="rgb(43,65,98)"
	// 				numberOfStars={5}
	// 				name="Fantasy"
	// 				starDimension="25px"
	// 			/>
	// 		</h4>
	// 	</div>
	// );
}

export default GameReview;
