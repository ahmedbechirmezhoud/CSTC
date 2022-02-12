import React from "react";
import { TouchableOpacity,Text, } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./FacebookLoginStyles";

const FacebookLoginButton = ({text, onPress,style}) => {
    return (
        <TouchableOpacity style={{...styles.facebookButton,...style}} onPress={onPress}>
            <FontAwesome name="facebook" size={24} color="white" style={styles.facebookIcon} />
            <Text style={styles.facebookButtonText}>{text}</Text>
        </TouchableOpacity>
    );
}

export default FacebookLoginButton;