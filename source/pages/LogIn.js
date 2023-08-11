import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function LogIn() {
  const [user, onChangeUser] = React.useState("user");
  const [password, onChangePassword] = React.useState("password");

  function loginUser() {
    axios
      .post(
        "http://localhost:5000/login",
        {
          username: user,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
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
        <Text>¿No tenes una cuenta? Registrate</Text>
      </SafeAreaView>
    );
  }
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
