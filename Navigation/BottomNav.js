import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import ShoppingCartStack from '../Navigation/ShoppingCartStack'
import ProductDetails from "../Screens/ProductDetails";
const Tab = createBottomTabNavigator();
import { Entypo } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import Signout from "../Screens/Signout";

export default function BottomNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: "#ffbo7o",
        activeTintColor: "#e47911",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={ShoppingCartStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={Signout}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
