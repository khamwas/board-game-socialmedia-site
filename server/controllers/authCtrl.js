module.exports = {
	login: (req, res, next) => {
		const user = users.find((elem) => elem.email === req.body.email);
		if (user) {
			req.session.user.username = user.username;
			res.status(200).json(req.session.user);
		} else {
			res.status(500).send('Unauthorized');
		}
	},
	register: (req, res, next) => {
		// req.app.get('db')
		users.push(
			Object.assign(
				{ username: req.body.username, password: req.body.password },
				{ id: id }
			)
		);
		req.session.user.username = req.body.username;
		id++;
		res.status(200).json(req.session.user);
	},
	signout: (req, res, next) => {
		req.session.destroy();
		res.status(200).send(req.session);
	},
	getUser: (req, res, next) => {
		res.status(200).json(req.session.user);
	}
};
