import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./BlueButtonStyles"

const BlueButton = (props) => {

    return (
        <TouchableOpacity style={styles.signInButton} onPress={props.buttonHandler}>
            <Text style={styles.signInButtonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export default BlueButton;