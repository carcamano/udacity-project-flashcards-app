import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
	TextInput
} from 'react-native';

import { blue, white, gray } from '../utils/colors'
import { updateDeck } from '../actions';

class NewQuestion extends Component {

	state = {
		question: '',
		answer: '',
	};

	submit = () => {
		const { dispatch, title, questions = [] } = this.props;
		const { question, answer } = this.state;

		if (title && questions) {
			dispatch(
				updateDeck({
					title,
					questions: [...questions, { question, answer }],
				})
			);

			this.questionInput.focus();
			this.questionInput.clear();
			this.answerInput.clear();
			this.setState({ question: '', answer: '' });

		}
	};

	render() {

		const { title } = this.props;

		return (
			<KeyboardAvoidingView behavior={'padding'} style={styles.container}>
				<View>

					<Text style={[styles.deckTitle, { marginBottom: 30 }]}>{title}</Text>
					<Text style={[styles.imputLabel, { marginBottom: 30 }]}>Add a question to Deck</Text>

					<Text style={styles.imputLabel}>Question</Text>
					<TextInput
						ref={input => {
							this.questionInput = input
						}}
						style={styles.textInput} underlineColorAndroid='transparent'
						onChangeText={(text) => this.setState({ question: text })}
					/>

					<Text style={[styles.imputLabel, { marginTop: 25 }]}>Answer</Text>
					<TextInput
						ref={input => {
							this.answerInput = input
						}}
						style={styles.textInput} underlineColorAndroid='transparent'
						onChangeText={(text) => this.setState({ answer: text })}
					/>

					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
						onPress={this.submit}
					>
						<Text style={styles.submitBtnText}>Submit</Text>
					</TouchableOpacity>

				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
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
		fontSize: 35,
		textAlign: 'center',
	},
	imputLabel: {
		color: gray,
		fontSize: 18,
	},
	textInput: {
		borderColor: blue,
		borderWidth: 1,
		borderRadius: 2,
		padding: 5,
		fontSize: 18,
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
	iosSubmitBtn: {
		color: white,
		marginTop: 35,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	AndroidSubmitBtn: {
		backgroundColor: blue,
		marginTop: 35,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function mapStateToProps({ deck }) {
	return {
		title: deck.title,
		questions: deck.questions,
	};
}

export default connect(mapStateToProps)(NewQuestion);