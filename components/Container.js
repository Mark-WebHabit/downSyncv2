import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

const Container = ({children, addStyle}) => {
  return (
    <SafeAreaView style={[styles.container, addStyle]}>
    {children}
    </SafeAreaView>
  )
}

export default Container

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
    }
})