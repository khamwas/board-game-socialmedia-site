import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GameReview from '../GameReview/GameReview';
import GamerDash from './GamerDash';

class Gamer extends Component {
	constructor() {
		super();
		this.state = {
			gamer: [],
			favoriteGames: [],
			playedGames: [],
			reviews: [],
			profile: []
		};
	}

	componentDidMount() {
		this.setGamer();
		if (this.props.user.length === 1) {
			this.setBothFavs();
			this.setBothReviews();
			this.setBothPlayed();
		} else {
			this.setFavs();
			this.setReviews();
			this.setPlayed();
		}
	}

	setGamer() {
		axios
			.get(`/api/gamer/${this.props.match.params.id}`)
			.then((result) => this.setState({ gamer: result.data }));
	}
	setReviews() {
		axios
			.get(`/api/gamer/reviews/${this.props.match.params.id}`)
			.then((result) => this.setState({ reviews: result.data }));
	}
	setFavs() {
		axios
			.get(`/api/favorites/${this.props.match.params.id}`)
			.then((result) => this.setState({ favoriteGames: result.data }));
	}
	setPlayed() {
		axios
			.get(`/api/played/${this.props.match.params.id}`)
			.then((result) => this.setState({ playedGames: result.data }));
	}

	setBothReviews() {
		axios
			.get(`/api/both/reviews/${this.props.match.params.id}`)
			.then((result) => this.setState({ reviews: result.data }));
	}
	setBothFavs() {
		axios
			.get(`/api/both/favorites/${this.props.match.params.id}`)
			.then((result) => this.setState({ favoriteGames: result.data }));
	}
	setBothPlayed() {
		axios
			.get(`/api/both/played/${this.props.match.params.id}`)
			.then((result) => this.setState({ playedGames: result.data }));
	}

	// setProfile() {
	// 	let obj = Object.assign({}, this.state.gamer[0]);
	// 	let arr = [];
	// 	for (let i = 0; i < 15; i++) {
	// 		for (let x in obj) {
	// 			if (obj[x] === i && x !== 'lvl' && x !== 'gamer_id') {
	// 				arr.push(x);
	// 			}
	// 		}
	// 	}
	// 	this.setState({ profile: arr });
	// }

	render() {
		let favGames = this.state.favoriteGames.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem + i} elem={elem} />;
			} else {
				return null;
			}
		});
		let playedGames = this.state.playedGames.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem + i} elem={elem} />;
			} else {
				return null;
			}
		});
		// let suggestedGames = this.props.userSuggested.map((elem, i) => {
		// 	if (i < 5) {
		// 		return <GameCard key={elem.game_id} elem={elem} />;
		// 	} else {
		// 		return null;
		// 	}
		// });

		let reviews = this.state.reviews.map((elem, i) => (
			<GameReview
				key={elem + i}
				getReviews={this.props.setUserReviews}
				elem={elem}
			/>
		));
		// let profile = this.state.profile.map((elem) => <h4>{elem}</h4>);
		let profile = [];
		let obj = Object.assign({}, this.state.gamer[0]);
		for (let i = 0; i < 15; i++) {
			for (let x in obj) {
				if (obj[x] === i && x !== 'lvl' && x !== 'gamer_id') {
					profile.push(x.toUpperCase(), <br key={x + i} />);
				}
			}
		}

		return (
			<div>
				<GamerDash match={this.props.match} />
				<div className="dash">
					{/* <div className="module">
						<Link to="/dashboard/suggested">
							<div className="moduleTitle">Suggested</div>
						</Link>
						{suggestedGames}
					</div> */}
					<div className="module">
						{this.state.gamer.length === 1 ? (
							<div className="moduleTitle">
								{this.state.gamer[0]['handle']}
								<br />
								lvl: {this.state.gamer[0]['lvl']}
								<br />
								{this.state.gamer[0]['role']}
							</div>
						) : null}
						<h4>{profile}</h4>
					</div>
					{this.props.user.length === 1 ? (
						<div className="module">
							<div className="moduleTitle">
								{this.props.user[0]['handle']}
								<br />
								lvl: {this.props.user[0]['lvl']}
								<br />
								{this.props.user[0]['role']}
							</div>

							<h4>
								{this.props.user[0]['profile'].map((elem, i) => (
									<div key={elem + i}>
										{elem.toUpperCase()}
										<br />
									</div>
								))}
							</h4>
						</div>
					) : null}
					<div className="module">
						<Link to="/dashboard/favorites">
							<div className="moduleTitle">
								{this.props.user.length === 1 ? 'Shared Favs' : 'Favorites'}
							</div>
						</Link>
						{favGames}
					</div>
					<div className="module">
						<Link to="/dashboard/played">
							<div className="moduleTitle">
								{this.props.user.length === 1 ? 'Both Played' : 'Played'}
							</div>
						</Link>
						{playedGames}
					</div>
					<div className="reviewModule">
						<Link to="/dashboard/reviews">
							<div className="moduleTitle">Reviews</div>
						</Link>
						{reviews}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Gamer);
