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
		this.state = {};
	}
	componentDidMount() {
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
						<div>Reviews</div>
					</Link>
				</div>
			</div>
			// 	</BrowserRouter>
			// </Provider>
		);
	}
}

export default connect(
	null,
	{ setUserFavs, setUserPlayed, setUserReviews, setUserSuggested }
)(Dash);
