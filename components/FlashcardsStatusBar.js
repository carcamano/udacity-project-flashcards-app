import React from 'react';
import { StatusBar, View } from 'react-native'
import { Constants } from 'expo';

export default function FlashcardsStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}