import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
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
							<Icon
								elem="suggested"
								clicked={this.props.match.includes('suggested')}
							/>
							<div className="subHeader">Suggested</div>
						</div>
					</Link>
					<Link to="/dashboard/favorites">
						<div
							className={
								this.props.match.includes('favorites') ? 'selected' : 'fun'
							}
						>
							<Icon
								elem="favorite"
								clicked={this.props.match.includes('favorite')}
							/>
							<div className="subHeader">Favorites</div>
						</div>
					</Link>
					<Link to="/dashboard/played">
						<div
							className={
								this.props.match.includes('played') ? 'selected' : 'fun'
							}
						>
							<Icon
								elem="played"
								clicked={this.props.match.includes('played')}
							/>
							<div className="subHeader">Played</div>
						</div>
					</Link>
					<Link to="/dashboard/reviews">
						<div
							className={
								this.props.match.includes('review') ? 'selected' : 'fun'
							}
						>
							<Icon
								elem="review"
								clicked={this.props.match.includes('review')}
							/>
							<div className="subHeader">Reviews</div>
						</div>
					</Link>
					<Link to="/dashboard/newsfeed">
						<div
							className={this.props.match.includes('news') ? 'selected' : 'fun'}
						>
							<Icon elem="news" clicked={this.props.match.includes('news')} />
							<div className="subHeader">News Feed</div>
						</div>
					</Link>
					{this.state.gamer ? null : (
						<Link to="/dashboard/pending">
							<div
								className={
									this.props.match.includes('pending') ? 'selected' : 'fun'
								}
							>
								<div className="subHeader">Pending</div>
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
