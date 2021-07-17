import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ProductItem from '../Components/ProductItem'
import productData from '../Data/Product'
import { DataStore } from 'aws-amplify'
import { Product } from '../src/models'

export default function Home({ search, setSearch }) {

const [product, setProduct] = useState([]);

useEffect(()=>{
  DataStore.query(Product).then(res=>{
    console.log(res);
    setProduct(res);
  })
},[])

  return (
    <View>
      <FlatList
        data={product}
        renderItem={({ item }) => <ProductItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    
})