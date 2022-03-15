
import React from "react"
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({

  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width*3.2/4 ,
    height: 47,
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: "#14212E",
    
  },
  signInButtonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    
  },
});
export default styles;