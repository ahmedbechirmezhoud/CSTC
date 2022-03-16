import { StyleSheet, Alert, Image, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import Background from "../../../components/Background/Background";
import BlueButton from "../../../components/BlueButton/BlueButton";
import { Card } from 'react-native-elements';
import PasswordInput from "../../../components/PasswordInput";
import { updateUserPassword } from "../../../services/account/accountService";

export default ChangePwd = () => {

	const [passwordInput, setPassowrdInput] = useState("");
	const [currPass, setCurrPass ] = useState('');
	const [confPass, setConfPass ] = useState('');

	isValid = (password) => password.length >= 8 

	const confirmButtonHandler = () => {
		if(isValid(passwordInput) && isValid(currPass) && isValid(confPass) ){
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
		}

		

	return (
		<Background>
			<Image
                source={require('../../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />

			<Card title="Local Modules" containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Change password </Text>
					<Text style ={{fontSize: 10, fontWeight: "100", marginBottom: 25}} >Memorize it!</Text>
					<PasswordInput placeholder="Current password" value={currPass} onChange={setCurrPass} />
					<PasswordInput placeholder="New password" value={passwordInput} onChange={setPassowrdInput} />
					<PasswordInput placeholder="Confirm new password" value={confPass} onChange={setConfPass} />
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
