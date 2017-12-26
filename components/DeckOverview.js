import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

import { blue, white, gray } from '../utils/colors'

function DeckOverview({ title, questions = [] }) {
	const count = questions.length;

	return (
		<View>

			<View style={styles.deckContainer}>
				<Text style={styles.deckTitle}>{title}</Text>
				<Text style={styles.deckInfo}>Cards: {count}</Text>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	deckContainer: {
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 5,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 1,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 20,
		justifyContent: 'center',
	},
	deckTitle: {
		color: blue,
		fontSize: 25,
		textAlign: 'center',
	},
	deckInfo: {
		color: gray,
		fontSize: 15,
		marginTop: 10,
		textAlign: 'center',
	},
});

export default DeckOverview;