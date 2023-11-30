import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { getFirestore, doc, getDoc } from "firebase/firestore";


const ProductPage = ({ navigation }) => {

    const route = useRoute();
    const [producto, setProducto] = useState(route.params.producto);
    
    const isFocused = useIsFocused();
    console.log(producto);

    useEffect(() => {
        if(isFocused){
            obtenerProducto();
        }
    }, [navigation, isFocused]);

    const productoId = route.params.producto.id;

    const obtenerProducto = async () => {
        try {
          const db = getFirestore();

          const docRef = doc(db, "productos", route.params.producto.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProducto(docSnap.data());
          } else {
            console.error(
              "Error: Producto no encontrado en la base de datos"
            );
          }
        } catch (error) {
          console.error("Error al obtener los datos del producto:", error);
        }
    };

  const handleEditPress = () => {
    if (producto) {
        navigation.navigate("EditProduct", { producto, productoId });
        console.log(producto);
    }
};

   if (!producto) {
    return (
      <View style={styles.container}>
        <Text>Error: Producto no encontrado</Text>
      </View>
    );
   }

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>{producto.nombre}</Text>
        <Text style={styles.productDescription}>{producto.descripcion}</Text>
        <Text style={styles.productPrice}>${producto.precio}</Text>
      </View>
      <TouchableOpacity onPress={handleEditPress} style={styles.button}>
        <Text style={styles.btnText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 20,
  },
  productImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
  productTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 17,
    color: "#444444",
    marginTop: 10,
  },
  productPrice: {
    marginTop: 8,
    color: "#00f",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    backgroundColor: "#7029ff",
    borderRadius: 20,
    width: "95%",
  },
  btnText: {
    color: "#fff",
    alignSelf: "center",
  },
});
