import React, { useState } from "react";
import { Alert, Keyboard, Text, View, TextInput } from "react-native";

import GradientBackground from "../../components/GradientBackground/GradientBackground";
import BlueButton from "../../components/BlueButton/BlueButton";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import SvgQRCode from "react-native-qrcode-svg";

import { CurrentUser } from "../../utils/user";
import { signOut } from "../../services/auth/loginService";
import { useNavigation } from "@react-navigation/native";

/*
****************************** REMEMBER TO VERIFY BEFORE MERGING  : ******************************
./QRCode()
index/navigation
LoginScreen/forgotButtonHandler
*/
const QRCode1 = () => {
	return <SvgQRCode value={CurrentUser.uid} size={150} />;
	// return <SvgQRCode value={"AvqqJxKlARfijulINHYkbciM58z1"} />;
};

export default SettingsScreen = () => {
	const navigation = useNavigation();
	const signOutButtonHandler = () => {
		Alert.alert("Are you sure that you want to sign out?", "", [
			{
				text: "No",
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					signOut();
				},
				style: "cancel",
			},
		]);
	};
	const addEmailButtonHandler = () => {
		navigation.navigate("AddEmail");
	};
	const changeEmailButtonHandler = () => {
		navigation.navigate("ChangeEmail");
	};
	const changePwdButtonHandler = () => {
		navigation.navigate("ChangePwd");
	};
    const signUpFBHandler = () => {
		
	};
	return (
		<GradientBackground>
			<QRCode1 />
			<BlueButton
				text={"Change password"}
				buttonHandler={changePwdButtonHandler}
			/>
			<BlueButton
				text={"Change email"}
				buttonHandler={changeEmailButtonHandler}
			/>

			{CurrentUser.fbToken 
            ? <BlueButton
					text={"Link your email"}
					buttonHandler={addEmailButtonHandler}
				/>
			 : <FacebookLoginButton
					text={"Link your Facebook account"}
					onPress={signUpFBHandler}
                    style={{    marginBottom: 16,marginTop: 16}}
				/>
			}

			<BlueButton
				text={"Sign out"}
				buttonHandler={signOutButtonHandler}
			/>
		</GradientBackground>
	);
};
