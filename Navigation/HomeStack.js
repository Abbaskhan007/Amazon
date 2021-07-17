import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import ProductDetails from "../Screens/ProductDetails";
import { SafeAreaView, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const HeaderComponent = ({ search, setSearch }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#22e3dd", paddingTop: 16 }}>
      <View
        style={{
          margin: 12,
          padding: 5,
          paddingHorizontal: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 4
        }}
      >
        <Feather name="search" size={20} />
        <TextInput
          value={search}
          onChangeText={(val) => setSearch(val)}
          style={{ flex: 1, paddingLeft: 8, fontSize: 15 }}
          placeholder= 'Search Product...'
        />
      </View>
    </SafeAreaView>
  );
};

export default function HomeStack() {
  const Stack = createStackNavigator();
  const [search, setSearch] = useState("");
  return (
    <Stack.Navigator
      search={search} setSearch={setSearch}
    >
      <Stack.Screen
        name="home"
        options={{
          header: (props) => <HeaderComponent search={search} setSearch={setSearch} {...props} />
          
        }}
      >
        {() => <Home search={search} setSearch={setSearch} />}
      </Stack.Screen>
      <Stack.Screen name="productDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
