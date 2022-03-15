import { View, StyleSheet, TextInput,Alert } from "react-native";
import React, { useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Background from "../../../components/Background/Background";
import BlueButton from "../../../components/BlueButton/BlueButton";
import { updateUserPassword } from "../../../services/account/accountService";

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
			<View style={styles.inputContainers}>

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
			</View>
			<BlueButton text={"Confirm"} buttonHandler={confirmButtonHandler} />
		</Background>
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
