import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Quiz from './components/Quiz/Quiz';
import Game from './components/Game/Game';
import Gamer from './components/Gamer/Gamer';
import AllGames from './components/AllGames/AllGames';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';
import Favorites from './components/Dashboard/Favorites';
import Played from './components/Dashboard/Played';
import Suggested from './components/Dashboard/Suggested';
import UserReviews from './components/Dashboard/UserReviews';
import GamerFavs from './components/Gamer/GamerFavs';
import GamerPlayed from './components/Gamer/GamerPlayed';
import GamerSuggested from './components/Gamer/GamerSuggested';
import GamerReviews from './components/Gamer/GamerReviews';

export default (
	<Switch>
		<Route path="/about" component={About} />
		<Route path="/game/:id" component={Game} />
		{/* <Route path="/dashboard" component={Dash} /> */}
		<Route path="/allgames" component={AllGames} />
		<Route exact path="/" component={Quiz} />
		<Route path="/dashboard/suggested" component={Suggested} />
		<Route path="/dashboard/favorites" component={Favorites} />
		<Route path="/dashboard/played" component={Played} />
		<Route path="/dashboard/reviews" component={UserReviews} />
		<Route exact path="/dashboard" component={Dashboard} />
		<Route path="/gamer/suggested/:id" component={GamerSuggested} />
		<Route path="/gamer/played/:id" component={GamerPlayed} />
		<Route path="/gamer/favorites/:id" component={GamerFavs} />
		<Route path="/gamer/reviews/:id" component={GamerReviews} />
		<Route path="/gamer/:id" component={Gamer} />
	</Switch>
);
