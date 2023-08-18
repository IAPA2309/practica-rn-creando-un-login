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

export default function LogIn({ navigation }) {
  const [user, onChangeUser] = React.useState("user");
  const [password, onChangePassword] = React.useState("password");

  const [error, setError] = useState(false);
  const [messageNotification, setMessageNotification] = useState('');

  function loginUser() {
    axios
      .post(
        "http://localhost:5000/login",
        {
          username: user,
          password: password,
        }
      )
      .then(function (response) {
        setError(false);
        setMessageNotification('Inicio de sesion existoso.');
        console.log(response);
      })
      .catch(function (error) {
        setError(true);
        setMessageNotification('Hubo un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    return (
      <SafeAreaView style={styles.center}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUser}
          // value={user}
          placeholder="Usuario"
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
          onPress={loginUser}
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
