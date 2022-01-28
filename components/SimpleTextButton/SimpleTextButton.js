import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./SimpleTextButtonStyles";


export default  SimpleTextButton = props => (

    <TouchableOpacity style={styles.TextButton} onPress = {props.onPress} >
        <Text style={[styles.TextButtonText, props.style]}>{props.text}</Text>
    </TouchableOpacity>
);
