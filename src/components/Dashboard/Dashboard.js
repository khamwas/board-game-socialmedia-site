import React, { Component } from 'react';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import GameReview from '../GameReview/GameReview';
import './Dashboard.css';
import '../GameCard/GameCard.css';
import {
	setUserReviews,
	setUserPlayed,
	setUserFavs,
	setUserSuggested
} from '../../redux/reducer';

class Dashboard extends Component {
	componentDidMount() {
		this.props.setUserReviews();
		this.props.setUserPlayed();
		this.props.setUserFavs();
		this.props.setUserSuggested(); // console.log(this.props);
	}
	render() {
		let favGames = this.props.userFavs.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});
		let playedGames = this.props.userPlayed.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});
		let suggestedGames = this.props.userSuggested.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});

		let reviews = this.props.userReviews.map((elem) => (
			<GameReview
				key={elem.review_id}
				getReviews={this.props.setUserReviews}
				elem={elem}
			/>
		));

		return (
			<div>
				{/* <div>Dashboard</div> */}
				<div className="dash">
					<div className="module">
						<div className="moduleTitle">Suggested</div>
						{suggestedGames}
					</div>
					<div className="module">
						<div className="moduleTitle">Favorites</div>
						{favGames}
					</div>
					<div className="module">
						<div className="moduleTitle">Played</div>
						{playedGames}
					</div>
					<div className="reviewModule">
						<div className="moduleTitle">Reviews</div>
						{reviews}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		games,
		user,
		userFavs,
		userPlayed,
		userReviews,
		userSuggested
	} = state;
	return {
		games,
		user,
		userFavs,
		userPlayed,
		userReviews,
		userSuggested
	};
}

export default connect(
	mapStateToProps,
	{ setUserReviews, setUserPlayed, setUserFavs, setUserSuggested }
)(Dashboard);
