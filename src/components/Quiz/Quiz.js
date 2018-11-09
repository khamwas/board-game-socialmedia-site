import React, { Component } from 'react';
import StarRating from 'react-star-ratings';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import './Quiz.css';
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
			incomplete: true
		};
	}

	componentDidMount() {
		axios.get('/api/user').then((result) => {
			if (result.data.length === 1) {
				this.props.history.push('/dashboard');
			} else {
				axios
					.get('/api/games')
					.then((result) => this.setState({ games: result.data }));
			}
		});
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

	submit() {
		// console.log(this.state.games[this.state.index]);
		this.setState(
			{
				sensory:
					parseFloat(this.state.sensory) +
					parseFloat(this.state.games[this.state.index]['sensory']) *
						this.state.rating,
				abnegation:
					parseFloat(this.state.abnegation) +
					parseFloat(this.state.games[this.state.index]['abnegation']) *
						this.state.rating,
				narrative:
					parseFloat(this.state.narrative) +
					parseFloat(this.state.games[this.state.index]['narrative']) *
						this.state.rating,
				challenge:
					parseFloat(this.state.challenge) +
					parseFloat(this.state.games[this.state.index]['challenge']) *
						this.state.rating,
				fellowship:
					parseFloat(this.state.fellowship) +
					parseFloat(this.state.games[this.state.index]['fellowship']) *
						this.state.rating,
				discovery:
					parseFloat(this.state.discovery) +
					parseFloat(this.state.games[this.state.index]['discovery']) *
						this.state.rating,
				expression:
					parseFloat(this.state.expression) +
					parseFloat(this.state.games[this.state.index]['expression']) *
						this.state.rating,
				fantasy:
					parseFloat(this.state.fantasy) +
					parseFloat(this.state.games[this.state.index]['fantasy']) *
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
		var profile = [];
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
					profile.push(<h4>{x}</h4>);
				}
			}
		}
		this.setState({ profile: profile });
	}

	render() {
		let game = this.state.games
			.slice(this.state.index, this.state.index + 1)
			.map((elem) => <GameCard match={this.props.match} elem={elem} />);
		if (this.state.incomplete) {
			return (
				<div className="quiz">
					<h1>Quiz</h1>
					<p>
						Rate each game on a scale of 0-5 stars. Hit the submit button to
						rate the next game. If you don't know a game, skip it by selecting
						"I don't know this game." When you are finished with your quiz, we
						will create a gaming profile for you that will indicate
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
					<button className="quizButton" onClick={() => this.profiler()}>
						Submit
					</button>
				</div>
			);
		} else {
			return (
				<div className="quiz">
					<h1>Results</h1>
					<p>
						Rate each game on a scale of 0-5 stars. Hit the submit button to
						rate the next game. If you don't know a game, skip it by selecting
						"I don't know this game." When you are finished with your quiz, we
						will create a gaming profile for you that will indicate
					</p>
					<div className="gameScreen">{game}</div>

					<div>{this.state.profile}</div>
					<About />
				</div>
			);
		}
	}
}

export default Quiz;
