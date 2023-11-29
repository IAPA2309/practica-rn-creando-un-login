import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function LogIn({ navigation }) {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const [error, setError] = useState(false);
  const [messageNotification, setMessageNotification] = useState('');
    
    const handleLogin = async () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home", { uid: user.uid });
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessageNotification(errorMessage);
      });
    };
  
    return (
      <SafeAreaView style={styles.center}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Usuario"
          />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
        <TouchableOpacity
          title="Iniciar Sesion"
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.btnText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        {error && <Text style={{ color: 'red', marginTop: 5 }}>{messageNotification}</Text>}
        {!error && <Text style={{ color: 'green', marginTop: 5 }}>{messageNotification}</Text>}
        <TouchableOpacity
          title="No tengo cuenta"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.btnText}>No tengo cuenta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    width: 400,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: "#f0ebf7"
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
