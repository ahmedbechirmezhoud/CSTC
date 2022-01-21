import React from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';



const LoginPageScreen = () => {
  return (
    <View style={styles.loginContainer}>

      <View style={styles.inputContainer}>
        <Entypo name="email"
          size={20}
          color="#507686"
          style={styles.inputIcon} />

        <TextInput style={styles.inputBox}
          placeholder={"E-mail"}
          placeholderTextColor="#507686" />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock"
          size={20}
          color="#507686"
          style={styles.inputIcon} />

        <TextInput style={styles.inputBox}
          placeholder={"Password"}
          placeholderTextColor="#507686"
          secureTextEntry={true} />
      </View>



      <TouchableOpacity style={styles.signInButton}>

        <Text style={styles.signInButtonText}>Sign in</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotButtonText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.seperatorContainer}>
        <View style={styles.straightLine} />

        <Text style={styles.seperatorText} >    Or    </Text>

        <View style={styles.straightLine} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    height: "6%",
    backgroundColor: "white",
    borderRadius: 180,
    marginBottom: 24
  },
  inputIcon: {
    marginLeft: 10,
  },
  inputBox: {
    flex: 1,
    color: "#507686",
    fontSize: 16,
    padding: 10,

  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "6%",
    borderRadius: 180,
    marginBottom: 10,
    backgroundColor: "#024069"
  },
  signInButtonText: {
    color: "white",
    fontSize: 24,
    opacity: 1,
    fontWeight: "bold"

  },
  forgotButtonText:{
   color:"white",
   fontSize:16,
   marginBottom:16,
   
  },
  seperatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  seperatorText: {
    color: "#ffffff99",
    fontSize: 16,
    textAlign: "center"

  },
  straightLine: {
    height: 1,
    flex: 1,
    backgroundColor: "#ffffff78",
    maxWidth: "28%"

  }
});


export default LoginPageScreen;