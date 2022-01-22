import React from "react";
import { TouchableOpacity, View, Text, } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./FacebookLoginStyles";

const FacebookLogin = () => {
    return (
        <TouchableOpacity style={styles.facebookButton}>
            <FontAwesome name="facebook" size={24} color="white" style={styles.facebookIcon} />
            <Text style={styles.facebookButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
    );
}

export default FacebookLogin;