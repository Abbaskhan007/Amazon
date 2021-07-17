import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import { Picker } from "@react-native-picker/picker";
import countryList from "country-list";
import { DataStore, Auth } from "aws-amplify";
import { Order, CartProduct, OrderProduct } from "../src/models";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ShippingForm() {
  const countries = countryList.getData();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState(countries[0]?.name);
  const navigation = useNavigation();
  const route = useRoute();
  const {cartData, change, setChange} = route.params;

  const saveOrder = async () => {
    const userData = await Auth.currentAuthenticatedUser();
     
    const newOrder = new Order({
      userSub: userData.attributes.sub,
      fullName: name,
      city,
      address,
      country,
      phoneNumber: phone,
    });
    await DataStore.save(newOrder);

    await Promise.all(cartData.map((item) => {
      const newOrderProduct = new OrderProduct({
        option: item.option,
        quantity: item.quantity,
        productID: item.productID,
        orderID: newOrder.id,
      });
       DataStore.save(newOrderProduct);
    }))
    const cartsData = await DataStore.query(CartProduct, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    );

    await Promise.all(cartsData.map(item=>{
      DataStore.delete(item)
    }))
    navigation.goBack();
    navigation.navigate('Home');

    console.log('-----------------------------------=======================--------------------');

  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={"padding"}>
      <ScrollView style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View Style={{ backgroundColor: "red", width: "100%" }}>
            <Picker
              style={styles.picker}
              selectedValue={country}
              onValueChange={(ctry) => setCountry(ctry)}
            >
              {countries.map((ctry) => (
                <Picker.Item label={ctry.name} value={ctry.code} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Full name (First name and Last name)</Text>
          <TextInput
            style={styles.textField}
            onChangeText={(val) => setName(val)}
            value={name}
            placeholder="Full Name"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.textField}
            onChangeText={(val) => setPhone(val)}
            value={phone}
            placeholder="Phone Number"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.textField}
            onChangeText={(val) => setAddress(val)}
            value={address}
            placeholder="Address"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.textField}
            onChangeText={(val) => setCity(val)}
            value={city}
            placeholder="City"
          />
        </View>
        <CustomButton
          title="Checkout"
          onPress={saveOrder}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ededed",
  },
  container: {
    padding: 10,
  },
  label: {
    fontWeight: "bold",
  },
  textField: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 5,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 2,
  },
  row: {
    marginVertical: 5,
  },
  picker: {
    height: 30,
    width: "100%",
  },
});
