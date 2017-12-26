import * as API from '../utils/api';

export const ADD_DECK = 'ADD_DECK';
export const FETCH_DECKS = 'FETCH_DECKS';
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK';
export const NEXT_CARD = 'NEXT_CARD';
export const RESET_QUIZ = 'RESET_QUIZ';
export const INCREMENT_CORRECT = 'INCREMENT_CORRECT';

export const submitDeck = (deck) => dispatch => {
	return API.addDeck(deck)
		.then(() => dispatch(addDeck(deck)));
};

export const updateDeck = (deck) => dispatch => {
	return API.addDeck(deck)
		.then(() => dispatch(addDeck(deck)))
		.then(() => dispatch(setCurrentDeck(deck)))
		.then(() => dispatch(getDecks()));
};

export const getDecks = () => dispatch => {
	return API.getDecks()
		.then(decks => dispatch(fetchDecks(decks)));
};

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck,
	};
}

export function nextCard() {
	return {
		type: NEXT_CARD,
	};
}

export function resetQuiz() {
	return {
		type: RESET_QUIZ,
	}
}

export function incrementCorrect() {
	return {
		type: INCREMENT_CORRECT,
	}
}

export function fetchDecks(decks) {
	return {
		type: FETCH_DECKS,
		decks,
	};
}

export function setCurrentDeck(deck) {
	return {
		type: SET_CURRENT_DECK,
		deck,
	};
}
