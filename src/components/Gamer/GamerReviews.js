import React, { Component } from 'react';
import GamerDash from './GamerDash';
import axios from 'axios';
import { connect } from 'react-redux';
import GameReview from '../GameReview/GameReview';

class GamerReviews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: []
		};
	}
	componentDidMount() {
		if (this.props.user.length === 1) {
			this.SharedReviews();
		} else {
			this.setReviews();
		}
	}

	setReviews() {
		axios
			.get(`/api/gamer/reviews/${this.props.match.params.id}`)
			.then((result) => this.setState({ reviews: result.data }));
	}
	SharedReviews() {
		axios
			.get(`/api/both/reviews/${this.props.match.params.id}`)
			.then((result) => this.setState({ reviews: result.data }));
	}

	render() {
		let reviews = this.state.reviews.map((elem) => (
			<GameReview key={elem.review_id} elem={elem} />
		));
		return (
			<div>
				<GamerDash match={this.props.match} />
				{reviews}
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

export default connect(mapStateToProps)(GamerReviews);
