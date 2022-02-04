import React, { useState } from "react";
import {
    View,
    TextInput,
    Keyboard,
    Alert,
    ScrollView,
} from "react-native";

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import GradientBackground from "../../components/GradientBackground/GradientBackground";
import LoginButton from '../../components/LoginButton/LoginButton';

import { CurrentUser } from '../../utils/user';
import { useNavigation } from '@react-navigation/core';
export default function FbRegistrationScreen() {

    const [nameInput, setNameInput] = useState(CurrentUser.name);
    const [emailInput, setEmailInput] = useState(CurrentUser.email);
    const [phoneInput, setPhoneInput] = useState(CurrentUser.phone);
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
    const confirmButtonHandler = () => {
      
    };
    
    return (
        <GradientBackground>
            <View  style={{ justifyContent:"center"}}>
            <ScrollView contentContainerStyle={styles.registerContainer} >
                <View style={styles.inputContainers}>
                    <View style={[styles.inputContainer,{marginTop:50}]}>
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


                </View>

                <LoginButton text={"Confirm"} buttonHandler={confirmButtonHandler} />

            </ScrollView>
            </View>
    </GradientBackground>
    );
}
