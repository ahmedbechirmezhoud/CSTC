import React, { useState } from "react";
import {
    Text,
    View,
    Alert,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { signinWithEmail } from "../../services/auth/loginService";
import { signinWithFacebook } from "../../services/auth/loginService";
import { useNavigation } from "@react-navigation/core";
import { CurrentUser } from "../../utils/user";

import LoginButton from "../../components/LoginButton/LoginButton";
import FacebookLoginButton from "../../components/FacebookLogin/FacebookLogin";
import SimpleTextButton from "../../components/SimpleTextButton/SimpleTextButton.js";
import Seperator from "../../components/Seperator/Seperator";
import styles from "./LoginPageStyles";

const SigninFBHandler = () => {
    signinWithFacebook();

    //   ***** the code below needs review, missing exception catchs *****

    // if (CurrentUser.uid) {
    //     //Should be updated when facebook signin is done
    //     navigation.navigate("Timeline");
    // } else {
    //     Alert.alert(
    //         "Oops",
    //         "Something wrong happened try again or choose an other signin method",
    //         [{ text: "OK", style: "cancel" }]
    //     );
    // }
};
const CreateAccountButtonHandler = () => {};

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
    const forgotButtonHandler = () => {
        Keyboard.dismiss();
        navigation.navigate("ForgotPwd");
    };
    const signUpButtonHandler = () => {
        Keyboard.dismiss();
        signinWithEmail(emailInput, passwordInput);
        // 
        //   ***** the code below needs review, missing exception catchs *****
        // if (CurrentUser.uid) {
        //
        //     navigation.navigate("Timeline");
        // } else {
        //        Alert.alert(
        //     "Please try again...",
        //     "The email and password you entered did not match our records. Please try again or reset your password.",
        //     [{ text: "OK", style: "cancel" }]
        //  );
        // }
    };

    return (
        <LinearGradient
            colors={["#1A2980", "#1CB5E0"]}
            style={styles.background}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <View style={styles.loginContainer}>
                    <FontAwesome5 name="react" size={80} color="white" />

                    <View style={styles.inputContainers}>
                        <View style={styles.inputContainer}>
                            <Entypo
                                name="email"
                                size={20}
                                color="#507686"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.inputBox}
                                placeholder={"E-mail"}
                                placeholderTextColor="#507686"
                                keyboardType="email-address"
                                onChangeText={emailInputHandler}
                                value={emailInput}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <MaterialIcons
                                name="lock"
                                size={20}
                                color="#507686"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.inputBox}
                                placeholder={"Password"}
                                placeholderTextColor="#507686"
                                secureTextEntry={isSecureText}
                                onChangeText={passwordInputHandler}
                                value={passwordInput}
                            />
                            <Entypo
                                name={eyeIcon}
                                size={20}
                                color="#507686"
                                style={(styles.inputIcon, { marginRight: 10 })}
                                onPress={handlePasswordVisibility}
                            />
                        </View>

                        <SimpleTextButton
                            text="Forgot password?"
                            onPress={forgotButtonHandler}
                        />
                    </View>

                    <LoginButton
                        text={"Sign in"}
                        buttonHandler={signUpButtonHandler}
                    />

                    <Seperator />

                    <FacebookLoginButton
                        text={"Sign in with Facebook"}
                        onPress={SigninFBHandler}
                    />

                    <SimpleTextButton
                        text="Create an account"
                        onPress={() => navigation.navigate("Register")}
                        style={{ marginVertical: 16, fontSize:20 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </LinearGradient>
    );
};
