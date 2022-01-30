import React from "react";
import { View, Text } from "react-native";
import styles from "./SeperatorStyles";

export default function Seperator() {
    return (
        <View style={styles.seperatorContainer}>
            <View style={styles.straightLine} />
            <Text style={styles.seperatorText}>    Or    </Text>
            <View style={styles.straightLine} />
        </View>
    );
}
