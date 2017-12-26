import { AsyncStorage } from 'react-native';

const dataSample = {
	// React Deck
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	// Javascript Deck
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
};

function restoreDefault() {
	AsyncStorage.setItem('decks', JSON.stringify(dataSample));
}

// restoreDefault();


export function addDeck(deck) {
	return AsyncStorage.mergeItem('decks', JSON.stringify({ [deck.title]: deck }));
}

export function getDecks() {
	return AsyncStorage.getItem('decks')
		.then(res => JSON.parse(res));
}
