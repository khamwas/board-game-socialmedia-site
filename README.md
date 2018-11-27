# boardashell.com | A Board Game Social Media Site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![overview](https://media.giphy.com/media/1BeEwlhWioFoURkpAw/giphy.gif)

## Table of Contents

- [Why?](#why)
- [Main Challenges](#main-challenges) - [1. Game Metric Averages Join Table](#game-metric-averages-join-table) - [2. Averaged Profile Algorithm](#averaged-profile-algorithm) - [3. Profile Assignment Algorithm](#profile-assignment-quiz-algorithm)
- [Account Creation](#account-creation) - [Quiz](#quiz) - [Profile](#profile) - [About](#about) - [Registration](#registration)
- [Dashboard](#dashboard) - [Gamecards](#gamecards) - [Reviews](#reviews) - [Links](#links) - [News Feed](#news-feed)
- [Game View](#game-view)
- [Gamer View](#gamer-view)
- [Search Function](#search-function) - [Add Game](#add-game)
- [Technology](#technology) - [Schema](#schema) - [Average Ratings](#) - [Nulls](#) - [Dynamic SQL Query](#) - [Shared Profiles](#) - [Quiz Result](#)

## Why?

This app attempts to illustrate that a multivariable review system is conceptually superior to the single variable review systems that are commonly used in algorithms to suggest media to users.

### Single Variable Systems

Single variable systems utilize only one scale for rating a class of objects. In the following two examples, boardgamegeek and rottentomatoes, they increase the sophistication by differentiating approved 'critic' ratings and regular user ratings. But this is only utilizing a Signle Variable System twice.
![boardgamegeek](https://s3.us-east-2.amazonaws.com/khamwas-readme/boardgamegeek.png)

![rottentomatoes](https://s3.us-east-2.amazonaws.com/khamwas-readme/rottentomatoes.png)

### Multivariable Systems

Multivariable Systems utilize a number of metrics to review a game across mutliple aesthetics. This enables the user to identify which aesthetic principles are most important to him or her and results in more accurate predictions by the algorithm as to what suggestions the user is likely to enjoy.

The Multivariable System employed for this application is informed by the article:

#### [MDA: A Formal Approach to Game Design and Game Research Robin Hunicke, Marc LeBlanc, Robert Zubek](http://www.cs.northwestern.edu/~hunicke/MDA.pdf)

It outlines 8 Aesthetics for judging 'Fun' in games. (In no particular order)

1. Narrative: Game as Drama
2. Discovery: Game as Uncharted Territory
3. Expression: Game as Self-Discovery
4. Fantasy: Game as Make-Believe
5. Fellowship: Game as Social-Framework
6. Sensory: Game as Sense Experience
7. Challenge: Game as Obstacle
8. Abnegation: Game as Pass-Time

This app averages to total of each metric for each game to create a distribution that can be held against a user's profile to more accurately determine how likely a user is to enjoy a game regardless of the games 'objective' merit.

## Main Challenges

### 1. Game Metric Averages Join Table

I was able to keep the schema for this app fairly simple, but the need to always track an average of all metrics in all reviews for each game required the use of a join table. This was the first challenge that was necessary for me to overcome in creating this app.
[Schema and Join Table](#schema)

### 2. Averaged Profile Algorithm

Determining what games that multiple users should play together to maximize shared fun was another difficult problem.
[Shared Profile Algorithm](#shared-profiles)

### 3. Profile Assignment Quiz Algorithm

I was able to utilize a similar method to my Shared Profile Algorithm to design a preliminary assessment for new users to assign a profile that will become more accurate as more data is added to the database.
[Profile Generation Algorithm](#quiz-result)

## Account Creation

### Quiz

![Quiz](https://media.giphy.com/media/31UJqG1PDhKJ5Lt3xi/giphy.gif)

### Profile

![Profile](https://media.giphy.com/media/1NRZ0X6Rnp2vngKF7t/giphy.gif)

### About

![About](https://media.giphy.com/media/F0OFPoF5tp8AQ2Wxv0/giphy.gif)

### Registration

![CreateAccount](https://media.giphy.com/media/MuGiZf65M6EA1x53nF/giphy.gif)

## Dashboard

### Gamecards

![dashboard](https://media.giphy.com/media/APwmCeaYCasDd6X4lW/giphy.gif)

### Reviews

![editreview](https://media.giphy.com/media/69pgGfX3kIOpZy7grA/giphy.gif)

![canceldeletereview](https://media.giphy.com/media/fWgSp7Ohj6x3B22H23/giphy.gif)

### Links

![dashlinks](https://media.giphy.com/media/lq9NvefwdFlXYamUkv/giphy.gif)

### News Feed

## Game View

## Gamer View

## Search Function

### Add Game

### not logged in

### logged in

# Technology

## Schema

![schema](https://s3.us-east-2.amazonaws.com/khamwas-readme/boardashell_schema.png)

## Average Ratings

## Dynamic SQL Query

Having the need to generate an SQL Join Table ordered by up to 9 metrics

```js
getAllGames: (req, res, next) => {
	let text = `select scores.reviews,scores.sensory,scores.fantasy,scores.narrative,
scores.challenge,scores.fellowship,scores.discovery,scores.expression,scores.abnegation,
board_games.title,board_games.description,board_games.img,board_games.rules,
board_games.play_time,board_games.set_up, board_games.age,board_games.min_players,
board_games.max_players,board_games.gamer_id,gamer.handle,board_games.game_id 
from (select count(*) as reviews,game_id,avg(sensory) as sensory,avg(fantasy) as fantasy,
avg(narrative) as narrative,avg(challenge) as challenge,avg(fellowship) as fellowship,
avg(discovery) as discovery,avg(expression) as expression,avg(abnegation) as abnegation 
from game_reviews group by game_id) as scores right join board_games 
on scores.game_id=board_games.game_id left join gamer on gamer.gamer_id=board_games.gamer_id`;

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
};
```

### Nulls

## Shared Profiles

## Quiz Result
