import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import QuantitySelector from "./QuantitySelector";
import { DataStore, Auth } from "aws-amplify";
import { Product, CartProduct } from "../src/models";

export default function CartItem({item, change, setChange}) {
    

  const [currentItem, setCurrentItem] = useState({});

  useEffect(()=>{
    const fetch = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const original = await DataStore.query(
      CartProduct,
      (cp) =>
        cp.productID("eq", item.id) && cp.userSub("eq", userData.attributes.sub)
    );

    setCurrentItem(original[0]);
  
  }
    fetch();
  },[change])


  const updateQuantity = async (val) => {
    const userData = await Auth.currentAuthenticatedUser();
    const original = await DataStore.query(
      CartProduct,
      (cp) =>
        cp.productID("eq", item.id) && cp.userSub("eq", userData.attributes.sub)
    );
    console.log('Original******************',original[0])
    
    await DataStore.save(
      CartProduct.copyOf(original[0], (updated) => {
        updated.quantity = Math.max(0, updated.quantity + val);
      })
    ).then((res) => setChange(!change));
  }

  const onDelete = async () => {
    console.log('Delete---------')
    
    const userData = await Auth.currentAuthenticatedUser();
    const original = await DataStore.query(
      CartProduct,
      (cp) =>
        cp.productID("eq", item.id) && cp.userSub("eq", userData.attributes.sub)
    );
    await DataStore.delete(original[0]);
    setChange(!change);
  }

  return (
    <View style={styles.root}>
    <View style={styles.container}>
      <Entypo name='cross' style={styles.deleteIcon} onPress={onDelete}/>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.description}>
        <View>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          {[0,0,0,0,0].map((rat,index)=><FontAwesome
            
              key={`${item.id}-${index}`}
              style={styles.icon}
              name={index < Math.floor(item.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />)}
            <Text>{item.ratings}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>{item.oldPrice?<Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>:null}
        </View>
      </View>
    </View>
    <QuantitySelector change={change} setChange={setChange} counter={currentItem?.quantity} setCounter={updateQuantity}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  root: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 3,
  },
  image: {
    height: 140,
    flex: 2,
    resizeMode: 'contain',
  },
  description: {
    flex: 3,
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
  priceContainer:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: "normal",
    textDecorationLine: "line-through",
    color: '#7c7c7c'
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  icon: {
    margin: 2
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 4,
    fontWeight: '100',
    fontSize: 24,
    color: '#7c7c7c'
  }
});