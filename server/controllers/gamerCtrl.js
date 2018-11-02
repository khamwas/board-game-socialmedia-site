module.exports = {
	getGamer: (req, res, next) => {
		console.log(req.params.id);
		req.app
			.get('db')
			.gamer.where('gamer_id=$1', req.params.id)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getReviews: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from game_reviews join (select title,game_id from board_games) as handle on handle.game_id=game_reviews.game_id where game_reviews.gamer_id=${
					req.params.id
				}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
