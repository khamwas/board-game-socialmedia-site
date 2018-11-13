import React, { Component } from 'react';
import StarRating from 'react-star-ratings';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import './Quiz.css';
import Icon from '../Icon/Icon';
import DragDrop from '../DragDrop/DragDrop'
import About from '../About/About';

class Quiz extends Component {
	constructor() {
		super();
		this.state = {
			rating: 0,
			sensory: 0,
			fantasy: 0,
			narrative: 0,
			challenge: 0,
			fellowship: 0,
			discovery: 0,
			expression: 0,
			abnegation: 0,
			games: [],
			index: 0,
			profile: [],
			incomplete: true,
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
			lvl: 0,
			role: 'gamer',
			email: '',
			handle: '',
			types: [
				{ name: 'sensory', order: 'initial' },
				{ name: 'fantasy', order: 'initial' },
				{ name: 'fellowship', order: 'initial' },
				{ name: 'narrative', order: 'initial' },
				{ name: 'challenge', order: 'initial' },
				{ name: 'discovery', order: 'initial' },
				{ name: 'expression', order: 'initial' },
				{ name: 'abnegation', order: 'initial' }
			]
		};
	}

	createAccount() {
		// alert("You've created a gamer account!");
		let newUser = Object.assign(
			{},
			{
				handle: this.state.handle,
				email: this.state.email,
				role: this.state.role,
				lvl: this.state.lvl
			}
		);

		this.state.types.map((elem) =>
			Object.assign(newUser, { [elem.name]:parseInt(elem.order) })
		);
		console.log(newUser)
		axios
			.post('/api/user', newUser)
			.then(() =>
				window.open(`${process.env.REACT_APP_SERVER}/login`, '_self')
			);
	}

	componentDidMount() {
		axios.get('/api/user').then((result) => {
			if (result.data.length === 1) {
				this.props.history.push('/dashboard');
			} else {
				axios
					.get('/api/games/quiz')
					.then((result) => this.setState({ games: result.data }));
			}
		});
	}
	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	changeRating(newRating, name) {
		this.setState({ [name]: newRating }, () => this.submit());
	}
	zero() {
		this.setState({ rating: 0 });
	}
	stepIndex() {
		this.setState({ index: this.state.index + 1 }, () =>
			this.completeChecker()
		);
	}

	completeChecker() {
		if (this.state.index === this.state.games.length) {
			this.setState({ incomplete: false }, () => this.profiler());
		}
	}

	updateFilter(str) {
		if (this.state.filterArray.join('').includes(str)) {
			let temp = this.state.filterArray.slice();
			let index = this.state.filterArray.findIndex((elem) => elem === str);
			temp.splice(index, 1);
			this.setState({ filterArray: temp });
		} else {
			let temp = this.state.filterArray.slice();
			temp.push(str);
			this.setState({ filterArray: temp });
		}
	}

	submit() {
		// console.log(this.state.games[this.state.index]);
		this.setState(
			{
				sensory:
					parseFloat(this.state.sensory) +
					parseFloat(this.state.games[this.state.index]['sensory'])||1 *
						this.state.rating,
				abnegation:
					parseFloat(this.state.abnegation) +
					parseFloat(this.state.games[this.state.index]['abnegation'])||1 *
						this.state.rating,
				narrative:
					parseFloat(this.state.narrative) +
					parseFloat(this.state.games[this.state.index]['narrative'])||1 *
						this.state.rating,
				challenge:
					parseFloat(this.state.challenge) +
					parseFloat(this.state.games[this.state.index]['challenge'])||1 *
						this.state.rating,
				fellowship:
					parseFloat(this.state.fellowship) +
					parseFloat(this.state.games[this.state.index]['fellowship'])||1 *
						this.state.rating,
				discovery:
					parseFloat(this.state.discovery) +
					parseFloat(this.state.games[this.state.index]['discovery'])||1 *
						this.state.rating,
				expression:
					parseFloat(this.state.expression) +
					parseFloat(this.state.games[this.state.index]['expression'])||1 *
						this.state.rating,
				fantasy:
					parseFloat(this.state.fantasy) +
					parseFloat(this.state.games[this.state.index]['fantasy'])||1 *
						this.state.rating
			},
			() => this.complete()
		);
	}
	complete() {
		this.stepIndex();
		this.zero();
	}

