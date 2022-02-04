import React from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({ children }) {
	return (
		<LinearGradient
			colors={["#1A2980", "#1CB5E0"]}
			style={styles.background}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{children}
			</TouchableWithoutFeedback>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
	},
});
