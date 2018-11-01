module.exports = {
	getAllGames: (req, res, next) => {
		let text = `select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
        group by game_id) as scores
        join board_games on scores.game_id=board_games.game_id`;
		if (typeof req.query.x === 'string') {
			text += ` order by ${req.query.x} desc`;
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		} else if (!req.query.x) {
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		} else {
			for (let i = 0; i < req.query.x.length; i++) {
				if (i === 0) {
					text += ` order by ${req.query.x[i]} desc`;
				} else {
					text += `, ${req.query.x[i]} desc`;
				}
			}
			console.log(req.query.x);
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		}
		// req.app

		// 	.get('db')
		// 	.then((response) => res.status(200).json(response))
		// 	.catch((err) => res.status(500).send(err));
	},
	getFavs: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from favorite_game
		join board_games on favorite_game.game_id=board_games.game_id
		where gamer_id =${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getPlayed: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from played_games
			join board_games on played_games.game_id=board_games.game_id
			where gamer_id =${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getSuggestions: (req, res, next) => {
		let text =
			'select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews group by game_id) as scores join board_games on scores.game_id=board_games.game_id where board_games.game_id not in (select game_id from favorite_game where gamer_id = 2) and board_games.game_id not in(select game_id from played_games where gamer_id = 2)';
		for (let i = 0; i < req.query.x.length; i++) {
			if (i === 0) {
				text += ` order by ${req.query.x[i]} desc`;
			} else {
				text += `, ${req.query.x[i]} desc`;
			}
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		}
	}
};