	profiler() {
		var selector2 = [];
		var profile = [];
		let count=1
		for (let i = 0; i < this.state.index * 25; i++) {
			var things = Object.assign(
				{},
				{ sensory: this.state.sensory },
				{ narrative: this.state.narrative },
				{ challenge: this.state.challenge },
				{ discovery: this.state.discovery },
				{ expression: this.state.expression },
				{ abnegation: this.state.abnegation },
				{ fellowship: this.state.fellowship },
				{ fantasy: this.state.fantasy }
			);
			for (var x in things) {
				if (parseInt(things[x]) === i) {
					profile.push(
						<h4 className="resultNames" key={x + things[x]}>
							{`${count} .${x.toUpperCase()}`}
						</h4>
					);
					selector2.push(Object.assign({},{name:x,order:count}));
					count++
				}
			}
		}
		this.setState({ profile: profile }, () =>
			this.setState({ quizResult: selector2 }, () =>
				this.setState({ types: selector2 })
			)
		);
	}
	onDragStart(e, name) {
		e.dataTransfer.setData('name', name);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDrop(e, number) {
		let name = e.dataTransfer.getData('name');

		let newTypes = this.state.types.map((type) => {
			if (type.name === name) {
				return Object.assign({}, { name: type.name, order: number });
			} else if (type.order == number) {
				return Object.assign({}, { name: type.name, order: 'initial' });
			} else {
				return type;
			}
		});

		this.setState({ types: newTypes });
	}



	render() {
		var orders = {
			initial:[],
			'1': [],
			'2': [],
			'3': [],
			'4': [],
			'5': [],
			'6': [],
			'7': [],
			'8': [],
			'9': []
		};
		this.state.types.forEach((elem) => {orders[`${elem.order}`].push(
				<div
					key={elem.name}
					draggable
					onDragStart={(e) => this.onDragStart(e, elem.name)}
					className="draggable"
				>
					{elem.name}
				</div>
			);
		});
		let game = this.state.games
			.slice(this.state.index, this.state.index + 1)
			.map((elem, i) => (
				<GameCard key={elem + i} match={this.props.match} elem={elem} />
			));
		if (this.state.incomplete) {
			return (
				<div className="quiz">
					<h1>Quiz</h1>
					<p>
						Rate each game on a scale of 0-5 stars. Hit the submit button to
						rate the next game. If you don't know a game, skip it by selecting
						"I don't know this game." When you are finished with your quiz, we
						will create a gaming profile for you.
					</p>
					<div className="gameScreen">{game}</div>
					<div className="quizRatings">
						<button className="quizButton" onClick={() => this.submit()}>
							No Stars
						</button>
						<StarRating
							rating={this.state.rating}
							starRatedColor="rgb(43,65,98)"
							numberOfStars={5}
							name="rating"
							starDimension="50px"
							changeRating={(newRating) =>
								this.changeRating(newRating, 'rating')
							}
						/>
						<button className="quizButton" onClick={() => this.stepIndex()}>
							I don't know this game
						</button>
					</div>
					<div>{this.state.profile}</div>
				</div>
			);
		} else {
			// let selectorDisplay = this.state.selector.map((elem, i) => {
			// 	return (
			// 		<div
			// 			key={i}
			// 			onClick={() => this.updateFilter(elem)}
			// 			className={
			// 				this.state.filterArray
			// 					.slice()
			// 					.join('')
			// 					.includes(elem)
			// 					? 'selected clicker'
			// 					: 'clicker'
			// 			}
			// 		>
			// 			<Icon elem={elem} />
			// 			<div className="subHeader">
			// 				{elem.charAt(0).toUpperCase() + elem.slice(1)}
			// 			</div>
			// 		</div>
			// 	);
			// });
			// let selected = this.state.filterArray.map((elem, i) => (
			// 	<h4 className="onFilter" key={i}>
			// 		<Icon elem={elem} />
			// 		{i + 1}. {elem.toUpperCase()}
			// 	</h4>
			// ));
			return (
				<div className="quiz">
					<h1>Results</h1>
					<div className="quizResults">{this.state.profile}</div>
					<p>
						Congratulations! You have completed the first step to never being
						board again. This profile indicates the types of fun that are most
						important to you and helps our algorithm present games that match
						your profile and fit your gaming personality. Read about each type
						of fun below and then make any final changes to your profile before
						creating an account so you can find your next best game.
					</p>

					<div className="resultOuter">
				{/* <h2 className="header">Drag & Drop</h2> */}
				<div className="container-drag">
					<div
						className="order"
						onDrop={(e) => this.onDrop(e, 'initial')}
						onDragOver={(e) => this.onDragOver(e)}
					>
						{orders.initial}
					</div>
					{/* {wrappers} */}
					<div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '1')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">1</span>
							{orders['1']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '2')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">2</span>
							{orders['2']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '3')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">3</span>
							{orders['3']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '4')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">4</span>
							{orders['4']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '5')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">5</span>
							{orders['5']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '6')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">6</span>
							{orders['6']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '7')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">7</span>
							{orders['7']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '8')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">8</span>
							{orders['8']}
						</div>
					</div>
				</div>
				
			</div>
					<About quiz={this.state.selector} />
					{/* <div className="selector">{selectorDisplay}</div>
					<div className="searchBar">{selected}</div> */}
					<h4>
						If you feel like your profile should be different than what our quiz
						suggested, please rearrange your profile here before creating an
						account. Take care, you will not be able to update your profile
						after you set it.
					</h4>
					<div>
						<input
							className="quizInput"
							placeholder="Register your username here"
							value={this.state.handle}
							onChange={(e) => this.changeHandler(e, 'handle')}
						/>
						<input
							className="quizInput"
							placeholder="Register your email here"
							value={this.state.email}
							onChange={(e) => this.changeHandler(e, 'email')}
						/>
					</div>
					<button className="bottomButton" onClick={() => this.createAccount()}>
						Create Account
					</button>
				</div>
			);
		}
	}
}

export default Quiz;
