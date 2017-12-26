import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform, Text, TouchableOpacity, Animated } from 'react-native';
import { blue, green, orange, white } from "../utils/colors";
import { incrementCorrect, nextCard } from "../actions/index";

function TextAndButton({ text, buttonLabel, onPress }) {
	return (
		<View style={styles.textAndButonContainer}>
			<Text style={styles.textHeader}>{text}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.textLink}>{buttonLabel}</Text>
			</TouchableOpacity>
		</View>
	);
}

class Card extends Component {
	state = {
		showAnswer: false,
		slideAnim: new Animated.Value(300),
	};

	componentDidMount() {
		const { slideAnim } = this.state;
		Animated.spring(slideAnim, {
			toValue: 0,
			friction: 8,
		}).start();
	}

	componentWillUnmount() {
		const { slideAnim } = this.state;
		Animated.spring(slideAnim, {
			toValue: -300,
			friction: 8,
		}).start();
	}

	toggleCard = () => {
		this.setState((state) => ({ showAnswer: !state.showAnswer }));
	};

	correct = () => {
		const { dispatch } = this.props;
		dispatch(nextCard());
		dispatch(incrementCorrect());
	};

	incorrect = () => {
		const { dispatch } = this.props;
		dispatch(nextCard());
	};

	render() {
		const { question, answer } = this.props;
		const { showAnswer, slideAnim } = this.state;
		const slide = {
			transform: [
				{ translateX: slideAnim }
			],
		};


		return (
			<Animated.View style={[{ flex: 1 }, slide]}>

				{!showAnswer
					?
					<View style={[styles.cardContainer]}>

						<TextAndButton
							text={question}
							buttonLabel={'Answer'}
							onPress={this.toggleCard}
						/>

						<View style={styles.btnContainer}>
							<TouchableOpacity style={styles.btnCorrect} onPress={this.correct}>
								<Text style={styles.btnText}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btnIncorrect} onPress={this.incorrect}>
								<Text style={styles.btnText}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>
					:
					<View style={[styles.cardContainer]}>
						<TextAndButton
							text={answer}
							buttonLabel={'Question'}
							onPress={this.toggleCard}
						/>
					</View>
				}

			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 5,
		elevation: 1,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 20,
		justifyContent: 'center',
		flex: 1,
	},
	cardBack: {
		position: "absolute",
		top: 0,
	},
	textAndButonContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnContainer: {
		flex: 1,
		marginBottom: 20,
	},
	btnCorrect: {
		flex: 1,
		backgroundColor: green,
		marginBottom: 10,
		padding: 30,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnIncorrect: {
		flex: 1,
		backgroundColor: orange,
		padding: 30,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textHeader: {
		fontSize: 28,
		marginBottom: 10,
	},
	textLink: {
		color: blue,
		padding: 15,
	},
	btnText: {
		color: white,
	},
});

export default connect()(Card);