import React, { useContext, useState } from "react";
import {
	View,
	Alert,
	TextInput,
	TouchableOpacity,
	Keyboard,
} from "react-native";

import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import Background from "../../components/Background/Background";
import { signinWithFacebook, loginUser } from "../../services/auth/loginService";
import { useNavigation } from "@react-navigation/core";
import { CurrentUser } from "../../utils/user";

import BlueButton from "../../components/BlueButton/BlueButton";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import SimpleTextButton from "../../components/SimpleTextButton/SimpleTextButton.js";
import Seperator from "../../components/Seperator/Seperator";
import styles from "./LoginPageStyles";
import { InfoContext } from "../../Context/InfoContext";

const IncorrectPasswordPopup = () =>
	Alert.alert(
		"Please try again...",
		"The email and password you entered did not match our records. Please try again.",
		[{ text: "OK", style: "cancel" }]
	);



const CreateAccountButtonHandler = () => {};

export default LoginPageScreen = () => {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPassowrdInput] = useState("");
	const [isSecureText, setIsSecureText] = useState(true);
	const [eyeIcon, setEyeIcon] = useState("eye");
	const navigation = useNavigation();
	const {info, dispatchInfo} = useContext(InfoContext);

	const signUpButtonHandler = () => {
		Keyboard.dismiss();

		loginUser(emailInput, passwordInput).catch((error)=> {
			dispatchInfo({payload : {error}});	
		})

		
	};

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
		navigation.navigate("ForgotPwd");
	};


	const SigninFBHandler = () => {
		signinWithFacebook().catch((error)=> {
			dispatchInfo({payload : {error}});	
		})	

	};

	return (
		<Background>
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
		</Background>
	);
};
