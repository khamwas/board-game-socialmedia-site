import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

class GameCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fav: false
		};
	}
	likeButton() {
		this.setState({ fav: !this.state.fav });
	}

	render() {
		return (
			<div className="cardLike" key={this.props.elem.game_id}>
				<div onClick={() => this.likeButton()} className="circle">
					<div className={this.state.fav ? 'heart fav' : 'heart'} />
				</div>
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

export default GameCard;
