import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import GameReview from '../GameReview/GameReview';
import './Dashboard.css';
import '../GameCard/GameCard.css';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			favGames: [],
			playedGames: [],
			suggestedGames: [],
			reviews: [],
			currentUser: {},
			profile: [],
			query: ''
		};
	}

	updateQuery() {
		// debugger;
		var end = '';
		for (let i = 0; i < this.state.profile.length; i++) {
			if (i === 0) {
				end += `?x=${this.state.profile[i]}`;
			} else {
				end += `&x=${this.state.profile[i]}`;
			}
		}
		// console.log(end);
		this.setState({ query: end }, () => this.updateSuggested());
	}

	updateSuggested() {
		axios
			.get(`/api/suggestions${this.state.query}`)
			.then((result) =>
				this.setState({ suggestedGames: result.data }, () =>
					this.updateReviews()
				)
			);
	}
	updateReviews() {
		axios
			.get(`/api/gamer/reviews/1`)
			.then((result) => this.setState({ reviews: result.data }));
	}

	userMapper() {
		let arr = [];
		let obj = Object.assign({}, this.state.currentUser);
		for (let i = 0; i < 15; i++) {
			for (let x in obj) {
				if (obj[x] === i && x !== 'lvl' && x !== 'gamer_id') {
					arr.push(x);
				}
			}
		}
		this.setState({ profile: arr }, () => this.updateQuery());
	}

	componentDidMount() {
		// console.log(this.props);
		axios
			.get('/api/gamer/2')
			.then((response) =>
				this.setState({ currentUser: response.data[0] }, () =>
					this.userMapper()
				)
			);
		axios
			.get('/api/favorites/2')
			.then((response) => this.setState({ favGames: response.data }));
		axios
			.get('/api/played/2')
			.then((response) => this.setState({ playedGames: response.data }));
	}
	render() {
		let favGames = this.state.favGames.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});
		let playedGames = this.state.playedGames.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});
		let suggestedGames = this.state.suggestedGames.map((elem, i) => {
			if (i < 5) {
				return <GameCard key={elem.game_id} elem={elem} />;
			} else {
				return null;
			}
		});
		// let info = [];
		// for (let i = 0; i < 15; i++) {
		// 	for (let x in this.state.currentUser) {
		// 		if (
		// 			this.state.currentUser[x] === i &&
		// 			x !== 'lvl' &&
		// 			x !== 'gamer_id'
		// 		) {
		// 			info.push(`${x}: ${this.state.currentUser[x]}`);
		// 		}
		// 	}
		// }
		// let view = info.map((elem) => <h1>{elem}</h1>);

		let reviews = this.state.reviews.map((elem) => (
			<GameReview key={elem.review_id} elem={elem} />
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
	const { games } = state;
	return {
		games
	};
}

export default connect(mapStateToProps)(Dashboard);
