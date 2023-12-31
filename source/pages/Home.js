import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";


export default function Home({ navigation }) {
  const route = useRoute();
  const uid = route.params?.uid;

  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);

  const [editedNombre, setEditedNombre] = useState(nombre || "");
  const [editedApellido, setEditedApellido] = useState(apellido || "");

  useEffect(() => {
    getUserData();
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCompleteProfileClick = () => {
    setEditMode(true); // para que el formulario de editar se pueda usar, mantener en true
  };

  const handleSaveClick = async () => {
    try {
      const db = getFirestore();

      const docRef = doc(db, "usuarios", uid);

      await updateDoc(docRef, {
        nombre: editedNombre,
        apellido: editedApellido,
      });

      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function getUserData() {
    const db = getFirestore();

    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setNombre(docSnap.data().nombre || null);
      setApellido(docSnap.data().apellido || null);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <View style={styles.center}>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ width: 200, height: 150, borderRadius: 20 }}
      />
      <View>
        {nombre || apellido ? (
          <Text style={{ fontSize: 21 }}>
            Bienvenido, {nombre + " " + apellido}!
          </Text>
        ) : (
          <Text style={{ fontSize: 21 }}>Bienvenido!</Text>
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
              <TouchableOpacity onPress={handleEditClick} style={styles.button}>
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
        <TouchableOpacity
          title="Ver productos"
          onPress={() => navigation.navigate("ProductsHome")}
          style={styles.button}
        >
          <Text style={styles.btnText}>Ver productos</Text>
        </TouchableOpacity>
      </View>
    </View>
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