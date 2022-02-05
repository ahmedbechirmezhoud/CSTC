import React, { useState }  from "react";
import { Alert, Keyboard, Text, View,TextInput } from "react-native";

import GradientBackground from "../../components/GradientBackground/GradientBackground";
import BlueButton from "../../components/BlueButton/BlueButton";
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
	// return <SvgQRCode value={CurrentUser.uid} />;
	return <SvgQRCode value={"AvqqJxKlARfijulINHYkbciM58z1"} size={150} />;
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
                    navigation.navigate("Login");
                    signOut();
                },
                style: "cancel",
            },
        ]);
    };
    const addEmailButtonHandler = () => {
        navigation.navigate("AddEmail");
    }
     const changeEmailButtonHandler = () => {
        navigation.navigate("ChangeEmail");
    }
    const changePwdButtonHandler = () => {
        navigation.navigate("ChangePwd");
    }



	return (
		<GradientBackground>
			<QRCode1 />
			<BlueButton text={"Change password"} buttonHandler={changePwdButtonHandler}/>
			<BlueButton text={"Change email"} buttonHandler={changeEmailButtonHandler} />
            <BlueButton text={"Link your email"} buttonHandler={addEmailButtonHandler}  />
			<BlueButton
				text={"Sign out"}
				buttonHandler={signOutButtonHandler}
			/>
		</GradientBackground>
	);
};
