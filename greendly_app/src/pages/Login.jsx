import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, Alert,} from "react-native";
import appfirebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appfirebase);
export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const LoginWUP = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("BottomTab");
    } catch (error) {
      Alert.alert("Error", "Usuario o contraseña incorrecto");
      console.log(error);
    }
  };

  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Landing.jpg")}
        style={styles.image}
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
              Sign In wiht Email and Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnLogin}
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
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    resizeMode: "cover",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
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
