import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function Register({ navigation }) {
  
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  
  const [error, setError] = useState(false);
  const [messageNotification, setMessageNotification] = useState("");
    
  const handleRegister = async () => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );
        const { uid } = user;
      const db = getFirestore();
      await setDoc(doc(db, "usuarios", uid), {
        password,
        email,
        uid,
      });
      navigation.navigate("Home", { uid: user.uid });
    } catch (error) {
      console.log(error);
      setError(true);
      const errorCode = error.code;
      const errorMessage = error.message;
      setMessageNotification(errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.center}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        // value={user}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        // value={password}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <TouchableOpacity
        title="Iniciar Sesion"
        onPress={handleRegister}
        style={styles.button}
      >
        <Text style={styles.btnText}>Registarse</Text>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "red", marginTop: 5 }}>
          {messageNotification}
        </Text>
      )}
      {!error && (
        <Text style={{ color: "green", marginTop: 5 }}>
          {messageNotification}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 10,
    borderWidth: 1,
    padding: 20,
    borderRadius: 3,
    width: 400,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: "#f0ebf7",
    placeholderTextColor: "#6e706e",
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3c46ff",
    color: "#f2f2f2",
    padding: 10,
  },
  btnText: {
    color: "#f2f2f2",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
