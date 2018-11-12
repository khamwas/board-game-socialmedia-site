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
				`select * from ((select count(*) as reviews,game_id as thegame,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
				group by game_id) as scores
				join board_games on scores.thegame=board_games.game_id) as super
				left join favorite_game on super.game_id=favorite_game.game_id
				where favorite_game.gamer_id=${req.session.user[0].gamer_id}`
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
				where played_games.gamer_id=${req.session.user[0].gamer_id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getSuggestions: (req, res, next) => {
		let text = `select * from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews group by game_id) as scores join board_games on scores.game_id=board_games.game_id where board_games.game_id not in (select game_id from favorite_game where gamer_id = ${
			req.session.user[0].gamer_id
		}) and board_games.game_id not in(select game_id from played_games where gamer_id = ${
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
	},
	getNewsFeed: (req, res, next) => {
		let text = `select game_reviews.sensory,game_reviews.fantasy,game_reviews.narrative,game_reviews.challenge,game_reviews.fellowship,game_reviews.discovery,game_reviews.expression,game_reviews.abnegation,game_reviews.gamer_id,game_reviews.game_id, review_id,null as reviews,review,title,null as description,null as img,null as rules, null as play_time, null as set_up, null as age, null as min_players, null as max_players,null as email,handle,null as role,20 as lvl from game_reviews 
		left join board_games on game_reviews.game_id=board_games.game_id
		right join gamer on game_reviews.gamer_id=gamer.gamer_id
		where game_reviews.gamer_id !=${req.session.user[0].gamer_id}
		union all
		select sensory,fantasy,narrative,challenge,fellowship,discovery,expression,abnegation,null as gamer_id,game_id, null as review_id,reviews,null as review,title,description,img,rules,play_time,set_up,age,min_players,max_players, null as email,null as handle,null as role,30 as lvl from ((select count(*) as reviews,game_id as link,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
		group by game_id) as scores
		join board_games on scores.link=board_games.game_id) as super
		where game_id not in(select game_id from favorite_game where gamer_id=${
			req.session.user[0].gamer_id
		}) and game_id not in (select game_id from played_games where gamer_id=${
			req.session.user[0].gamer_id
		})
		union all
		select sensory,fantasy,narrative,challenge,fellowship,discovery,expression,abnegation,gamer_id, null as game_id, null as review_id,null as reviews,null as review,null as title,null as description,null as img,null as rules, null as play_time, null as set_up, null as age, null as min_players, null as max_players,email,handle,role,lvl from gamer
		where gamer_id!=${req.session.user[0].gamer_id}`;
		let profile = req.session.user[0]['profile'];
		for (let i = 0; i < profile.length; i++) {
			if (i === 0) {
				text += ` order by ${profile[i]} desc nulls last`;
			} else {
				text += `, ${profile[i]} desc nulls last`;
			}
		}
		req.app
			.get('db')
			.query(text)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	addUser: (req, res, next) => {
		req.app
			.get('db')
			.gamer.insert(req.body)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getUsers: (req, res, next) => {
		req.app
			.get('db')
			.query('select * from gamer')
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};
