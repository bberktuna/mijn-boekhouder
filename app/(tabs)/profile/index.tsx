import CollapsibleHeader from "@/components/CollapsibleHeader"
import React, { useRef } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"

const profile = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <CollapsibleHeader title="Profile" scrollY={scrollY} />
      <Text>awdwaqdw</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
