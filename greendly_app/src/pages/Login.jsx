import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, Alert,} from "react-native";
import appfirebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import * as Google from 'expo-auth-session/providers/google';
import { Video } from 'expo-av'
import axios from "axios";


const auth = getAuth(appfirebase);
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginWUP = async () => {
    try {
      const useCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = useCredential.user;

      // Guarda el usuario en la base de datos de MongoDB
      await saveUserInMongoDB(uid, userEmail);

      navigation.navigate("BottomTab");
    } catch (error) {
      Alert.alert("Error", "Usuario o contraseña incorrecto");
      console.log(error);
    }
  };


  // Función para guardar el usuario en MongoDB
  const saveUserInMongoDB = async (uid, email) => {
    try {
      const response = await axios.post('http://192.168.1.74:3002/users/saveUser', {
        uid,
        email
      });
      console.log('User saved in MongoDB:', response.data);
    } catch (error) {
      console.error('Failed to save user in MongoDB', error);
    }
  };

  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  // GoogleSignin.configure({
  //   webClientId: 'project-749114756416.apps.googleusercontent.com',
  // });

  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const { idToken } = userInfo;
  //     const googleCredential = GoogleAuthProvider.credential(idToken);
  
  //     // Autenticación con Firebase usando las credenciales de Google
  //     const auth = getAuth();
  //     await signInWithCredential(auth, googleCredential);
  
  //     // Aquí podrías llamar a `saveUserInMongoDB` con la información del usuario si es necesario
  
  //     // Si todo es exitoso, redirige al usuario a la pantalla "BottomTab"
  //     navigation.navigate("BottomTab");
  //   } catch (error) {
  //     Alert.alert("Login Failed", error.message);
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>
<Video
  source={require("../../assets/loginvideo.mp4")}
  style={styles.video}
  resizeMode="cover"
  isLooping={true} // Utiliza isLooping en lugar de repeat
  shouldPlay // Inicia la reproducción automáticamente
/>


      <View style={styles.childContainer}>
        <View>
          <Text style={styles.title}>
            Corre por el planeta y Gana tokens eco-amigables.
          </Text>
        </View>

        <View style={styles.form}>
          {showInputs && (
            <View style={styles.formSignIn}>

              <View style={styles.containerLognIn}>
                <Text style={styles.textLognIn}>Login</Text>
              </View>

              <View style={styles.input}>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  placeholder="User_name@email.com"
                  style={{ paddingHorizontal: 15 }}
                />
              </View>

              <View style={styles.input}>
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  style={{ paddingHorizontal: 15 }}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.btnSigIn} onPress={LoginWUP}>
                <Text style={{ fontWeight: "600" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.form}>
          <TouchableOpacity style={styles.btnLogin} onPress={toggleInputs}>
            <Text style={{ fontWeight: "600" }}>
              Sign In with Email and Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnLogin}
            // onPress={googleLogin}
            onPress={() => navigation.navigate("BottomTab")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "600" }}>Sign In with Google</Text>
              <Image
                source={require("../../assets/google.png")}
                style={{ width: 20, height: 25, marginLeft: 10 }}
              />
            </View>
          </TouchableOpacity>
        </View>
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
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  childContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 150,
    paddingBottom: 80,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
  },
  containerLognIn: {   
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    backgroundColor: "#ebe9e97c",
    borderRadius: 30,
    width: '60%',
    alignSelf: "center",
    paddingVertical: 5,
  },
  textLognIn: { 
    fontSize: 20,
    fontWeight: '500',
    color: "black"
  },
  form: {
    width: "90%",
    gap: 10,
  },
  input: {
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
  formSignIn: {
    alignSelf: "center",
    width: "90%",
    gap: 10,
  },
  btnSigIn: {
    alignSelf: "center",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "#3BBB37",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    bottom: 0,
  },
  btnLogin: {
    alignSelf: "center",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    top: 10,
  },
});
