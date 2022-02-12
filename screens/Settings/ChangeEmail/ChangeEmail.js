import { View, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import BlueButton from "../../../components/BlueButton/BlueButton";

export default ChangeEmail = () => {

	const [emailInput, setEmailInput] = useState("");

	const emailInputHandler = (textInput) => {
		setEmailInput(textInput);
	};

	const confirmButtonHandler = () => {
		//Add Update email function here
        Alert.alert(
			"Check your new email",
			"You'll find a confirmation link in your email",
			[
				{
					text: "OK",
					style: "cancel",
				},
			]
		);
	};

	return (
		<GradientBackground>
			<View style={styles.inputContainers}>
				<View style={styles.inputContainer}>
					{/*Email Box */}
					<Entypo
						name='email'
						size={20}
						color='#507686'
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.inputBox}
						placeholder={"E-mail"}
						placeholderTextColor='#507686'
						keyboardType='email-address'
						onChangeText={emailInputHandler}
						value={emailInput}
					/>
				</View>
			</View>
			<BlueButton text={"Confirm"} buttonHandler={confirmButtonHandler} />
		</GradientBackground>
	);
};

const styles = StyleSheet.create({
	inputContainers: {
		width: "70%",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
		borderRadius: 180,
		marginTop: 36,
	},
	inputIcon: {
		marginLeft: 10,
	},
	inputBox: {
		flex: 1,
		color: "#507686",
		fontSize: 16,
		padding: 10,
	},
});
