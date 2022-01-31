import React, { useState } from "react";
import {
    View,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Alert,
    ScrollView,
    Text
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

import LoginButton from '../../components/LoginButton/LoginButton';
import { useNavigation } from '@react-navigation/core';
import styles from "./ForgotPwdScreenStyles";
export default function FbRegistrationScreen() {

    const [emailInput, setEmailInput] = useState("");
    const navigation = useNavigation();

    const emailInputHandler = textInput => {
        setEmailInput(textInput);
    }
    const resetButtonHandler = () => {
        //Insert function here
        Alert.alert("Check your email",
        "You'll find your new password in your email",
        [{ text: "OK",onPress:() => navigation.navigate("Login") , style: "cancel" }]
        )
    };
    
    return (
        <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View  style={{ justifyContent:"center"}}>
            <ScrollView contentContainerStyle={styles.registerContainer} >
                <Text style={styles.headerText} >Forgot Your Password?</Text>
                <Text style={styles.subHeaderText} >Enter your email adress and we will send you instructions to reset your password.</Text>
                <View style={styles.inputContainers}>

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

                </View>

                <LoginButton text={"Reset password"} buttonHandler={resetButtonHandler} />

            </ScrollView>
            </View>
        </TouchableWithoutFeedback  >
    </LinearGradient>
    );
}
