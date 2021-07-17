import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function QuantitySelector({
  counter,
  setCounter,
  change,
  setChange,
}) {
  console.log("Counter-----", counter);
  const onPlus = (value) => {
    setCounter(value);
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.button} onPress={() => onPlus(1)}>
        <Text style={styles.butonText}>+</Text>
      </Pressable>
      <Text style={styles.counter}>{counter}</Text>
      <Pressable style={styles.button} onPress={() => onPlus(-1)}>
        <Text style={styles.butonText}>-</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    width: 130,
    marginVertical: 15,
    alignSelf: "center",
  },
  button: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d1d1d1",
  },
  butonText: {
    fontSize: 18,
  },
  quantity: {
    color: "#007eb9",
  },
});
