import React, { useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Alert,
    ScrollView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import LoginButton from '../../components/LoginButton/LoginButton';
import Seperator from "../../components/Seperator/Seperator";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import { CurrentUser } from '../../utils/user';

import { signUpEmail } from "../../services/auth/signupService";
import { signinWithFacebook } from "../../services/auth/loginService";
import { useNavigation } from '@react-navigation/core';

import styles from "./RegisterScreenStyles";

export default RegisterPage = () => {

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [passwordInput, setPassowrdInput] = useState("");
    const [confirmPasswordInput, setConfirmPassowrdInput] = useState("");
    const [isSecureText, setIsSecureText] = useState(true);
    const [eyeIcon, setEyeIcon] = useState("eye");
    const navigation = useNavigation();

    const nameInputHandler = textInput => {
        setNameInput(textInput);
    }
    const emailInputHandler = textInput => {
        setEmailInput(textInput);
    }
    const phoneInputHandler = textInput => {
        setPhoneInput(textInput);
    }
    const passwordInputHandler = textInput => {
        setPassowrdInput(textInput);
    }
    const ConfirmPasswordInputHandler = textInput => {
        setConfirmPassowrdInput(textInput);
    }
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

    const SignUpHandler = () => {
        let title;
        let text;

        if (passwordInput != confirmPasswordInput) {
            title = "Oops";
            text = "The passwords you entered don't match.";
        }
        else if (passwordInput.length < 8) {
            title = "Oops";
            text = "The password must have at least 8 characters.";
        }
        else {
            title = "Almost done!";
            text = "Please click on the link that has just been sent to your email account to verify your email.";
            // Send email verification link
            signUpEmail(emailInput, passwordInput);
        }
        Alert.alert(
            title,
            text,
            [{ text: "OK", style: "cancel" }]
        );
    }
    const SignupFBHandler = () => {
        signinWithFacebook();
        // the code below needs review 
      //  if (CurrentUser.uid)
           navigation.navigate("FbRegistrationCompletion");
      //  else {
      //      Alert.alert(
      //          "Oops",
      //          "Something wrong happened try again or choose an other signup method",
      //          [{ text: "OK", style: "cancel" }]
      //      );
      //  }
    }

    return (
        <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={{ justifyContent: "center" }}>
                    <ScrollView contentContainerStyle={styles.registerContainer} >
                        <View style={styles.inputContainers}>
                            <View style={[styles.inputContainer, { marginTop: 50 }]}>
                                {/*full name Box */}
                                <MaterialIcons name="account-circle"
                                    size={20}
                                    color="#507686"
                                    style={styles.inputIcon} />
                                <TextInput style={styles.inputBox}
                                    placeholder={"Full name"}
                                    placeholderTextColor="#507686"
                                    keyboardType="email-address"
                                    onChangeText={nameInputHandler}
                                    value={nameInput} />
                            </View>

                            <View style={styles.inputContainer}>
                                {/*email Box */}
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
                                {/*Phone box */}
                                <Entypo name="phone"
                                    size={20}
                                    color="#507686"
                                    style={styles.inputIcon} />
                                <TextInput style={styles.inputBox}
                                    placeholder={"Phone number"}
                                    placeholderTextColor="#507686"
                                    keyboardType="numeric"
                                    onChangeText={phoneInputHandler}
                                    value={phoneInput} />
                            </View>

                            <View style={styles.inputContainer}>
                                {/*Primary Password Box */}
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
                            <View style={styles.inputContainer}>
                                {/* Confirm Password Box */}
                                <MaterialIcons name="lock"
                                    size={20}
                                    color="#507686"
                                    style={styles.inputIcon} />
                                <TextInput style={styles.inputBox}
                                    placeholder={"Confirm password"}
                                    placeholderTextColor="#507686"
                                    secureTextEntry={isSecureText}
                                    onChangeText={ConfirmPasswordInputHandler}
                                    value={confirmPasswordInput} />
                                <Entypo name={eyeIcon}
                                    size={20}
                                    color="#507686"
                                    style={styles.inputIcon, { marginRight: 10 }}
                                    onPress={handlePasswordVisibility} />
                            </View>

                        </View>

                        <LoginButton text={"Sign up"} buttonHandler={SignUpHandler} />
                        <Seperator />
                        <FacebookLoginButton text={"Sign up with Facebook"} onPress={SignupFBHandler} />
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback  >
        </LinearGradient>
    );
}