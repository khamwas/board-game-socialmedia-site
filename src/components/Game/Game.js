import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameRating from '../GameRating/GameRating';
import NewReview from '../NewReview/NewReview';
import GameReview from '../GameReview/GameReview';
import StarRatings from 'react-star-ratings';
import { getGames } from '../../redux/reducer';
import axios from 'axios';
import './Game.css';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game: [],
			reviews: [],
			newReview: false
		};
		this.getReviews = this.getReviews.bind(this);
		this.newReviewStatus = this.newReviewStatus.bind(this);
	}

	componentDidMount() {
		this.setGame();
	}

	setGame() {
		this.setState(
			{
				game: this.props.games.filter(
					(elem) => elem.game_id === parseInt(this.props.match.params.id)
				)
			},
			() => this.getReviews(this.props.match.params.id)
		);
	}

	newReviewStatus() {
		this.setState({ newReview: !this.state.newReview });
	}

	getReviews(id) {
		axios
			.get(`/api/game/reviews/${id}`)
			.then((result) =>
				this.setState({ reviews: result.data }, () => this.props.getGames())
			);
	}

	render() {
		if (this.props.user.length === 1) {
			var button = this.state.reviews.filter(
				(elem) => elem.gamer_id === this.props.user[0]['gamer_id']
			).length;
		}

		let game = this.props.games
			.filter((elem) => elem.game_id === parseInt(this.props.match.params.id))
			.map((elem) => (
				<div className="gameInfo" key={elem.game_id}>
					<h1>{elem.title.charAt(0).toUpperCase() + elem.title.slice(1)}</h1>
					<img className="gameImg" alt={elem.title} src={elem.img} />
					<div className="littleInfo">
						<div className="leftInfo">
							<h2>Age: {elem.age}+</h2>
							<h2>Set up: {parseInt(elem.set_up * 60)} mins</h2>
							<h2>Play Time: {elem.play_time} hrs</h2>
							<h2>
								For {elem.min_players} to {elem.max_players} players
							</h2>
							<h2>
								Rules
								{'  '}
								<StarRatings
									rating={elem.rules}
									starRatedColor="rgb(109,122,130)"
									numberOfStars={5}
									starDimension="25px"
								/>
							</h2>
							{button === 0 && (
								<button
									onClick={() => this.newReviewStatus()}
									className="reviewButton link"
								>
									Review
								</button>
							)}
							{this.state.newReview ? (
								<div>
									<NewReview
										game={this.state.game}
										newReviewStatus={this.newReviewStatus}
										getReviews={this.getReviews}
										game_id={this.props.match.params.id}
									/>
								</div>
							) : null}
						</div>
						<div>
							<div>Reviews: {elem.reviews}</div>
							<GameRating elem={elem} />
						</div>
					</div>
				</div>
			));

		let reviews = this.state.reviews.map((elem) => (
			<GameReview
				key={elem.review_id}
				elem={elem}
				getReviews={this.getReviews}
			/>
		));
		return (
			<div className="game">
				{game}
				<div className="gameReviews">{reviews}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { games, user } = state;
	return {
		games,
		user
	};
}

export default connect(
	mapStateToProps,
	{ getGames }
)(Game);
