import { Redirect } from "expo-router"
import { StyleSheet } from "react-native"

export default function Tabs() {
  return <Redirect href="/invoices" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
