import React from "react";
import { Alert, StyleSheet, Dimensions, Text } from "react-native";
import { Card } from 'react-native-elements';

import Background from "../../components/Background/Background";
import BlueButton from "../../components/BlueButton/BlueButton";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import SvgQRCode from "react-native-qrcode-svg";

import { CurrentUser } from "../../utils/user";
import { signOut } from "../../services/auth/loginService";
import { useNavigation } from "@react-navigation/native";



const QRCode1 = () => {
	return <SvgQRCode value={CurrentUser.uid} size={150} />;
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
	const updatePorfileButtonHandler = () => {
		navigation.navigate("UpdateProfile");
	};
    const signUpFBHandler = () => {
		
	};

	generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');

	return (
		<Background>
			<Card containerStyle={[styles.QRcontainer, styles.boxShadow]} >
			<QRCode1 />
			<Text style={{ fontSize:10, textAlign:"center", paddingTop:3 }} >Participant <Text style={{ fontWeight:"bold" }} >ID</Text></Text>
			</Card>
			
			<Card title="Local Modules" containerStyle={styles.container} >
			<Text style={{ fontSize:10, textAlign:"center", paddingTop:3, marginTop: Dimensions.get("screen").height/20}} >Update your Acount <Text style={{ fontWeight:"bold" }} >Credentials</Text></Text>
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
						text={"Linked to Facebook"}
						disabled={true}
					/>
				: <BlueButton
						text={"Link your Facebook"}
						buttonHandler={signUpFBHandler}
					/>
				}

				<BlueButton
					text={"SignOut"}
					buttonHandler={signOutButtonHandler}
				/>

			</Card>

		</Background>
	);
};


const styles = StyleSheet.create({
	QRcontainer:{
		borderRadius: 20,
		transform : [{ translateY: 50 }],
		zIndex:500
		
	},
    container:{
        borderRadius: 20,
        width: "100%",
        height:Dimensions.get("screen").height/1.7,
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    logo:{
        width:"40%",
        resizeMode: "contain",
        
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e'
    },
  });

  const generateBoxShadowStyle = (
	xOffset,
	yOffset,
	shadowColorIos,
	shadowOpacity,
	shadowRadius,
	elevation,
	shadowColorAndroid,
  ) => {
	if (Platform.OS === 'ios') {
	  styles.boxShadow = {
		shadowColor: shadowColorIos,
		shadowOffset: {width: xOffset, height: yOffset},
		shadowOpacity,
		shadowRadius,
	  };
	} else if (Platform.OS === 'android') {
	  styles.boxShadow = {
		elevation,
		shadowColor: shadowColorAndroid,
	  };
	}
  };