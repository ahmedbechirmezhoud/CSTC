import React, { useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Alert
} from "react-native";
import { signUpEmail } from "../../services/auth/signupService";
import LoginButton from '../../components/LoginButton/LoginButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from "./RegisterScreenStyles";

export default RegisterPage = () => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPassowrdInput] = useState("");
    const [confirmPasswordInput, setConfirmPassowrdInput] = useState("");
    const [isSecureText, setIsSecureText] = useState(true);
    const [eyeIcon, setEyeIcon] = useState("eye");

    const emailInputHandler = textInput => {
        setEmailInput(textInput);
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
        else if (passwordInput.length < 8){
                title = "Oops";
                text = "The password must have at least 8 characters.";
            }
        else{ 
                title = "Almost done!";
                text = "Please click on the link that has just been sent to your email account to verify your email.";
                // Send email verification link
                signUpEmail(emailInput,passwordInput);
        }
        Alert.alert(
            title,
            text,
            [{ text: "OK", style: "cancel" }]
        );
    }

    return (
        <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>

                <KeyboardAvoidingView style={styles.registerContainer}>

                    <View style={styles.inputContainers}>


                        <View style={styles.inputContainer}>
                            {/*full name Box */}
                            <MaterialIcons name="account-circle"
                                size={20}
                                color="#507686"
                                style={styles.inputIcon} />
                            <TextInput style={styles.inputBox}
                                placeholder={"Full name"}
                                placeholderTextColor="#507686"
                                keyboardType="email-address"
                                onChangeText={emailInputHandler}
                                value={emailInput} />
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
                                placeholder={"Confirm Password"}
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

                    <LoginButton text={"Sign Up"} buttonHandler={SignUpHandler} />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback  >
        </LinearGradient>
    );
}