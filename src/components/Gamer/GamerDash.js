import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
							{props.user.length === 1 ? 'Shared Suggested' : 'Suggested'}
						</Link>
					</div>
				) : null}

				<Link to={`/gamer/favorites/${props.match.params.id}`}>
					<div
						className={
							props.match.url.includes('favorites') ? 'selected' : 'fun'
						}
					>
						{props.user.length === 1 ? 'Shared Favs' : 'Favorites'}
					</div>
				</Link>
				<Link to={`/gamer/played/${props.match.params.id}`}>
					<div
						className={props.match.url.includes('played') ? 'selected' : 'fun'}
					>
						{props.user.length === 1 ? 'Both Played' : 'Played'}
					</div>
				</Link>
				<Link to={`/gamer/reviews/${props.match.params.id}`}>
					<div
						className={props.match.url.includes('review') ? 'selected' : 'fun'}
					>
						Reviews
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
