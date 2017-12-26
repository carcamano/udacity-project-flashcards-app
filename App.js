import React from 'react';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { View, Platform, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { blue, yellow, white } from './utils/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Decks from './scenes/Decks';
import NewDeck from './scenes/NewDeck';
import FlashcardsStatusBar from './components/FlashcardsStatusBar';
import { decks, deck, quiz } from './reducers';
import Deck from './components/Deck';
import NewQuestion from "./scenes/NewQuestion";
import Quiz from './scenes/Quiz';
import { setLocalNotification } from './utils/notifications';

const store = createStore(
	combineReducers({
		decks,
		deck,
		quiz
	}),
	compose(applyMiddleware(thunk)),
);

const Tabs = TabNavigator({
	Decks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name='cards' size={30} color={tintColor}/>),
		},
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => (<MaterialIcons name='add' size={30} color={tintColor}/>),
		}
	},
}, {
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? blue : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : blue,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowRadius: 6,
			shadowOpacity: 1,
		},
		indicatorStyle: {
			backgroundColor: yellow
		},
	},
});

const Stack = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: () => null,
		},
	},
	Deck: {
		screen: Deck,
	},
	NewQuestion: {
		screen: NewQuestion,
		navigationOptions: {
			title: 'New Question',
		},
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			title: 'Quiz',
		},
	},
});

export default class App extends React.Component {

	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<FlashcardsStatusBar
						backgroundColor={blue}
						barStyle='light-content'
					/>
					<Stack/>
				</View>
			</Provider>
		);
	}
}

