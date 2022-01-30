import React from "react";
import { TouchableOpacity, View, Text, } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./FacebookLoginStyles";

const FacebookLoginButton = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.facebookButton} onPress={onPress}>
            <FontAwesome name="facebook" size={24} color="white" style={styles.facebookIcon} />
            <Text style={styles.facebookButtonText}>{text}</Text>
        </TouchableOpacity>
    );
}

export default FacebookLoginButton;