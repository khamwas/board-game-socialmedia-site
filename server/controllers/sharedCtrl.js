module.exports = {
	getReviews: (req, res, next) => {
		let text = `select * from game_reviews join (select title,game_id from board_games) as handle on handle.game_id=game_reviews.game_id where game_reviews.gamer_id=${
			req.params.id
		}`;
		let profile = req.session.user[0]['profile'];
		for (let i = 0; i < profile.length; i++) {
			if (i === 0) {
				text += ` order by ${profile[i]} desc`;
			} else {
				text += `, ${profile[i]} desc`;
			}
		}
		req.app
			.get('db')
			.query(text)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getBothFavs: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
                    group by game_id) as scores
                    join board_games on scores.game_id=board_games.game_id
                    where board_games.game_id in (select game_id from favorite_game
                    where gamer_id = ${req.params.id}) 
                    and board_games.game_id  in(select game_id from favorite_game
                    where gamer_id = ${req.session.user[0].gamer_id})
                    `
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getBothPlayed: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
                    group by game_id) as scores
                    join board_games on scores.game_id=board_games.game_id
                    where board_games.game_id in (select game_id from played_games
                    where gamer_id = ${req.params.id}) 
                    and board_games.game_id  in(select game_id from played_games
                    where gamer_id = ${req.session.user[0].gamer_id})
                    `
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
	// getBothSuggestions: (req, res, next) => {
	// 	let text = `select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews group by game_id) as scores join board_games on scores.game_id=board_games.game_id where board_games.game_id not in (select game_id from favorite_game where gamer_id = ${
	// 		req.session.user[0].gamer_id
	// 	}) and board_games.game_id not in(select game_id from played_games where gamer_id = ${
	// 		req.session.user[0].gamer_id
	// 	})`;
	// 	let profile = req.session.user[0]['profile'];
	// 	for (let i = 0; i < profile.length; i++) {
	// 		if (i === 0) {
	// 			text += ` order by ${profile[i]} desc`;
	// 		} else {
	// 			text += `, ${profile[i]} desc`;
	// 		}
	// 		req.app
	// 			.get('db')
	// 			.query(text)
	// 			.then((response) => res.status(200).json(response))
	// 			.catch((err) => res.status(500).send(err));
	// 	}
	// }
};
