module.exports = {
	getAllGames: (req, res, next) => {
		let text = `select scores.reviews,scores.sensory,scores.fantasy,scores.narrative,scores.challenge,scores.fellowship,scores.discovery,scores.expression,scores.abnegation,board_games.title,board_games.description,board_games.img,board_games.rules,board_games.play_time,board_games.set_up, board_games.age,board_games.min_players,board_games.max_players,board_games.gamer_id,gamer.handle,board_games.game_id from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews group by game_id) as scores right join board_games on scores.game_id=board_games.game_id left join gamer on gamer.gamer_id=board_games.gamer_id`;
		if (typeof req.query.x === 'string') {
			text += ` order by ${req.query.x} desc nulls last`;
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
					text += ` order by ${req.query.x[i]} desc nulls last`;
				} else {
					text += `, ${req.query.x[i]} desc nulls last`;
				}
			}
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		}
	},
	getFavs: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from ((select count(*) as reviews,game_id as thegame,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
				group by game_id) as scores
				join board_games on scores.thegame=board_games.game_id) as super
				left join favorite_game on super.game_id=favorite_game.game_id
				where favorite_game.gamer_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},

	getPlayed: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from ((select count(*) as reviews,game_id as thegame,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
				group by game_id) as scores
				join board_games on scores.thegame=board_games.game_id) as super
				left join played_games on super.game_id=played_games.game_id
				where played_games.gamer_id=${req.params.id}`
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
	},
	getReviews: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from game_reviews join (select handle,gamer_id from gamer) as handle on handle.gamer_id=game_reviews.gamer_id where game_id=${
					req.params.id
				}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	suggestion: (req, res, next) => {
		let game = Object.assign(
			{},
			{ gamer_id: req.session.user[0]['gamer_id'] },
			req.body
		);
		req.app
			.get('db')
			.pending_new_games.insert(game)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	approved: (req, res, next) => {
		req.app
			.get('db')
			.board_games.insert(req.body)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	pending: (req, res, next) => {
		req.app
			.get('db')
			.query('select * from pending_new_games')
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	deletePending: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from pending_new_games where pending_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
