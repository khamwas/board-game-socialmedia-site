import React, { Component } from 'react';
// import {connect} from
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './GameCard.css';

class GameCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fav: false
		};
	}
	componentDidMount() {
		axios
			.get(`/api/user/isfavgame/${this.props.elem.game_id}`)
			.then((result) => {
				if (result.data.length > 0) {
					this.setState({ fav: true });
				}
			});
	}

	likeButton() {
		if (this.state.fav === false) {
			axios
				.post(`/api/user/isfavgame/${this.props.elem.game_id}`)
				.then(() => this.setState({ fav: true }));
		} else {
			axios
				.delete(`/api/user/isfavgame/${this.props.elem.game_id}`)
				.then(() => this.setState({ fav: false }));
		}
	}

	render() {
		return (
			<div className="cardLike" key={this.props.elem.game_id}>
				{!this.props.user[0] ? null : (
					<div>
						<div onClick={() => this.likeButton()} className="circle">
							<div className={this.state.fav ? 'heart fav' : 'heart'} />
						</div>
					</div>
				)}
				<Link to={`/game/${this.props.elem.game_id}`}>
					<div className="gameCardContainer">
						<img
							className="gameScrollImg"
							src={this.props.elem.img}
							alt={this.props.elem.title}
						/>
						<div className="cardBottom">
							<div>{this.props.elem.title.toUpperCase()}</div>
							<div className="line" />
							<div>
								{this.props.elem.reviews ? this.props.elem.reviews : 0} Review
								{parseInt(this.props.elem.reviews) !== 1 ? 's' : null}
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user, games } = state;
	return {
		user,
		games
	};
}

export default connect(mapStateToProps)(GameCard);
