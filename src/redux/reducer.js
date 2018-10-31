import axios from 'axios';
const DELETE_GAME = 'DELETE_GAME';
const ADD_GAME = 'ADD_GAME';
const GET_GAMES = 'GET_GAMES';

const initialState = {
	games2: [],
	filterArray: [],
	holder: '/api/games',
	currentHolder: '',
	currentUser: [],
	favGames: [],
	playedGames: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case DELETE_GAME:
			return Object.assign({}, state, { games: action.payload });
		case ADD_GAME:
			return Object.assign({}, state, { games: action.payload });
		case `${GET_GAMES}_FULFILLED`:
			return Object.assign({}, state, { games2: action.payload });
		default:
			return state;
	}
}

export function getGames(holder, currentHolder) {
	return {
		type: GET_GAMES,
		payload: axios.get(`${holder}${currentHolder}`).then((result) => {
			return result.data;
		})
	};
}

export function deleteGame(id) {
	return {
		type: DELETE_GAME,
		payload: axios.delete(`/api/games/${id}`).then((result) => {
			return result.data;
		})
	};
}
export function addGame(game) {
	return {
		type: ADD_GAME,
		payload: axios.post('/api/games', game).then((result) => {
			return result.data;
		})
	};
}
export function updateFilter(filterArray, str) {
	return {};
}

export default reducer;
