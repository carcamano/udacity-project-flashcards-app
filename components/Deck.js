import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

import { blue, white, gray, green } from '../utils/colors'

class Deck extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.title}`,
	});

	navigateToQuiz() {
		const { navigation } = this.props;
		clearLocalNotification().then(setLocalNotification);
		navigation.navigate('Quiz')
	}

	render() {
		const { title, navigation, questions = [] } = this.props;
		const count = questions.length;

		return (
			<View style={{ flex: 1 }} key={count}>

				<View style={styles.deckContainer}>

					<Text style={styles.deckTitle}>{title}</Text>
					<Text style={styles.deckInfo}>Cards: {count}</Text>

					<View style={styles.btnContainer}>

						<TouchableOpacity
							style={styles.btnGreen}
							onPress={() => navigation.navigate('NewQuestion')}
						>
							<Text style={styles.btnText}>Add Card</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.btnBlue}
							onPress={() => this.navigateToQuiz()}
						>
							<Text style={styles.btnText}>Start Quiz</Text>
						</TouchableOpacity>

					</View>

				</View>

			</View>
		);
	};
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
		marginBottom: 20,
		justifyContent: 'center',
		flex: 1,
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
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginTop: 'auto',
	},
	btnBlue: {
		backgroundColor: blue,
		margin: 5,
		padding: 15,
		borderRadius: 2,
	},
	btnGreen: {
		backgroundColor: green,
		margin: 5,
		padding: 15,
		borderRadius: 2,
	},
	btnText: {
		color: white,
		fontSize: 18,
		textAlign: 'center',
	}
});

function mapStateToProps({ deck }) {
	return {
		title: deck.title,
		questions: deck.questions,
	};
}

export default connect(mapStateToProps)(Deck);