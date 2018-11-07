import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setGames } from '../../redux/reducer';
import GameCard from '../GameCard/GameCard';
import Icon from '../Icon/Icon';
import './AllGames.css';

class AllGames extends Component {
	constructor(props) {
		super(props);
		this.state = {
			games: [],
			selector: [
				'fantasy',
				'narrative',
				'challenge',
				'sensory',
				'fellowship',
				'expression',
				'discovery',
				'abnegation'
			],
			filterArray: [],
			holder: '/api/games',
			currentHolder: ''
		};
	}

	updateHolder() {
		var end = '';
		for (let i = 0; i < this.state.filterArray.length; i++) {
			if (i === 0) {
				end += `?x=${this.state.filterArray[i]}`;
			} else {
				end += `&x=${this.state.filterArray[i]}`;
			}
		}
		this.setState({ currentHolder: end }, () => this.updateGames());
	}

	updateFilter(str) {
		if (this.state.filterArray.join('').includes(str)) {
			let temp = this.state.filterArray.slice();
			let index = this.state.filterArray.findIndex((elem) => elem === str);
			temp.splice(index, 1);
			this.setState({ filterArray: temp }, () => this.updateHolder());
		} else {
			let temp = this.state.filterArray.slice();
			temp.push(str);
			this.setState({ filterArray: temp }, () => this.updateHolder());
		}
	}

	updateGames() {
		this.state.currentHolder
			? axios
					.get(this.state.holder + this.state.currentHolder)
					.then((response) =>
						this.setState({ games: response.data }, () =>
							this.props.setGames(this.state.games)
						)
					)
			: axios
					.get(this.state.holder)
					.then((response) =>
						this.setState({ games: response.data }, () =>
							this.props.setGames(this.state.games)
						)
					);
	}

	setProfile() {
		if (this.props.user[0]) {
			this.setState(
				{ selector: this.props.user[0]['profile'].slice() },
				this.setState({
					filterArray: this.props.user[0]['profile'].slice(0, 3)
				})
			);
		}
	}

	componentDidMount() {
		this.updateGames(this.state.holder, this.state.currentHolder);
		this.setProfile();
		if (this.props.user[0]) {
			this.setState({ filterArray: this.props.user[0]['profile'].slice(0, 3) });
		}
	}

	render() {
		let selected = this.state.filterArray.map((elem, i) => (
			<h4 className="onFilter" key={i}>
				{i + 1}. {elem.toUpperCase()}
			</h4>
		));
		let selector = this.state.selector.map((elem, i) => (
			<div
				key={i}
				onClick={() => this.updateFilter(elem)}
				className={
					this.state.filterArray
						.slice()
						.join('')
						.includes(elem)
						? 'selected clicker'
						: 'clicker'
				}
			>
				<Icon elem={elem} />
				<div className="subHeader">
					{elem.charAt(0).toUpperCase() + elem.slice(1)}
				</div>
			</div>
		));

		let display = this.state.games.map((elem) => (
			<GameCard key={elem.game_id} elem={elem} />
		));
		return (
			<div>
				{/* <Icon /> */}
				<div className="selector">{selector}</div>
				<div className="searchBar">{selected}</div>
				<div className="gameScreen">{display}</div>
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
	{ setGames }
)(AllGames);
