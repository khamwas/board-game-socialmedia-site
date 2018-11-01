import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getGames, updateFilter } from '../../redux/reducer';
import GameCard from '../GameCard/GameCard';
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
		// debugger;
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
		// debugger;
		if (this.state.filterArray.join('').includes(str)) {
			// this.removeFromFilter(str);
			let temp = this.state.filterArray.slice();
			let index = this.state.filterArray.findIndex((elem) => elem === str);
			temp.splice(index, 1);
			this.setState({ filterArray: temp }, () => this.updateHolder());
		} else {
			// this.addToFilter(str);
			let temp = this.state.filterArray.slice();
			temp.push(str);
			this.setState({ filterArray: temp }, () => this.updateHolder());
		}
	}

	updateGames() {
		// this.updateHolder();
		this.state.currentHolder
			? axios
					.get(this.state.holder + this.state.currentHolder)
					.then((response) => this.setState({ games: response.data }))
			: axios
					.get(this.state.holder)
					.then((response) => this.setState({ games: response.data }));
	}

	componentDidMount() {
		this.props.getGames(this.props.holder, this.props.currentHolder);
		this.updateGames(this.state.holder, this.state.currentHolder);
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
						? 'selected'
						: null
				}
			>
				{elem.charAt(0).toUpperCase() + elem.slice(1)}
			</div>
		));

		let display = this.state.games.map((elem) => (
			<GameCard key={elem.game_id} elem={elem} />
		));
		return (
			<div>
				<div className="selector">{selector}</div>
				<div className="searchBar">{selected}</div>
				<div className="gameScreen">{display}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { games2, filterArray, holder, currentHolder } = state;
	return {
		games2,
		filterArray,
		holder,
		currentHolder
	};
}

export default connect(
	mapStateToProps,
	{ getGames, updateFilter }
)(AllGames);
