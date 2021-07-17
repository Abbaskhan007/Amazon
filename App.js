import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavigationContainer from './Navigation/NavigationContainer';
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import {withAuthenticator} from 'aws-amplify-react-native'
Amplify.configure(awsconfig);


 function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer/>
    </SafeAreaView>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
