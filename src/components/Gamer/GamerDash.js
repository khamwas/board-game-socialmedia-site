import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';

function GamerDash(props) {
	return (
		<div>
			<div className="selector">
				{props.user.length === 1 ? (
					<div
						className={
							props.match.url.includes('suggested') ? 'selected' : 'fun'
						}
					>
						<Link to={`/gamer/suggested/${props.match.params.id}`}>
							{props.user.length === 1 ? (
								<div>
									<Icon
										elem="playtogether"
										clicked={props.match.url.includes('suggested')}
									/>
									<div className="subHeader">Play Together</div>
								</div>
							) : (
								<div>
									<Icon
										elem="suggested"
										clicked={props.match.url.includes('suggested')}
									/>
									<div className="subHeader">Suggested</div>
								</div>
							)}
						</Link>
					</div>
				) : null}

				<Link to={`/gamer/favorites/${props.match.params.id}`}>
					<div
						className={
							props.match.url.includes('favorites') ? 'selected' : 'fun'
						}
					>
						<Icon
							elem="favorite"
							clicked={props.match.url.includes('favorites')}
						/>
						{props.user.length === 1 ? (
							<div className="subHeader">Shared Favs</div>
						) : (
							<div className="subHeader">Favorites</div>
						)}
					</div>
				</Link>
				<Link to={`/gamer/played/${props.match.params.id}`}>
					<div
						className={props.match.url.includes('played') ? 'selected' : 'fun'}
					>
						<Icon elem="played" clicked={props.match.url.includes('played')} />
						{props.user.length === 1 ? (
							<div className="subHeader">Both Played</div>
						) : (
							<div className="subHeader">Played</div>
						)}
					</div>
				</Link>
				<Link to={`/gamer/reviews/${props.match.params.id}`}>
					<div
						className={props.match.url.includes('review') ? 'selected' : 'fun'}
					>
						<Icon elem="review" clicked={props.match.url.includes('review')} />
						<div className="subHeader">Reviews</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(GamerDash);
