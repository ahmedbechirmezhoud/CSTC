import React, { useState } from "react";
import { View, TextInput, Alert, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Background from "../../components/Background/Background";
import BlueButton from "../../components/BlueButton/BlueButton";
import { useNavigation } from "@react-navigation/core";
import styles from "./ForgotPwdScreenStyles";
export default function FbRegistrationScreen() {
	const [emailInput, setEmailInput] = useState("");
	const navigation = useNavigation();

	const emailInputHandler = (textInput) => {
		setEmailInput(textInput);
	};
	const resetButtonHandler = () => {
		//Insert function here
		Alert.alert(
			"Check your email",
			"You'll find your new password in your email",
			[
				{
					text: "OK",
					onPress: () => navigation.navigate("Login"),
					style: "cancel",
				},
			]
		);
	};

	return (
		<Background>
					<View style={styles.inputContainers}>
						<View style={styles.inputContainer}>
							{/*email Box */}
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

					<BlueButton
						text={"Reset password"}
						buttonHandler={resetButtonHandler}
					/>
		</Background>
	);
}
