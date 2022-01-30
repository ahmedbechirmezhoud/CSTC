import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import LoginButton from '../../components/LoginButton/LoginButton';
import FacebookLoginButton from '../../components/FacebookLogin/FacebookLogin';
import SimpleTextButton from "../../components/SimpleTextButton/SimpleTextButton.js";
import Seperator from '../../components/Seperator/Seperator';
import styles from './LoginPageStyles';


const IncorrectPasswordPopup = () => (
  Alert.alert(
    "Please try again...",
    "The email and password you entered did not match our records. Please try again.",
    [{ text: "OK", style: "cancel" }]
  )
);


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
    }
    else {
      setIsSecureText(true);
      setEyeIcon("eye");
    }
  }
  const emailInputHandler = textInput => {
    setEmailInput(textInput);
  }
  const passwordInputHandler = textInput => {
    setPassowrdInput(textInput);
  }
  const forgotButtonHandler = () => {
    Keyboard.dismiss();
  }
  const signUpButtonHandler = () => {
    Keyboard.dismiss();
  }
  const CreateAccountButtonHandler = () => {

  }


  return (
    <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>

        <View style={styles.loginContainer}>

          <FontAwesome5 name="react" size={80} color="white" />

          <View style={styles.inputContainers}>

            <View style={styles.inputContainer}>
              <Entypo name="email"
                size={20}
                color="#507686"
                style={styles.inputIcon} />
              <TextInput style={styles.inputBox}
                placeholder={"E-mail"}
                placeholderTextColor="#507686"
                keyboardType="email-address"
                onChangeText={emailInputHandler}
                value={emailInput} />
            </View>

            <View style={styles.inputContainer}>

              <MaterialIcons name="lock"
                size={20}
                color="#507686"
                style={styles.inputIcon} />
              <TextInput style={styles.inputBox}
                placeholder={"Password"}
                placeholderTextColor="#507686"
                secureTextEntry={isSecureText}
                onChangeText={passwordInputHandler}
                value={passwordInput} />
              <Entypo name={eyeIcon}
                size={20}
                color="#507686"
                style={styles.inputIcon, { marginRight: 10 }}
                onPress={handlePasswordVisibility} />
            </View>

            <SimpleTextButton text='Forgot password?' buttonHandler={forgotButtonHandler} />
          </View>

          <LoginButton text={"Sign in"} buttonHandler={signUpButtonHandler} />

          <Seperator/>

          <FacebookLoginButton text={"Sign in with Facebook"} />

          <SimpleTextButton text='Create an account' onPress={() => navigation.navigate("Register")} style = {{marginVertical:16}}/>

        </View>
      </TouchableWithoutFeedback >
    </LinearGradient>
  );
}

