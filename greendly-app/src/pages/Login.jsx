import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
          source={require("../../assets/Landing.jpg")}
          style={styles.image}
        />

      <View style={styles.containerText}>
        <Text style={styles.text}>
          Corre por el planeta y Gana tokens eco-amigables.
        </Text>

        <TouchableOpacity 
          style={styles.buttonLanding}
          onPress={() => navigation.navigate('BottomTab')}
        >
          <Text>
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>

     

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
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    resizeMode: "cover",   
  },
  containerText:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 150,
    paddingBottom: 80,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  buttonLanding: {
    alignSelf: 'center',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#3AA940',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    top: 0
  }

});