import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function CustomButton({onPress,title}) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0c14b',
        padding: 8,
        marginVertical:8
    },
    title: {
        textAlign: 'center',
        fontSize: 16
    }
})
