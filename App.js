import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
// import { TextInput } from 'react-native-web';
import axios from 'axios';

export default function App() {
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
            "Access-Control-Allow-Origin": "*"
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
  }

  return (
    <SafeAreaView>
      <TextInput
        styles={styles.input}
        onChangeText={onChangeUser}
        value={user}
        placeholder="usuario"
      />
      <TextInput
        styles={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="contraseña"
      />
      <Button 
      title="Iniciar Sesion"
      onPress={loginUser}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
