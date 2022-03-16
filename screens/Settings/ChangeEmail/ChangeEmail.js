import { View, StyleSheet, TextInput,Alert, Image, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import Background from "../../../components/Background/Background";
import BlueButton from "../../../components/BlueButton/BlueButton";
import { Card } from 'react-native-elements';
import PasswordInput from "../../../components/PasswordInput";

export default ChangeEmail = () => {

	const [emailInput, setEmailInputInput] = useState("");
	const [passwordInput, setPassowrdInput] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const emailInputHandler = (textInput) => {
		setEmailInputInput(textInput);
		(String(textInput)
		.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)) ? setValidEmail(true) : setValidEmail(false);
	};

	const confirmButtonHandler = () => {
		if(validEmail){
			Alert.alert(
				"Done!",
				"Your Email has changed",
				[
					{
						text: "OK",
						style: "cancel",
					},
				]
			);
		}
	};

	return (
		<Background>
			<Image
                source={require('../../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />

			<Card title="Local Modules" containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Change your Email</Text>
					<Text style ={{fontSize: 10, fontWeight: "100", marginBottom: 25}} >a confirmation mail will be send ! please click on the confirmation link</Text>
					<View style={[styles.inputContainer, !validEmail && styles.invalidInput]}>
						<TextInput
							style={styles.inputBox}
							placeholder={"New Email"}
							placeholderTextColor='#507686'
							onChangeText={emailInputHandler}
							value={emailInput}
						/>
					</View>
					<PasswordInput placeholder={"Your password"} value={passwordInput} onChange={setPassowrdInput} />
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

	},
	invalidInput:{
		borderColor: "red",
		borderWidth: 2
	}
});
