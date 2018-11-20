import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	setUserFavs,
	setUserPlayed,
	setUserReviews,
	setUserSuggested
} from '../../redux/reducer';

class Dash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gamer: true
		};
	}
	componentDidMount() {
		this.props.setUserReviews();
		this.props.setUserPlayed();
		this.props.setUserFavs();
		this.props.setUserSuggested();
		if (this.props.user.length === 1) {
			if (this.props.user[0]['role'] !== 'gamer') {
				this.setState({ gamer: false });
			}
		}
	}
	render() {
		return (
			<div>
				<div className="selector">
					<Link to="/dashboard/suggested">
						<div
							className={
								this.props.match.includes('suggested') ? 'selected' : 'fun'
							}
						>
							Suggested
						</div>
					</Link>
					<Link to="/dashboard/favorites">
						<div
							className={
								this.props.match.includes('favorites') ? 'selected' : 'fun'
							}
						>
							Favorites
						</div>
					</Link>
					<Link to="/dashboard/played">
						<div
							className={
								this.props.match.includes('played') ? 'selected' : 'fun'
							}
						>
							Played
						</div>
					</Link>
					<Link to="/dashboard/reviews">
						<div
							className={
								this.props.match.includes('review') ? 'selected' : 'fun'
							}
						>
							Reviews
						</div>
					</Link>
					<Link to="/dashboard/newsfeed">
						<div
							className={this.props.match.includes('news') ? 'selected' : 'fun'}
						>
							News Feed
						</div>
					</Link>
					{this.state.gamer ? null : (
						<Link to="/dashboard/pending">
							<div
								className={
									this.props.match.includes('pending') ? 'selected' : 'fun'
								}
							>
								Pending
							</div>
						</Link>
					)}
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

export default connect(
	mapStateToProps,
	{ setUserFavs, setUserPlayed, setUserReviews, setUserSuggested }
)(Dash);
