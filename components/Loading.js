import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'

const Loading = () => {
  const [showLaoding, setShowLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        setShowLoading(true)
    }, 2000);
  }, [])


  return (
    <View style={[styles.container, {
      opacity: showLaoding ? 1 : 0
    }]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Gathering Resources...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: "3%"
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: "900"
  }
})
