import { MaterialIcons } from "@expo/vector-icons"
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import colors from "../constants/colors"

type Props = {
  title: string
  scrollY: Animated.Value
}

export default function CollapsibleHeader({ title, scrollY }: Props) {
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100], // Header yukarı çıkar
    extrapolate: "clamp",
  })

  const handleMenu = () => {
    console.log("menu bar pressed")
  }

  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleMenu}>
          <MaterialIcons name="menu" size={32} color={colors.darkGreen} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const HEADER_HEIGHT = 100

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: colors.lightGreen,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
})
