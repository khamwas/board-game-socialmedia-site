import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GameCard from '../GameCard/GameCard';
import NewGame from '../NewGame/NewGame';
import axios from 'axios';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			users: [],
			modal: false,
			gameSearch: true
		};
		this.modalChanger = this.modalChanger.bind(this);
	}
	componentDidMount() {
		axios
			.get('/api/users')
			.then((result) => this.setState({ users: result.data }));
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	searchChanger() {
		this.setState({ gameSearch: !this.state.gameSearch });
	}
	modalChanger() {
		this.setState({ modal: !this.state.modal });
	}

	render() {
		let gamers = this.state.users
			.filter(
				(gamer) =>
					gamer.handle
						.toUpperCase()
						.includes(this.state.search.toUpperCase()) ||
					gamer.email.toUpperCase().includes(this.state.search.toUpperCase())
			)
			.map((elem, i) => (
				<div key={elem + i}>
					<Link to={`/gamer/${elem.gamer_id}`}>
						<h2>{elem.handle}</h2>
					</Link>
					<br />
				</div>
			));
		let display = this.props.games
			.filter(
				(game) =>
					game.title.toUpperCase().includes(this.state.search.toUpperCase()) ||
					game.description
						.toUpperCase()
						.includes(this.state.search.toUpperCase())
			)
			.map((elem) => <GameCard key={elem.game_id} elem={elem} />);
		return (
			<div>
				{this.state.modal && <NewGame modalChanger={this.modalChanger} />}
				<div>Search</div>
				<input
					value={this.state.search}
					onChange={(e) => this.changeHandler(e, 'search')}
				/>
				<button className="noStars" onClick={() => this.searchChanger()}>
					{this.state.gameSearch ? 'Search Gamers' : 'Search Games'}
				</button>
				{this.state.gameSearch ? (
					<div className="gameScreen">
						{display}
						{this.props.user.length === 1 && (
							<button className="noStars" onClick={() => this.modalChanger()}>
								Add Game
							</button>
						)}
					</div>
				) : (
					<div>{gamers}</div>
				)}
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

export default connect(mapStateToProps)(Search);
