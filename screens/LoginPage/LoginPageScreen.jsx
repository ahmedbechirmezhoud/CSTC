import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import styles from './LoginPageStyles';



const LoginPageScreen = () => {

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPassowrdInput] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");

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


  return (
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

          <TouchableOpacity style={styles.forgotButton} onPress={forgotButtonHandler}>
            <Text style={styles.forgotButtonText}>Forgot password?</Text>
          </TouchableOpacity>

        </View>
 
        <TouchableOpacity style={styles.signInButton} onPress={signUpButtonHandler}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
        
        <View style={styles.seperatorContainer}>

          <View style={styles.straightLine} />
          <Text style={styles.seperatorText} >    Or    </Text>
          <View style={styles.straightLine} />

        </View>

        <FacebookLogin />

      </View>
  
    </TouchableWithoutFeedback >
  );
}


export default LoginPageScreen;