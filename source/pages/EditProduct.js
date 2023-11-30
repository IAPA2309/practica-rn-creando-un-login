import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const EditProduct = ({ route, navigation }) => {
  const [editedProduct, setEditedProduct] = useState(route.params.producto);
  console.log(editedProduct);
  
  const handleSaveChanges = async () => {
      try {
         
        if (editedProduct.precio <= 0) {
          Alert.alert("Error", "El precio debe ser mayor que 0.");
          return;
        }

        const db = getFirestore();

        const docRef = doc(db, "productos", route.params.productoId);

        await updateDoc(docRef, {
          nombre: editedProduct.nombre,
          descripcion: editedProduct.descripcion,
          imagen: editedProduct.imagen,
          precio: editedProduct.precio,
        });

        navigation.goBack();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
   };

    const handlePrecioChange = (text) => {
      
      const precio = text.trim() === "" ? "" : parseFloat(text);

      if (!isNaN(precio) || text.trim() === "") {
        setEditedProduct({ ...editedProduct, precio });
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>Editar Producto</Text>
      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={editedProduct.nombre}
        onChangeText={(text) =>
          setEditedProduct({ ...editedProduct, nombre: text })
        }
      />
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        value={editedProduct.descripcion}
        onChangeText={(text) =>
          setEditedProduct({ ...editedProduct, descripcion: text })
        }
      />
      <Text>Link Imagen</Text>
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={editedProduct.imagen}
        onChangeText={(text) =>
          setEditedProduct({ ...editedProduct, imagen: text })
        }
      />
      <Text>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={editedProduct.precio.toString()}
        onChangeText={handlePrecioChange}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#7029ff",
    borderRadius: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    alignSelf: "center",
  },
});