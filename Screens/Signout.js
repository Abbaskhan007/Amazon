import React from 'react'
import { View, Text,Pressable, SafeAreaView } from 'react-native'
import {Auth} from 'aws-amplify'

export default function Signout() {
    const logout = () => {
        Auth.signOut()
    }
    return (
        <SafeAreaView>
            <Pressable style={{marginTop:18}} onPress={logout}>
                <Text>Sign Out</Text>
            </Pressable>
        </SafeAreaView>
    )
}
