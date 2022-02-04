import React from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
	ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({ children }) {
	return (
		<LinearGradient
			colors={["#1A2980", "#1CB5E0"]}
			style={styles.background}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ justifyContent: "center" }}>
					<ScrollView
						contentContainerStyle={styles.registerContainer}>
						{children}
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
	},
	registerContainer: {
		justifyContent: "center",
		alignItems: "center",
		minWidth: "100%",
	},
});
