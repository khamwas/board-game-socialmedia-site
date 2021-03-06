import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsCard from './NewsCard';
import Dash from './Dash';
import './Dashboard.css';
import '../GameCard/GameCard.css';
import axios from 'axios';
import './Dashboard.css';

class NewsFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: []
		};
	}
	componentDidMount() {
		axios
			.get('/api/user/newsFeed')
			.then((result) => this.setState({ news: result.data }));
	}

	render() {
		let newsFeed = this.state.news.map((elem, i) => {
			return (
				<NewsCard match={this.props.match.path} key={elem + i} elem={elem} />
			);
		});

		return (
			<div className="dash">
				<Dash match={this.props.match.path} />
				<div className="news">{newsFeed}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { games, userFavs } = state;
	return {
		games,
		userFavs
	};
}

export default connect(mapStateToProps)(NewsFeed);
