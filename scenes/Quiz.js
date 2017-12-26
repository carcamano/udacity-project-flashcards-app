import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Card from "../components/Card";
import { green, blue, orange } from "../utils/colors";
import { resetQuiz } from "../actions/index";


class QuizResult extends Component {

	state = {
		anim: new Animated.Value(1),
	};

	componentDidMount() {
		const { anim } = this.state;
		Animated.sequence([
			Animated.timing(anim, {
				toValue: 1.2,
				duration: 200,
			}),
			Animated.spring(anim, {
				toValue: 1,
				friction: 8,
			})
		]).start();
	}

	render() {
		const { rating } = this.props;
		const { anim } = this.state;

		if (rating < 50) {
			return (
				<Animated.View style={
					[
						styles.container,
						{ transform: [{ scale: anim }] }
					]}>
					<MaterialIcons color={orange} name='sentiment-very-dissatisfied' size={60}/>
					<Text style={[styles.resultHeader, { color: orange }]}>You can do any better.</Text>
					<Text style={styles.resultText}>Your answers was {parseFloat(rating).toFixed(0)}% correct.</Text>
				</Animated.View>
			);
		}

		return (
			<Animated.View style={[
				styles.container,
				{ transform: [{ scale: anim }] }
			]}>
				<MaterialIcons color={green} name='sentiment-very-satisfied' size={60}/>
				<Text style={[styles.resultHeader, { color: green }]}>Congrats!</Text>
				<Text style={styles.resultText}>Your answers was {parseFloat(rating).toFixed(0)}% correct!</Text>
			</Animated.View>
		);
	}
}

class Quiz extends Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(resetQuiz());
	}

	render() {
		const { questions = [], currentCard, correctCount } = this.props;
		const card = questions[currentCard];
		const end = currentCard >= questions.length;
		const currentLabel = end ? questions.length : currentCard + 1;

		if (questions.length <= 0) {
			return (
				<View style={styles.container}>
					<MaterialCommunityIcons color={blue} size={50} name='emoticon-sad'/>
					<Text style={{ color: blue }}>No cards registered.</Text>
					<Text style={{ color: blue }}>Please, add some cards.</Text>
				</View>
			);
		}

		return (
			<View style={{ flex: 1 }}>
				{!end && <Text style={styles.countLabel}>{currentLabel} / {questions.length}</Text>}
				{
					!end
						?
						<Card
							key={card.answer}
							question={card.question}
							answer={card.answer}
						/>
						:
						<QuizResult
							rating={(correctCount / questions.length) * 100}
						/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countLabel: {
		color: blue,
		fontSize: 18,
		marginTop: 10,
		marginRight: 10,
		textAlign: 'right'
	},
	resultHeader: {
		fontSize: 25,
		marginTop: 10,
		marginBottom: 5,
	},
	resultText: {
		fontSize: 18,
	},
});

function mapStateToProps({ deck, quiz }) {
	return {
		title: deck.title,
		questions: deck.questions,
		currentCard: deck.currentCard,
		correctCount: quiz.correctCount,
	};
}

export default connect(mapStateToProps)(Quiz);