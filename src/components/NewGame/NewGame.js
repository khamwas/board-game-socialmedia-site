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
			redirect: false,
			file: null
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

	submitFile = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.file[0]);
		axios
			.post(`/test-upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				console.log(response);
				this.setState({ img: response.data.Location });
				// handle your response;
			})
			.catch((error) => {
				console.log(error); // handle your error
			});
	};

	handleFileUpload = (event) => {
		this.setState({ file: event.target.files });
	};

	render() {
		return (
			<div>
				{this.state.redirect && <Redirect to="/dashboard" />}
				<div className="confirmWhiteout" />
				<div className="newGameCard">
					<div className="newImg">
						<img
							alt="pendingImage"
							src={this.state.img}
							className="pendingImage"
						/>
						<form onSubmit={this.submitFile}>
							<input
								label="upload file"
								type="file"
								onChange={this.handleFileUpload}
							/>
							<button type="submit" className="black">
								Send
							</button>
						</form>
					</div>
					<div className="input">
						<div>Title: </div>
						<input
							value={this.state.title}
							onChange={(e) => this.changeHandler(e, 'title')}
						/>
					</div>
					<div className="input">
						<div>Description: </div>
						<textarea
							type="text"
							className="input"
							onChange={(e) => this.changeHandler(e, 'desc')}
							value={this.state.desc}
						/>
					</div>
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
									className="indiNumbersInput"
									min="0"
									type="number"
									value={this.state.play_time}
									onChange={(e) => this.changeHandler(e, 'play_time')}
								/>
							</div>
							<div>
								Set up:
								<input
									className="indiNumbersInput"
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
									className="indiNumbersInput"
									min="0"
									type="number"
									value={this.state.age}
									onChange={(e) => this.changeHandler(e, 'age')}
								/>
							</div>
							<div>
								Min Players:
								<input
									className="indiNumbersInput"
									min="1"
									type="number"
									value={this.state.min_players}
									onChange={(e) => this.changeHandler(e, 'min_players')}
								/>
							</div>
							<div>
								Max Players:
								<input
									className="indiNumbersInput"
									min="1"
									type="number"
									value={this.state.max_players}
									onChange={(e) => this.changeHandler(e, 'max_players')}
								/>
							</div>
						</div>
					</div>
					<p className="newGameParagraph">
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
