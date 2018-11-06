module.exports = {
	deleteReview: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from game_reviews 
                where review_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	updateReview: (req, res, next) => {
		req.app.get('db').query();
	}
};
