import React from "react";
import { Keyboard, Text, View } from "react-native";
import GradientBackground from "../../components/GradientBackground/GradientBackground";
import BlueButton from "../../components/BlueButton/BlueButton";
import { CurrentUser } from "../../utils/user";

import SvgQRCode from 'react-native-qrcode-svg';

/*
****************************** REMEMBER TO VERIFY BEFORE MERGING  : ******************************
./QRCode()

*/
const QRCode = ()  =>{
    // return <SvgQRCode value={CurrentUser.uid} />;
    return <SvgQRCode value={"AvqqJxKlARfijulINHYkbciM58z1"} />;
  }
  const AddEmail = () => {

    const [emailInput, setEmailInput] = useState("");
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
	const emailInputHandler = (textInput) => {
		setEmailInput(textInput);
	};
	const passwordInputHandler = (textInput) => {
		setPassowrdInput(textInput);
	};
      return (
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
        </View>
      )
  }
export default SettingsScreen = () => {
	return <GradientBackground>

        <QRCode/>
        <BlueButton text = {"Change password"}/>
        <BlueButton text= {"Change email"}/>
        
    </GradientBackground>;
};