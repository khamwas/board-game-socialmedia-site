import React, { Component } from 'react';
import GameRating from '../GameRating/GameRating';
import { connect } from 'react-redux';
import StarRating from 'react-star-ratings';
import './GameReview.css';

class GameReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			reviewText: '',
			fantasy: null,
			narrative: null,
			challenge: null,
			fellowship: null,
			expression: null,
			discovery: null,
			abnegatoin: null
		};
	}
	componentDidMount() {
		this.setState({
			reviewText: this.props.elem.review,
			fantasy: this.props.elem.fantasy,
			narrative: this.props.elem.narrative,
			challenge: this.props.elem.challenge,
			fellowship: this.props.elem.fellowship,
			expression: this.props.elem.expression,
			discovery: this.props.elem.discovery,
			abnegation: this.props.elem.abnegation
		});
	}

	editChanger() {
		if (this.props.user.length > 0) {
			if (this.props.elem.gamer_id === this.props.user[0]['gamer_id']) {
				this.setState({ edit: !this.state.edit });
			}
		}
	}
	changeHandler(e) {
		this.setState({ reviewText: e.target.value });
	}
	changeRating(newRating, name) {
		this.setState({ [name]: newRating });
	}

	render() {
		if (this.state.edit) {
			// let profile = this.props.user[0]['profile'].slice(
			// 	0,
			// 	this.props.user[0]['lvl'] + 3
			// );
			let stars = this.props.user[0]['profile']
				.slice(0, this.props.user[0]['lvl'] + 3)
				.map((item) => (
					<div>
						{item}
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
					<h3>
						{this.props.elem.handle || this.props.elem.title.toUpperCase()}
					</h3>
					<textarea
						type="text"
						className="input"
						onChange={(e) => this.changeHandler(e)}
						value={this.state.reviewText}
					/>
					{stars}
					<div className="reviewButtonContainer">
						<button className="reviewButton link">Cancel</button>
						<button className="reviewButton link">Submit</button>
					</div>
				</div>
			);
		} else {
			return (
				<div onClick={() => this.editChanger()} className="reviewCard link">
					<h3>
						{this.props.elem.handle || this.props.elem.title.toUpperCase()}
					</h3>
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
