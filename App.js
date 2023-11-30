import React from "react";
import LogIn from "./source/pages/LogIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./source/pages/Register";
import Home from './source/pages/Home';

import { initializeApp, getFirestore } from "firebase/app";
import ProductsHome from "./source/pages/ProductsHome";
import ProductPage from "./source/pages/ProductPage";
import EditProduct from "./source/pages/EditProduct";

const firebaseConfig = {
  apiKey: "AIzaSyB8ABb7b0sS6OIBr9UIRc22NzarV-BeKiw",
  authDomain: "rn-login-bd.firebaseapp.com",
  projectId: "rn-login-bd",
  storageBucket: "rn-login-bd.appspot.com",
  messagingSenderId: "684370174416",
  appId: "1:684370174416:web:7ce8a472d42ec3384199d5"
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductsHome" component={ProductsHome} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
