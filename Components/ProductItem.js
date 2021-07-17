import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function ProductItem({item}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("productDetails",{itemID: item.id})}
      style={styles.container}
    >
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
          {[0, 0, 0, 0, 0].map((rat, index) => (
            <FontAwesome
              key={`${item.id}-${index}`}
              style={styles.icon}
              name={index < Math.floor(item.avgRating) ? "star" : "star-o"}
              size={18}
              color={"#e47911"}
            />
          ))}
          <Text>{item.ratings}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.oldPrice ? (
            <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 3,
    alignItems: "center",
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
  }
});
