
import React from "react";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    background: {
      flex: 1,
      flex: 1,
    },
    loginContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex:1,
    },
    inputContainers: {
      width: "70%"
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 180,
      marginTop: 36
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
    forgotButtonText: {
      color: "white",
      fontSize: 16,
      marginTop: 12,
      marginBottom: 20,
      alignSelf: "center"
  
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
      backgroundColor: "#ffffff99",
      maxWidth: "28%"
  
    }
  });
  
  export default styles;