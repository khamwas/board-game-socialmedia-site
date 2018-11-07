import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRating from 'react-star-ratings';
import './NewReview.css';
import axios from 'axios';

class NewReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			review: ''
		};
	}
	componentDidMount() {
		let holder = this.props.user[0]['profile']
			.slice(0, this.props.user[0]['lvl'] + 3)
			.map((elem) => ({ [elem]: 0 }));
		let profile = {};
		for (let i = 0; i < holder.length; i++) {
			Object.assign(profile, holder[i]);
		}
		this.setState(
			Object.assign(
				{},
				this.state,
				{
					game_id: parseInt(this.props.game_id),
					gamer_id: this.props.user[0]['gamer_id']
				},
				profile
			)
		);
	}

	submitReview() {
		axios
			.post('/api/user/review', this.state)
			.then(() => this.props.getReviews(parseInt(this.props.game_id)));
		this.props.newReviewStatus();
	}

	changeHandler(e) {
		this.setState({ review: e.target.value });
	}
	changeRating(newRating, name) {
		this.setState({ [name]: newRating });
	}

	render() {
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
			<div>
				<div className="confirmWhiteout" />
				<div className="reviewCard newReview">
					<h3>{this.props.user[0]['handle'].toUpperCase()}</h3>
					<textarea
						type="text"
						className="input"
						onChange={(e) => this.changeHandler(e)}
						value={this.state.review}
					/>
					{stars}
					<div className="reviewButtonContainer">
						<button
							onClick={() => this.props.newReviewStatus()}
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

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(NewReview);
