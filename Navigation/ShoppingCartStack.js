import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../Screens/Cart";
import ProductDetails from "../Screens/ProductDetails";
import ShippingForm from "../Screens/ShippingForm";

export default function HomeStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="shippingForm" component={ShippingForm} />
    </Stack.Navigator>
  );
}
