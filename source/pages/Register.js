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

function Register() {
  const [user, onChangeUser] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const [error, setError] = useState(false);
  const [messageNotification, setMessageNotification] = useState('');

  function registerUser() {
    axios
      .post(
        "http://localhost:5000/register",
        {
          username: user,
          password: password,
        }
      )
      .then(function (response) {
        setError(false);
        setMessageNotification(response.data.message);
        console.log(response);
      })
      .catch(function (error) {
        setError(true);
        setMessageNotification(error.response.data.error);
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
          onPress={registerUser}
          style={styles.button}
        >
          <Text style={styles.btnText}>Registarse</Text>
        </TouchableOpacity>
        {error && <Text style={{ color: 'red', marginTop: 5 }}>{messageNotification}</Text>}
        {!error && <Text style={{ color: 'green', marginTop: 5 }}>{messageNotification}</Text>}
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
