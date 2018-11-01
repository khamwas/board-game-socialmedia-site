import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import './Dashboard.css';
import '../GameCard/GameCard.css';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			favGames: [],
			playedGames: [],
			suggestedGames: [],
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
		console.log(end);
		this.setState({ query: end }, () => this.updateSuggested());
	}

	updateSuggested() {
		axios
			.get(`/api/suggestions${this.state.query}`)
			.then((result) => this.setState({ suggestedGames: result.data }));
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
		// let info = this.state.currentUser.map((elem) => <h1>{elem.handle}</h1>);
		let profile = this.state.profile
			.filter((elem, i) => i < 3)
			.map((elem, i) => <div key={i}>{elem}</div>);

		let favGames = this.state.favGames.map((elem, i) => {
			if (i < 1) {
				return <GameCard key={elem.game_id} elem={elem} />;
			}
		});
		let playedGames = this.state.playedGames.map((elem, i) => {
			if (i < 1) {
				return <GameCard key={elem.game_id} elem={elem} />;
			}
		});
		let suggestedGames = this.state.suggestedGames.map((elem, i) => {
			if (i < 1) {
				return <GameCard key={elem.game_id} elem={elem} />;
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

		return (
			<div>
				{/* <div>Dashboard</div> */}
				<div className="dash">
					{/* <div className="info">
						<h1>{this.state.currentUser.handle}</h1>
						<h2>
							lvl: {this.state.currentUser.lvl}
							<br />
							ROLE: {this.state.currentUser.role}
						</h2>
						<h4>Profile</h4>
						<div className="profile">{profile}</div>
					</div> */}
					{/* <button onClick={() => console.log(this.state)}>CHECKER</button> */}
					<div className="module">
						Suggested
						{suggestedGames}
					</div>
					<div className="module">
						Favorites
						{favGames}
					</div>
					<div className="module">
						Played
						{playedGames}
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
