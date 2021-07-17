import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import item from "../Data/ProductDetails";
import { Picker } from "@react-native-picker/picker";
import QuantitySelector from "../Components/QuantitySelector";
import CustomButton from "../Components/CustomButton";
import ImageCarousel from "../Components/ImageCarousel";
import { useRoute } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import { Product,CartProduct } from "../src/models";
import { useNavigation } from "@react-navigation/native";



export default function ProductDetails() {
  const [selected, setSelected] = useState(item.options?item.options[0]:null);
  const [product, setProduct] = useState({})
  const [counter, setCounter] = useState(1);
  const route = useRoute();
  const navigation = useNavigation();

  const updateCounter = (value) => {
    setCounter(Math.max(1,counter + value));
  };

  const addToCart =async () => {
    const userData = await Auth.currentAuthenticatedUser();
    
    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      option: selected,
      quantity: counter,
      productID: product.id
    })
    DataStore.save(newCartProduct);
    console.log()
    console.log('Pressed');
    navigation.navigate('cart')
  }

  useEffect(() => {
    DataStore.query(Product, route.params.itemID).then((res) => {
      console.log(res);
      setProduct(res);
    });
  }, [route.params.itemID]);
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      <ImageCarousel images={product.images} />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Picker
          style={styles.picker}
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          {product?.options?.map((color) => (
            <Picker.Item label={color} value={color} />
          ))}
        </Picker>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${product.Price}</Text>
        {item.oldPrice ? (
          <Text style={styles.oldPrice}>${product.oldPrice}</Text>
        ) : null}
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector counter={counter} setCounter={updateCounter} />
      <CustomButton onPress={addToCart} title="Add to cart" />
      <CustomButton onPress={() => console.log("yes")} title="Buy Now" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: 'white',
        
    },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: "normal",
    textDecorationLine: "line-through",
    color: "#7c7c7c",
  },
  picker: {
      height: 30,
      width: 150,
      marginVertical: 8
  },
  description: {
      marginVertical: 10,
      lineHeight: 20
  },
  title: {
    fontSize: 16,
    marginVertical: 5
  }
});
