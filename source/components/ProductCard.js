import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ProductCard = ({ producto, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: producto.imagen }} style={styles.productImage} />
        <View style={styles.content}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {producto.nombre}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {producto.descripcion}
          </Text>
          <Text style={styles.productPrice}>${producto.precio}</Text>
        </View>
        <TouchableOpacity
          title="Ver mas"
          onPress={() => navigation.navigate("ProductPage", { producto })}
          style={styles.button}
        >
          <Text style={styles.btnText}>Ver mas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    margin : 10,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 350,
    height: 500,
    paddingBottom: 30
  },
  productImage: {
    width: "100%",
    height: "70%",
    borderRadius: 4,
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  productTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 24,
    color: "#333",
    marginTop: 10,
  },
  productPrice: {
    marginTop: 8,
    color: "#00f", // Puedes ajustar el color según tus preferencias
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
    color: "#444444",
  },
  button: {
    padding: 10,
    backgroundColor: "#7029ff",
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    alignSelf: "center"
  },
});