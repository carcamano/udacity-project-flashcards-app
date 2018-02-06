import {
	ADD_DECK,
	FETCH_DECKS,
	SET_CURRENT_DECK,
	INCREMENT_CORRECT,
	NEXT_CARD,
	RESET_QUIZ
} from '../actions';

export function decks(state = {}, action) {
	switch (action.type) {

		case ADD_DECK:
			return {
				...state,
				[action.deck.title]: action.deck,
			};

		case FETCH_DECKS:
			return {
				...state,
				...action.decks,
			};

		default:
			return state;

	}
}

export function deck(state = {}, action) {
	switch (action.type) {

		case SET_CURRENT_DECK:
		case ADD_DECK:
			return {
				...state,
				...action.deck,
				currentCard: 0,
			};

		case NEXT_CARD:
			return {
				...state,
				currentCard: ++state.currentCard,
			};

		case RESET_QUIZ:
			return {
				...state,
				currentCard: 0,
			};

		default:
			return state;

	}
}

export function quiz(state = {}, action) {
	switch (action.type) {

		case RESET_QUIZ:
			return {
				...state,
				correctCount: 0,
			};

		case INCREMENT_CORRECT:
			return {
				...state,
				correctCount: ++state.correctCount,
			};

		default:
			return state;

	}
}