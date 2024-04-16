import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function NavBar() {
  return (
    <View style={styles.container}>
    
        <Image
          source={require("../../assets/Logogreen.png")}
          style={styles.image}
        />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2c2c98',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70
  },
  image: {
    width: 60,
    height: 60,
    top: 10,
    left: 10,
  }

});
