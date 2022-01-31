import React from "react";
import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    registerContainer: {
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
    },

    headerText: {
        fontSize:30,
        color:"#FFFFFF",
        padding:16,
    },
    subHeaderText: {
        fontSize:16,
        color:"#FFFFFF",
        padding:16,
    },
    inputContainers: {
        width: "70%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 180,
        marginTop: 36,
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
});
