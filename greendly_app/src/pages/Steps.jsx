import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Steps() {
  return (
    <View style={styles.container}>
      <Text>Steps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});