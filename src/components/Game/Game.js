import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameRating from '../GameRating/GameRating';
import GameReview from '../GameReview/GameReview';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import './Game.css';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game: [],
			reviews: []
		};
	}

	componentDidMount() {
		this.setState(
			{
				game: this.props.games.filter(
					(elem) => elem.game_id === parseInt(this.props.match.params.id)
				)
			},
			() => this.getReviews()
		);
	}

	getReviews() {
		axios
			.get(`/api/game/reviews/${this.props.match.params.id}`)
			.then((result) => this.setState({ reviews: result.data }));
	}

	render() {
		if (this.props.user.length === 1) {
			var button = this.state.reviews.filter(
				(elem) => elem.gamer_id === this.props.user[0]['gamer_id']
			).length;
		}

		let game = this.state.game.map((elem) => (
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
						{button === 0 && <div className="reviewButton link">Review</div>}
					</div>
					<div>
						<div>Reviews: {elem.reviews}</div>
						<GameRating elem={elem} />
					</div>
				</div>
			</div>
		));

		let reviews = this.state.reviews.map((elem) => (
			<GameReview key={elem.review_id} elem={elem} />
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

export default connect(mapStateToProps)(Game);
