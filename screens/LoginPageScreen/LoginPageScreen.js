import React, { useState } from "react";
import {
	View,
	Alert,
	TextInput,
	TouchableOpacity,
	Keyboard,
} from "react-native";

import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import GradientBackground from "../../components/GradientBackground/GradientBackground";
import { signinWithFacebook } from "../../services/auth/loginService";
import { useNavigation } from "@react-navigation/core";
import { CurrentUser } from "../../utils/user";

import BlueButton from "../../components/BlueButton/BlueButton";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import SimpleTextButton from "../../components/SimpleTextButton/SimpleTextButton.js";
import Seperator from "../../components/Seperator/Seperator";
import styles from "./LoginPageStyles";

const IncorrectPasswordPopup = () =>
	Alert.alert(
		"Please try again...",
		"The email and password you entered did not match our records. Please try again.",
		[{ text: "OK", style: "cancel" }]
	);

const signUpButtonHandler = () => {
	Keyboard.dismiss();
};
const SigninFBHandler = () => {
	signinWithFacebook();
	// the code below needs review

	if (CurrentUser.uid) {
		//Should be updated when facebook signin is done
		navigation.navigate("Timeline");
	} else {
		Alert.alert(
			"Oops",
			"Something wrong happened try again or choose an other signin method",
			[{ text: "OK", style: "cancel" }]
		);
	}
};
const CreateAccountButtonHandler = () => {};

export default LoginPageScreen = () => {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPassowrdInput] = useState("");
	const [isSecureText, setIsSecureText] = useState(true);
	const [eyeIcon, setEyeIcon] = useState("eye");
	const navigation = useNavigation();

	const handlePasswordVisibility = () => {
		if (eyeIcon == "eye") {
			setIsSecureText(false);
			setEyeIcon("eye-with-line");
		} else {
			setIsSecureText(true);
			setEyeIcon("eye");
		}
	};
	const emailInputHandler = (textInput) => {
		setEmailInput(textInput);
	};
	const passwordInputHandler = (textInput) => {
		setPassowrdInput(textInput);
	};
	const forgotButtonHandler = () => {
		Keyboard.dismiss();
		//CHNAGE THIS WHEN MERGING
		// navigation.navigate("ForgotPwd");
		navigation.navigate("Settings");
	};

	return (
		<GradientBackground>
			<FontAwesome5 name='react' size={80} color='white' />
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

				<View style={styles.inputContainer}>
					{/*Password Box */}
					<MaterialIcons
						name='lock'
						size={20}
						color='#507686'
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.inputBox}
						placeholder={"Password"}
						placeholderTextColor='#507686'
						secureTextEntry={isSecureText}
						onChangeText={passwordInputHandler}
						value={passwordInput}
					/>
					<Entypo
						name={eyeIcon}
						size={20}
						color='#507686'
						style={(styles.inputIcon, { marginRight: 10 })}
						onPress={handlePasswordVisibility}
					/>
				</View>

				<SimpleTextButton
					text='Forgot password?'
					onPress={forgotButtonHandler}
				/>
			</View>

			<BlueButton text={"Sign in"} buttonHandler={signUpButtonHandler} />

			<Seperator />

			<FacebookLoginButton
				text={"Sign in with Facebook"}
				onPress={SigninFBHandler}
			/>

			<SimpleTextButton
				text='Create an account'
				onPress={() => navigation.navigate("Register")}
				style={{ marginVertical: 16 }}
			/>
		</GradientBackground>
	);
};
