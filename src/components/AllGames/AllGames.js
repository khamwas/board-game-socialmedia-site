import React, { Component } from 'react';
import axios from 'axios';
import './AllGames.css';

class AllGames extends Component {
	constructor() {
		super();
		this.state = {
			games: [],
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
		this.setState({ currentHolder: end });
		console.log(this.state.holder + this.state.currentHolder);
	}

	updateFilter(str) {
		// debugger;
		if (this.state.filterArray.join('').includes(str)) {
			this.removeFromFilter(str);
		} else {
			this.addToFilter(str);
		}
	}

	addToFilter(str) {
		let temp = this.state.filterArray.slice();
		temp.push(str);
		this.setState({ filterArray: temp }, () => this.updateHolder());
		// this.updateHolder();
	}

	removeFromFilter(str) {
		let temp = this.state.filterArray.slice();
		let index = this.state.filterArray.findIndex((elem) => elem === str);
		temp.splice(index, 1);
		this.setState({ filterArray: temp }, () => this.updateHolder());
		// this.updateHolder();
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
		console.log(this.state.currentHolder);
		this.updateGames();
	}

	render() {
		let display = this.state.games.map((elem) => {
			return (
				<div key={elem.game_id} className="gameCardContainer">
					<img className="gameScrollImg" src={elem.img} alt={elem.title} />
					<div>{elem.title.toUpperCase()}</div>
					<div>
						{elem.reviews} Review
						{elem.reviews > 1 ? 's' : null}
					</div>
				</div>
			);
		});
		let selected = this.state.filterArray.map((elem, i) => (
			<h4 className="onFilter" key={i}>
				{i + 1}. {elem.toUpperCase()}
			</h4>
		));
		return (
			<div>
				<div className="selector">
					<div
						onClick={() => this.updateFilter('fantasy')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('fantasy')
								? 'selected'
								: null
						}
					>
						Fantasy
					</div>
					<div
						onClick={() => this.updateFilter('narrative')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('narrative')
								? 'selected'
								: null
						}
					>
						Narrative
					</div>
					<div
						onClick={() => this.updateFilter('sensory')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('sensory')
								? 'selected'
								: null
						}
					>
						Sensory
					</div>
					<div
						onClick={() => this.updateFilter('challenge')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('challenge')
								? 'selected'
								: null
						}
					>
						Challenge
					</div>
					<div
						onClick={() => this.updateFilter('fellowship')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('fellowship')
								? 'selected'
								: null
						}
					>
						Fellowship
					</div>
					<div
						onClick={() => this.updateFilter('expression')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('expression')
								? 'selected'
								: null
						}
					>
						Expression
					</div>
					<div
						onClick={() => this.updateFilter('discovery')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('discovery')
								? 'selected'
								: null
						}
					>
						Discovery
					</div>
					<div
						onClick={() => this.updateFilter('abnegation')}
						className={
							this.state.filterArray
								.slice()
								.join('')
								.includes('abnegation')
								? 'selected'
								: null
						}
					>
						Abnegation
					</div>
				</div>
				<div className="searchBar">{selected}</div>
				<button onClick={() => this.updateGames()}>Update Search</button>
				<div className="gameScreen">{display}</div>
			</div>
		);
	}
}

export default AllGames;
