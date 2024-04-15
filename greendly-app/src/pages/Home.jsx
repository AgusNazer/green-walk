import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function Landing() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* <Video
        ref={video}
        source={require("../../assets/header.mp4")}
        style={styles.video}
        useNativeControls={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */}

      <TouchableOpacity 
        style={styles.contButton}
        onPress={() => navigation.navigate('Blockchain')}
      >
        <Text>
          Go to Blockchain 
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  video: {
    // position: "absolute",
    height: 270,
    left: 0,
    right: 0,
  },
  contButton: {
    // position: "absolute",
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
    top: 40
  }
});
