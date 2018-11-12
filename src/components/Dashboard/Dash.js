import React, { Component } from 'react';
// import dashroutes from '../../routes2';
import { Link } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
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
		if (this.props.user.length === 1) {
			if (this.props.user[0]['role'] !== 'gamer') {
				this.setState({ gamer: false });
			}
		}
		this.props.setUserReviews();
		this.props.setUserPlayed();
		this.props.setUserFavs();
		this.props.setUserSuggested(); // console.log(this.props);
	}
	render() {
		return (
			// <Provider store={store}>
			// 	<BrowserRouter>
			<div>
				<div className="selector">
					{/* <div>Dashboard</div> */}
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
						<div
							className={
								this.props.match.includes('pending') ? 'selected' : 'fun'
							}
						>
							<Link to="/dashboard/pending">Pending</Link>
						</div>
					)}
				</div>
			</div>
			// 	</BrowserRouter>
			// </Provider>
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
