module.exports = {
	getGamer: (req, res, next) => {
		console.log(req.params.id);
		req.app
			.get('db')
			.gamer.where('gamer_id=$1', req.params.id)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
