import React, { Component } from 'react';
import axios from 'axios';
import './NewGame.css';
import { Redirect } from 'react-router-dom';

class NewGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			desc: '',
			img: '',
			rules: null,
			play_time: null,
			set_up: null,
			age: null,
			min_players: null,
			max_players: null,
			redirect: false
		};
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	submitReview() {
		axios
			.post('/api/game/suggestion', this.state)
			.then(() => this.setState({ redirect: true }));
	}

	render() {
		return (
			<div>
				{this.state.redirect && <Redirect to="/dashboard" />}
				<div className="confirmWhiteout" />
				<div className="newGameCard">
					<div>
						Title:{' '}
						<input
							value={this.state.title}
							onChange={(e) => this.changeHandler(e, 'title')}
						/>
					</div>
					Description:{' '}
					<textarea
						type="text"
						className="input"
						onChange={(e) => this.changeHandler(e, 'desc')}
						value={this.state.desc}
					/>
					<div className="NewGameNumbers">
						<div className="indiNumbers">
							<div>
								Rules:
								{'            '}
								<input
									min="0"
									max="5"
									type="number"
									value={this.state.rules}
									onChange={(e) => this.changeHandler(e, 'rules')}
								/>
							</div>
							<div>
								Play Time:
								<input
									min="0"
									type="number"
									value={this.state.play_time}
									onChange={(e) => this.changeHandler(e, 'play_time')}
								/>
							</div>
							<div>
								Set up:
								<input
									min="0"
									type="number"
									value={this.state.set_up}
									onChange={(e) => this.changeHandler(e, 'set_up')}
								/>
							</div>
						</div>
						<div className="indiNumbers">
							<div>
								Age:
								<input
									min="0"
									type="number"
									value={this.state.age}
									onChange={(e) => this.changeHandler(e, 'age')}
								/>
							</div>
							<div>
								Min Players:
								<input
									min="1"
									type="number"
									value={this.state.min_players}
									onChange={(e) => this.changeHandler(e, 'min_players')}
								/>
							</div>
							<div>
								Max Players:
								<input
									min="1"
									type="number"
									value={this.state.max_players}
									onChange={(e) => this.changeHandler(e, 'max_players')}
								/>
							</div>
						</div>
					</div>
					<p>
						Play Time and Set Up are in hours. Please use decimals to indicate
						time less than an hour
					</p>
					<div className="reviewButtonContainer">
						<button
							onClick={() => this.props.modalChanger()}
							className="reviewButton link"
						>
							Cancel
						</button>

						<button
							onClick={() => this.submitReview()}
							className="reviewButton link"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default NewGame;
