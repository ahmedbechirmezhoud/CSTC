import { View, StyleSheet, TextInput,Alert, Image, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Background from "../../../components/Background/Background";
import BlueButton from "../../../components/BlueButton/BlueButton";
import { updateUserPassword } from "../../../services/auth/accountService";
import { Card } from 'react-native-elements';

export default ChangePwd = () => {

	const [passwordInput, setPassowrdInput] = useState("");
	const [isSecureText, setIsSecureText] = useState(true);
	const [eyeIcon, setEyeIcon] = useState("eye");
	const handlePasswordVisibility = () => {
		if (eyeIcon == "eye") {
			setIsSecureText(false);
			setEyeIcon("eye-with-line");
		} else {
			setIsSecureText(true);
			setEyeIcon("eye");
		}
	};
	const passwordInputHandler = (textInput) => {
		setPassowrdInput(textInput);
	};

	const confirmButtonHandler = () => {
		updateUserPassword(passwordInput)
		Alert.alert(
			"Done!",
			"Your password has changed",
			[
				{
					text: "OK",
					style: "cancel",
				},
			]
		);
	};

	return (
		<Background>
			<Image
                source={require('../../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />

			<Card title="Local Modules" containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Change password </Text>
					<Text style ={{fontSize: 10, fontWeight: "100", marginBottom: 25}} >Memorize it!</Text>
					<View style={styles.inputContainer}>
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
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.inputBox}
							placeholder={"Confirm password"}
							placeholderTextColor='#507686'
							secureTextEntry={isSecureText}
							onChangeText={passwordInputHandler}
							value={passwordInput}
						/>
					</View>
				<BlueButton text={"Confirm"} buttonHandler={confirmButtonHandler} />
			</Card>

		</Background>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#F8F8F8",
		borderColor: "#A8A8A8",
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: "center"

	},
	inputIcon: {
		marginLeft: 10,
	},
	inputBox: {
		flex: 1,
		width:"60%",
		color: "#525252",
		fontSize: 16,
		padding: 10,
		fontWeight:"bold"
	},
	logo:{
        width:"70%",
        resizeMode: "contain",
    },
	container:{
		borderRadius: 21,
		width:Dimensions.get("screen").width-50,
		display:"flex",
		alignItems: "center",
		justifyContent: "center"

	}
});