import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingScreen = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#e07a2e" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#001c31"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingScreen;