import React, { useState , useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Alert,} from "react-native";
import appfirebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Video } from 'expo-av'
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from "../components/CustomText";
import { EXPO_PUBLIC_API_URL } from '@env';


import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(appfirebase);
export default function Login({ navigation }) {
//ANDROID
//994723718979-caq5o5d0jfmurcg9frhqd5itcrinr3vh.apps.googleusercontent.com
//APPLE
//994723718979-0ekbnlvd607s8itqe4bucfr4rc68d9k9.apps.googleusercontent.com

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "994723718979-caq5o5d0jfmurcg9frhqd5itcrinr3vh.apps.googleusercontent.com",
    iosClientId: "994723718979-0ekbnlvd607s8itqe4bucfr4rc68d9k9.apps.googleusercontent.com",
    webClientId: "994723718979-4nsqsbko4a313npu11gonn51cd717gag.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  // Función para guardar el usuario en MongoDB
  const saveUserInMongoDB = async (userData) => {
    try { 
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/users/register`, userData);
      console.log('User saved in MongoDB:', response.data);
      // agregue esto para el id de mongo
      // if (response.data.userId) {
      //   // Guardar el userId en el estado o en AsyncStorage para uso futuro
      //   AsyncStorage.setItem('@mongoUserId', response.data.userId);
      //   console.log('MongoDB User ID saved:', response.data.userId);
      // }
    } catch (error) {
      console.error('Failed to save user in MongoDB', error);
    }
  };

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(`user id: ${uid}` );
  


      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      navigation.navigate("BottomTab");
      setUserInfo(user);

      const request = await axios.get(`${EXPO_PUBLIC_API_URL}/users/getAllUsers`)
      const res = request.data
      const username = user.email.split('@')[0];
      const userData = {
        email:user.email,
        username
      };
      const foundUser = res.find(e => e.email === user.email);
      if(!foundUser){
        await axios.post(`${EXPO_PUBLIC_API_URL}/users/register`, userData);
      }

    } catch (error) {
      // Add your own error handler here
    }
  };

  const LoginWUP = async () => {
    try {
      const useCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = useCredential.user;

      // Guarda el usuario en la base de datos de MongoDB
      // Endpoint que retorna el MongoDB UserId utilizando el email o UID
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/users/getMongoUserId/${email}`);

      if (response.data && response.data.userId) {
          await AsyncStorage.setItem('@mongoUserId', response.data.userId);
          console.log("MongoDB User ID saved:", response.data.userId);
      } else {
          console.log("Failed to receive MongoDB User ID from backend");
      }

      await AsyncStorage.setItem('email', `${userEmail}`) 
   
      navigation.navigate("BottomTab");
    } catch (error) {
      Alert.alert("Error", "Usuario o contraseña incorrecto");
      console.log(error);
    }
  };

  



  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleLogIn = () => {
    setShowLogIn(!showLogIn);
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };



  const SignUp_LogIn = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas deben coincidir");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = userCredential.user;
      const username = email.split('@')[0];
      // console.log(`user id: ${uid}` );
  
      const userData = {
        uid,
        email: userEmail,
        username
      };
  
      await saveUserInMongoDB(userData);
;
  
      Alert.alert("Registration Successful", "You may now log in with your credentials.");
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate("BottomTab");  
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Registration Failed", error.message || 'Failed to register');
    }
  };

  


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

        <View className='bg-[#0000008e] rounded-xl'>
          <CustomText style={styles.title}>
            Run around the planet and Earn eco-friendly tokens
          </CustomText>
        </View>

        {showLogIn && ( 
          <View style={styles.form}>
            <View style={styles.formSignIn}>

              <View style={styles.containerLognIn}>
                <CustomText style={styles.textLognIn}>Login</CustomText>
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

              <TouchableOpacity className="items-center w-full" onPress={LoginWUP}>
                <LinearGradient
                  className="py-3 rounded-full w-[100%]"
                  colors={['#24B035', '#97E700']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <CustomText className="text-xl text-center text-gray-950 font-semibold">
                    Log in     
                  </CustomText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showSignUp && (
          <View style={styles.form} >
            <View style={styles.formSignIn}>

              <View style={styles.containerLognIn}>
                <CustomText style={styles.textLognIn}>New account</CustomText>
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
              
              <View style={styles.input}>
                <TextInput
                  onChangeText={(text) => setConfirmPassword(text)}
                  placeholder="Confirm Password"
                  style={{ paddingHorizontal: 15 }}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity className="items-center w-full" onPress={() => {toggleSignUp(); SignUp_LogIn();}}>
                <LinearGradient
                  className="py-3 rounded-full w-[100%]"
                  colors={['#24B035', '#97E700']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <CustomText className="text-xl text-center text-gray-950 font-semibold">
                    Sign Up     
                  </CustomText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.form}>
          {!showSignUp && (
            <TouchableOpacity style={styles.btnLogin} onPress={toggleLogIn}>
              <CustomText style={{ fontWeight: "600" }}>
                {showLogIn ? 'Go back' : 'Log in with Email and Password'}
              </CustomText>
            </TouchableOpacity>
          )}

          {(!showLogIn && !showSignUp) &&(
            <TouchableOpacity
              style={styles.btnLogin}
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomText style={{ fontWeight: "600" }}>Log in with Google</CustomText>
                <Image
                  source={require("../../assets/google.png")}
                  style={{ width: 20, height: 25, marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
          )}

          {!showLogIn &&(
            <TouchableOpacity style={styles.btnLogin} onPress={toggleSignUp}>
              <CustomText style={{ fontWeight: "600" }}>
              {showSignUp ? 'Go back' : 'You are new? Create an account'}
              </CustomText>
            </TouchableOpacity>          
           )}
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
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: "cover",
  },
  childContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 150,
    paddingBottom: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#ffffff",
    paddingHorizontal: 10
  },
  containerLognIn: {   
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#ebe9e9bc",
    borderRadius: 8,
    width: '60%',
    alignSelf: "center",
    paddingVertical: 8,
  },
  textLognIn: { 
    fontSize: 20,
    fontWeight: '500',
    color: "black",
  },
  form: {
    width: "90%",
    gap: 10,
  },
  input: {
    paddingVertical: 10,
    backgroundColor: "#E4E4E4",
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
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    top: 10,
  },
});