import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	setUserSuggested,
	setUserFavs,
	setUserPlayed
} from '../../redux/reducer';
import './GameCard.css';

class GameCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fav: false,
			played: false
		};
	}
	componentDidMount() {
		if (this.props.user.length === 1) {
			axios
				.get(`/api/user/isfavgame/${this.props.elem.game_id}`)
				.then((result) => {
					if (result.data.length > 0) {
						this.setState({ fav: true });
					}
				});
			axios
				.get(`/api/user/isplayed/${this.props.elem.game_id}`)
				.then((response) => {
					if (response.data.length > 0) {
						this.setState({ played: true });
					}
				});
		}
	}

	resetDash() {
		this.props.setUserFavs();
		this.props.setUserSuggested();
		this.props.setUserPlayed();
	}

	likeButton() {
		if (this.state.fav === false) {
			axios
				.post(`/api/user/isfavgame/${this.props.elem.game_id}`)
				.then(() => this.setState({ fav: true }, this.resetDash()));
		} else {
			axios
				.delete(`/api/user/isfavgame/${this.props.elem.game_id}`)
				.then(() => this.setState({ fav: false }, this.resetDash()));
		}
	}

	playedButton() {
		if (this.state.played === false) {
			axios
				.post(`/api/user/isplayed/${this.props.elem.game_id}`)
				.then(() => this.setState({ played: true }, this.resetDash()));
		} else {
			axios
				.delete(`/api/user/isplayed/${this.props.elem.game_id}`)
				.then(() => this.setState({ played: false }, this.resetDash()));
		}
	}

	render() {
		if (this.props.match) {
			return (
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
			);
		} else {
			return (
				<div className="cardLike" key={this.props.elem.game_id}>
					{!this.props.user[0] ? null : (
						<div>
							<div onClick={() => this.likeButton()} className="circle">
								<div className={this.state.fav ? 'heart fav' : 'heart'} />
							</div>
						</div>
					)}
					<div className="checkBox" onClick={() => this.playedButton()} />
					{this.state.played && (
						<img
							onClick={() => this.playedButton()}
							className="check"
							alt="check"
							src="https://s3.us-east-2.amazonaws.com/boardashell/checkmark.png"
						/>
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
}

function mapStateToProps(state) {
	const { user, games } = state;
	return {
		user,
		games
	};
}

export default connect(
	mapStateToProps,
	{ setUserSuggested, setUserFavs, setUserPlayed }
)(GameCard);
