import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Blockchain() {
  return (
    <View style={styles.container}>
      <Text>Blockchain</Text>
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