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
	},
	getBothSuggestions: (req, res, next) => {
		req.app
			.get('db')
			.query(`select * from gamer where gamer_id=${req.params.id}`)
			.then((answer) => {
				let profile2 = [];
				for (let i = 0; i < 15; i++) {
					for (var x in answer[0]) {
						if (answer[0][x] === i && x !== 'lvl' && x !== 'gamer_id') {
							profile2.push(x);
						}
					}
				}
				let text = `select * from ((select count(*) as reviews,game_id as link,avg(sensory) as sensory,avg(fantasy) as fantasy,avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation from game_reviews
            group by game_id) as scores
            join board_games on scores.link=board_games.game_id) as super`;

				let profile1 = req.session.user[0]['profile'];
				let one = {};
				let two = {};
				// profile1.map((elem,i,arr)=> Object.assign(one,{[elem]: arr.length-i}))
				// profile2.map((elem,i,arr)=> Object.assign(two,{[elem]: arr.length-i}))
				profile1.map((elem, i) => Object.assign(one, { [elem]: i + 1 }));
				profile2.map((elem, i) => Object.assign(two, { [elem]: i + 1 }));
				let combined = {};
				profile1.map((elem) =>
					Object.assign(combined, { [elem]: (one[elem] + two[elem]) / 2 })
				);
				let bothProfile = [];
				for (let i = 0; i < 8; i += 1 / 2) {
					for (var z in combined) {
						if (combined[z] === i) {
							bothProfile.push(z);
						}
					}
				}
				console.log(bothProfile);
				for (let i = 0; i < bothProfile.length; i++) {
					if (i === 0) {
						text += ` order by ${bothProfile[i]} desc`;
					} else {
						text += `, ${bothProfile[i]} desc`;
					}
				}
				req.app
					.get('db')
					.query(text)
					.then((response) => res.status(200).json(response))
					.catch((err) => res.status(500).send(err));
			});
	},
	intersect: (profile1, profile2) => {
		let one = {};
		let two = {};
		// profile1.map((elem,i,arr)=> Object.assign(one,{[elem]: arr.length-i}))
		// profile2.map((elem,i,arr)=> Object.assign(two,{[elem]: arr.length-i}))
		profile1.map((elem, i) => Object.assign(one, { [elem]: i + 1 }));
		profile2.map((elem, i) => Object.assign(two, { [elem]: i + 1 }));
		let combined = {};
		profile1.map((elem) =>
			Object.assign(combined, { [elem]: (one[elem] + two[elem]) / 2 })
		);
		let bothProfile = [];
		for (let i = 0; i < 8; i += 1 / 2) {
			for (var x in combined) {
				if (combined[x] === i) {
					bothProfile.push(x);
				}
			}
		}
		return bothProfile;
	}
};
