import React, { Component } from 'react';
import GameRating from '../GameRating/GameRating';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import Moment from 'react-moment';
import './GameReview.css';
import axios from 'axios';

class GameReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			review: '',
			fantasy: null,
			narrative: null,
			challenge: null,
			fellowship: null,
			expression: null,
			discovery: null,
			abnegation: null,
			sensory: null,
			confirm: false
		};
	}
	componentDidMount() {
		this.cleanState();
	}
	zero(name) {
		this.setState({ [name]: 0 });
	}
	cleanState() {
		this.setState({
			review: this.props.elem.review,
			fantasy: this.props.elem.fantasy,
			sensory: this.props.elem.sensory,
			narrative: this.props.elem.narrative,
			challenge: this.props.elem.challenge,
			fellowship: this.props.elem.fellowship,
			expression: this.props.elem.expression,
			discovery: this.props.elem.discovery,
			abnegation: this.props.elem.abnegation
		});
	}

	submitEdit() {
		axios
			.put(
				'/api/user/review',
				Object.assign({}, this.state, { review_id: this.props.elem.review_id })
			)
			.then(() => this.props.getReviews(parseInt(this.props.elem.game_id)));
		this.editChanger();
	}

	cancelEdit() {
		this.cleanState();
		this.editChanger();
	}

	editChanger() {
		if (this.props.user.length > 0) {
			if (this.props.elem.gamer_id === this.props.user[0]['gamer_id']) {
				this.setState({ edit: !this.state.edit });
			}
		}
	}
	changeHandler(e) {
		this.setState({ review: e.target.value }, () => console.log(this.state));
	}
	changeRating(newRating, name) {
		this.setState({ [name]: newRating });
	}

	confirmDelete() {
		this.setState({ confirm: !this.state.confirm });
	}
	deleteReview() {
		axios
			.delete(`/api/user/review/${this.props.elem.review_id}`)
			.then(() => this.props.getReviews(this.props.elem.game_id));
		this.confirmDelete();
	}

	render() {
		if (this.props.match) {
			return (
				<div onClick={() => this.editChanger()} className="reviewCard link">
					<div className="timestamp">
						<Moment format="MMM-DD-YYYY">{this.props.elem.time}</Moment>
					</div>

					<Link to={`/gamer/${this.props.elem.gamer_id}`}>
						<h3 className="super">{this.props.elem.handle}</h3>
					</Link>

					<Link to={`/game/${this.props.elem.game_id}`}>
						<h3 className="super">{this.props.elem.title.toUpperCase()}</h3>
					</Link>

					<p>{this.props.elem.review}</p>
					<GameRating elem={this.props.elem} />
				</div>
			);
		} else if (this.state.edit) {
			// let profile = this.props.user[0]['profile'].slice(
			// 	0,
			// 	this.props.user[0]['lvl'] + 3
			// );
			let stars = this.props.user[0]['profile']
				.slice(0, this.props.user[0]['lvl'] + 3)
				.map((item, i) => (
					<div className="starEdit" key={item + i}>
						<div onClick={() => this.zero(item)}>{item}</div>

						<StarRating
							rating={this.state[item]}
							starRatedColor="rgb(43,65,98)"
							numberOfStars={5}
							name={`${item}`}
							starDimension="25px"
							changeRating={(newRating) => this.changeRating(newRating, item)}
						/>
					</div>
				));
			return (
				<div className="reviewCard">
					{this.state.confirm && (
						<div>
							<div className="confirmWhiteout" />
							<div className="confirmBox">
								<h2>Are you sure you want to delete this review?</h2>
								<div className="reviewButtonContainer">
									<button
										onClick={() => this.deleteReview()}
										className="confirmDeleteButton link"
									>
										Yes, Delete Forever
									</button>
									<button
										onClick={() => this.confirmDelete()}
										className="confirmDeleteButton link"
									>
										No, Cancel
									</button>
								</div>
							</div>
						</div>
					)}
					<h3>
						{this.props.elem.handle || this.props.elem.title.toUpperCase()}
					</h3>
					<textarea
						type="text"
						className="input"
						onChange={(e) => this.changeHandler(e)}
						value={this.state.review}
					/>
					{stars}
					<div className="reviewButtonContainer">
						<button
							onClick={() => this.cancelEdit()}
							className="reviewButton link"
						>
							Cancel
						</button>
						<button
							onClick={() => this.confirmDelete()}
							className="reviewButton link"
						>
							Delete
						</button>
						<button
							onClick={() => this.submitEdit()}
							className="reviewButton link"
						>
							Submit
						</button>
					</div>
				</div>
			);
		} else if (this.props.user.length === 1) {
			return (
				<div onClick={() => this.editChanger()} className="reviewCard link">
					<div className="timestamp">
						<Moment format="MMM-DD-YYYY">{this.props.elem.time}</Moment>
					</div>{' '}
					{this.props.elem.handle ? (
						this.props.elem.handle === this.props.user[0]['handle'] ? (
							<h3 className="super">{this.props.elem.handle}</h3>
						) : (
							<Link to={`/gamer/${this.props.elem.gamer_id}`}>
								<h3 className="super">{this.props.elem.handle}</h3>
							</Link>
						)
					) : (
						<Link to={`/game/${this.props.elem.game_id}`}>
							<h3 className="super">{this.props.elem.title.toUpperCase()}</h3>
						</Link>
					)}
					<p>{this.props.elem.review}</p>
					<GameRating elem={this.props.elem} />
				</div>
			);
		} else if (this.props.elem.title) {
			return (
				<div onClick={() => this.editChanger()} className="reviewCard link">
					<div className="timestamp">
						<Moment format="MMM-DD-YYYY">{this.props.elem.time}</Moment>
					</div>
					{
						<h3 className="super">
							<Link to={`/game/${this.props.elem.game_id}`}>
								{this.props.elem.title.toUpperCase()}
							</Link>
							{this.props.elem.handle && (
								<Link to={`/gamer/${this.props.elem.gamer_id}`}>
									{this.props.elem.handle}
								</Link>
							)}
						</h3>
					}

					<p>{this.props.elem.review}</p>
					<GameRating elem={this.props.elem} />
				</div>
			);
		} else {
			return (
				<div onClick={() => this.editChanger()} className="reviewCard link">
					<div className="timestamp">
						<Moment format="MMM-DD-YYYY">{this.props.elem.time}</Moment>
					</div>

					{
						<h3 className="super">
							<Link to={`/gamer/${this.props.elem.gamer_id}`}>
								{this.props.elem.handle}
							</Link>
						</h3>
					}

					<p>{this.props.elem.review}</p>
					<GameRating elem={this.props.elem} />
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(GameReview);
