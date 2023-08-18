import React from "react";
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
  const [user, onChangeUser] = React.useState("user");
  const [password, onChangePassword] = React.useState("password");

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
        console.log(response);
      })
      .catch(function (error) {
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
