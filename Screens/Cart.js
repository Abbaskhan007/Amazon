import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CartItem from "../Components/CartItem";
import CustomButton from "../Components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import { Product, CartProduct } from "../src/models";
import { useFocusEffect } from "@react-navigation/native";

export default function Cart() {
  const navigation = useNavigation();
  const totalPrice = cartData?.reduce(
    (summedPrice, product) =>
      summedPrice + product.product.price * product.product.quantity,
    0
  );
  console.log(
    "Price***********************************************",
    totalPrice
  );
  const [cartData, setCartData] = useState([]);
  const [change, setChange] = useState(false);

  useFocusEffect(() => {
    const checking = async () => {
      
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, (cp) =>
        cp.userSub("eq", userData.attributes.sub)
      ).then(async (res) => {
        if (res.length !== cartData.length) setChange(!change);
      });
    };
    checking();
  });
  useEffect(() => {
    console.log('222222222222222222222222222');
    const fetchProducts = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, (cp) =>
        cp.userSub("eq", userData.attributes.sub)
      ).then(async (res) => {
        const filterProduct = await Promise.all(
          res.map((prd) => DataStore.query(Product, prd.productID))
        );

        const newFilterData = res.map((item) => ({
          ...item,
          product: filterProduct.find((p) => p.id === item.productID),
        })
        );
        setCartData(newFilterData);
      });
    };

    fetchProducts();
  }, [change]);

  useEffect(() => {
    console.log("11111111111111111111111111111**");
    const subscribtions = cartData.map((p) =>
      DataStore.observe(CartProduct, p.id).subscribe((msg) => {
        console.log(msg.element);
        if (msg.opType === "UPDATE") {
          console.log("1111111111111111111111111111199999999999999999999999990000000000000000000000000000000000000000999999999999999999999900000000000000000000");
          const newCartData = cartData.map((p) => {
            if (p.id === msg.element.id) {
              console.log("????????????????????", { ...p, ...msg.element });
              return {
                ...p,
                ...msg.element,
              };
            }
            return p;
          });
          setCartData(newCartData);
        }
      })
    );
    return () => {
      subscribtions.forEach((sub) => sub.unsubscribe());
    };
  }, []);

  console.log("CartData*****", cartData);

  if(cartData.length > 0){
    return(
    <View style={{ marginTop: 22 }}>
      <View>
        <Text style={styles.priceRow}>
          Subtotal (${cartData?.length} items) :{" "}
          <Text style={styles.price}>${totalPrice}</Text>
        </Text>
        <CustomButton
          title="Proceed to checkout"
          onPress={() =>
            navigation.navigate("shippingForm", {
              cartData: cartData,
              change: change,
              setChange: change,
            })
          }
        />
      </View>
      <FlatList
        data={cartData}
        renderItem={({ item }) => (
          <CartItem change={change} setChange={setChange} item={item.product} />
        )}
      />
    </View>)}
    else{
    return(<View style={{display: 'flex',justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{ fontSize: 18}}>No items in the cart</Text>
    </View>)}
  
}

const styles = StyleSheet.create({
  priceRow: {
    fontSize: 18,
  },
  price: {
    color: "#e47911",
    fontWeight: "bold",
  },
});
