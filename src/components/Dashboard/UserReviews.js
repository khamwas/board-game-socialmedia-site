import React from 'react';
import GameReview from '../GameReview/GameReview';
import { connect } from 'react-redux';
import Dash from '../Dashboard/Dash';
import './Dashboard.css';
import '../GameCard/GameCard.css';

function UserReviews(props) {
	let reviews = props.userReviews.map((elem) => (
		<GameReview
			key={elem.review_id}
			getReviews={props.setUserReviews}
			elem={elem}
		/>
	));

	return (
		<div>
			<Dash match={props.match.path} />
			<div className="reviewScreen">{reviews}</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { games, userReviews } = state;
	return {
		games,
		userReviews
	};
}

export default connect(mapStateToProps)(UserReviews);
