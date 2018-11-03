const axios = require('axios');
const SET_USER = 'SET_USER';
const SET_USER_FAVS = 'SET_USER_FAVS';
const SET_USER_REVIEWS = 'SET_USER_REVIEWS';
const SET_USER_PLAYED = 'SET_USER_PLAYED';
const SET_USER_FAVORITES = 'SET_USER_FAVORITES';
const SET_GAMES = 'GET_GAMES';
const SET_PROFILE = 'SET_PROFILE';

const initialState = {
	games: [],
	user: [],
	userProfile: [],
	userFavs: [],
	userPlayed: [],
	userReviews: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_GAMES:
			return Object.assign({}, state, { games: action.payload });
		case `${SET_USER}_FULFILLED`:
			return Object.assign({}, state, { user: action.payload });
		case `${SET_USER_REVIEWS}_FULFILLED`:
			return Object.assign({}, state, { userReviews: action.payload });
		case `${SET_USER_PLAYED}_FULFILLED`:
			return Object.assign({}, state, { userPlayed: action.payload });
		case `${SET_USER_FAVORITES}_FULFILLED`:
			return Object.assign({}, state, { userFavs: action.payload });
		case SET_PROFILE:
			return Object.assign({}, state, { userProfile: action.payload });
		case SET_USER_FAVS:
			return Object.assign({}, state, { userFavs: action.payload });
		default:
			return state;
	}
}

export function setGames(games) {
	return {
		type: SET_GAMES,
		payload: games
	};
}
export function setUser() {
	return {
		type: SET_USER,
		payload: axios.get('/api/user/').then((response) => {
			return response.data;
		})
	};
}
export function setUserFavGames() {
	return {
		type: SET_USER_FAVS,
		payload: axios.get('/api/user/favorites').then((result) => {
			return result.data;
		})
	};
}
export function setUserReviews() {
	return {
		type: SET_USER_REVIEWS,
		payload: axios.get(`/api/user/reviews`).then((result) => {
			return result.data;
		})
	};
}
export function setUserPlayed() {
	return {
		type: SET_USER_PLAYED,
		payload: axios.get(`/api/user/played`).then((result) => {
			return result.data;
		})
	};
}
export function setUserFavs() {
	return {
		type: SET_USER_FAVORITES,
		payload: axios.get(`/api/user/favorites`).then((result) => {
			return result.data;
		})
	};
}

export default reducer;
