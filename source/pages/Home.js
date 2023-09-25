import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native";
import axios from "axios";


export default function Home() {
    const route = useRoute();
    const username = route.params?.username;

    const [editMode, setEditMode] = useState(false);
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);

    const [editedNombre, setEditedNombre] = useState(nombre || "");
    const [editedApellido, setEditedApellido] = useState(apellido || "");

    useEffect(() => getUserData());

    const handleEditClick = () => {
      setEditMode(true);
    };

    const handleCompleteProfileClick = () => {
      setEditMode(true); // para que el formulario de editar se pueda usar, mantener en true
    };

    const handleSaveClick = () => {
      axios
        .put("http://localhost:5000/updateProfile", {
          user: username,
          nombre: editedNombre,
          apellido: editedApellido,
        })
        .then((response) => {
          setEditMode(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    function getUserData() {
      axios
        .post("http://localhost:5000/userData", {
          username: username,
        })
        .then(function (response) {
            setNombre(response.data[0]?.nombre || null);
            setApellido(response.data[0]?.apellido || null);
            console.log(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    return (
      <View style={styles.center}>
        <View>
          {nombre || apellido ? (
            <Text>Bienvenido, {nombre + " " + apellido}!</Text>
          ) : (
            <Text>Bienvenido!</Text>
          )}
          {editMode ? (
            <View>
              <TextInput
                placeholder="Nombre"
                value={editedNombre}
                onChangeText={(text) => setEditedNombre(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Apellido"
                value={editedApellido}
                onChangeText={(text) => setEditedApellido(text)}
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSaveClick} style={styles.button}>
                <Text style={styles.btnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {nombre && apellido ? (
                <TouchableOpacity
                  onPress={handleEditClick}
                  style={styles.button}
                >
                  <Text style={styles.btnText}>Editar perfil</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleCompleteProfileClick}
                  style={styles.button}
                >
                  <Text style={styles.btnText}>Completar perfil</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
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