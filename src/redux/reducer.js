const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_GAMES = 'GET_GAMES';
const SET_PROFILE = 'SET_PROFILE';

const initialState = {
	games: [],
	currentUserProfile: [],
	currentUser: [],
	favGames: [],
	playedGames: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_GAMES:
			return Object.assign({}, state, { games: action.payload });
		case SET_CURRENT_USER:
			return Object.assign({}, state, { currentUser: action.payload });
		case SET_PROFILE:
			return Object.assign({}, state, { games: action.payload });
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
export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		payload: user
	};
}

export default reducer;
