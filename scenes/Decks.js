import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, setCurrentDeck } from '../actions';
import DeckOverview from '../components/DeckOverview';

class Decks extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getDecks());
	}

	navigateToDeck = (deck) => {
		const { navigation, dispatch } = this.props;
		dispatch(setCurrentDeck(deck));
		navigation.navigate('Deck', { title: `${deck.title} Deck` });
	};

	render() {
		const { decks = [] } = this.props;

		return (
			<ScrollView>
				{
					decks.map((deck) => (
						<TouchableOpacity key={deck.title} onPress={() => this.navigateToDeck(deck)}>
							<DeckOverview {...deck}/>
						</TouchableOpacity>
					))
				}
			</ScrollView>
		);
	}
}

function mapStateToProps({ decks }) {
	return {
		decks: Object.keys(decks).map(k => decks[k]),
	};
}

export default connect(mapStateToProps)(Decks);