import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default ChangePwd = ({ value, onChange, placeholder }) => {

	const [isSecureText, setIsSecureText] = useState(true);
    const [validPass, setValidPass] = useState(true);
	const [eyeIcon, setEyeIcon] = useState("eye");
	const handlePasswordVisibility = () => {
		if (eyeIcon == "eye") {
			setIsSecureText(false);
			setEyeIcon("eye-with-line");
		} else {
			setIsSecureText(true);
			setEyeIcon("eye");
		}
	};
	const passwordInputHandler = (textInput) => {
        setValidPass(textInput.length >= 8);
		onChange(textInput);
	};


	return (
        <View style={[styles.inputContainer, !validPass && styles.invalidInput ]}>
            <TextInput
                style={styles.inputBox}
                placeholder={placeholder}
                placeholderTextColor='#507686'
                secureTextEntry={isSecureText}
                onChangeText={passwordInputHandler}
                value={value}
            />
            <Entypo
                name={eyeIcon}
                size={20}
                color='#507686'
                style={(styles.inputIcon, { marginRight: 10 })}
                onPress={handlePasswordVisibility}
            />
        </View>
    
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#F8F8F8",
		borderColor: "#A8A8A8",
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: "center"

	},
	inputIcon: {
		marginLeft: 10,
	},
	inputBox: {
		flex: 1,
		width:"60%",
		color: "#525252",
		fontSize: 16,
		padding: 10,
		fontWeight:"bold"
	},

    invalidInput:{
		borderColor: "red",
		borderWidth: 2
	}
});
