module.exports = {
	getReviews: (req, res, next) => {
		console.log(req.session.user[0].gamer_id);
		req.app
			.get('db')
			.query(
				`select * from game_reviews join (select title,game_id from board_games) as handle on handle.game_id=game_reviews.game_id where game_reviews.gamer_id=${
					req.session.user[0].gamer_id
				}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getUser: (req, res, next) => {
		if (req.session.user) {
			res.status(200).json(req.session.user);
		} else {
			res.status(200).json([]);
		}
	},
	getFavs: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from favorite_game
		join board_games on favorite_game.game_id=board_games.game_id
		where gamer_id =${req.session.user[0].gamer_id}`
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
			where gamer_id =${req.session.user[0].gamer_id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getSuggestions: (req, res, next) => {
		let text = `select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews group by game_id) as scores join board_games on scores.game_id=board_games.game_id where board_games.game_id not in (select game_id from favorite_game where gamer_id = 2) and board_games.game_id not in(select game_id from played_games where gamer_id = ${
			req.session.user[0].gamer_id
		})`;
		let profile = req.session.user[0]['profile'];
		for (let i = 0; i < profile.length; i++) {
			if (i === 0) {
				text += ` order by ${profile[i]} desc`;
			} else {
				text += `, ${profile[i]} desc`;
			}
			req.app
				.get('db')
				.query(text)
				.then((response) => res.status(200).json(response))
				.catch((err) => res.status(500).send(err));
		}
	},
	isFav: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from favorite_game where gamer_id =${
					req.session.user[0].gamer_id
				} and game_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	isFavPost: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`insert into favorite_game(gamer_id,game_id) values(${
					req.session.user[0].gamer_id
				},${req.params.id})`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	isFavDelete: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from favorite_game where gamer_id =${
					req.session.user[0].gamer_id
				} and game_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
