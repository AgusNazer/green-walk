import React from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function Landing() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>

      <Video
        ref={video}
        source={require("../assets/header.mp4")}
        style={styles.video}
        useNativeControls={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

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
    alignSelf: 'center',
    position: "absolute",
    height: 270,
    left: 0,
    right: 0,
  },
});
