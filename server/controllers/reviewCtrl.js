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
		console.log(req.body);
		req.app
			.get('db')
			.game_reviews.save(req.body)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	postReview: (req, res, next) => {
		function postMaker(obj, table) {
			let keys = [];
			let values = [];
			for (var x in obj) {
				keys.push(x);
				if (typeof obj[x] === 'string') {
					values.push(`\'${obj[x]}\'`);
				} else {
					values.push(obj[x]);
				}
			}
			let keyValues = [];
			keyValues.push(`(${keys.join(', ')})`, `(${values.join(', ')})`);
			return `insert into ${table}${keyValues[0]} values${keyValues[1]}`;
		}
		let x = postMaker(req.body, 'game_reviews');
		// console.log(x);
		req.app
			.get('db')
			.query(x)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
