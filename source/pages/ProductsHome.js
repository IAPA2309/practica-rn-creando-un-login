import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";
import ProductCard from '../components/ProductCard'
import { useIsFocused } from "@react-navigation/native";

const ProductsHome = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      obtenerProductos();
    }
  }, [navigation, isFocused]);

  const obtenerProductos = async () => {
    try {
      const db = getFirestore();

      const snapshot = await getDocs(collection(db, "productos"));
      const listaProductos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(listaProductos);
    } catch (error) {
      console.error("Error al obtener productos: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ width: 200, height: 150, borderRadius: 20 }}
      />
      {productos ? (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard producto={item} navigation={navigation} />
          )}
        />
      ) : (
        <View>
          <Text>Cargando productos...</Text>
        </View>
      )}
    </View>
  );
};

export default ProductsHome;

const styles = StyleSheet.create({});
