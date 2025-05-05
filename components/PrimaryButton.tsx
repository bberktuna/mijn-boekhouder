import { AntDesign } from "@expo/vector-icons"
import React from "react"
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import colors from "../constants/colors"

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: string
  iconPosition?: "left" | "right"
  iconColor?: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  iconPosition = "left",
  iconColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      {icon && iconPosition === "left" && (
        <AntDesign
          name={icon}
          size={20}
          color={iconColor}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[styles.text, textStyle]}>{title}</Text>

      {icon && iconPosition === "right" && (
        <AntDesign
          name={icon}
          size={20}
          color={iconColor}
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: colors.midGreen,
    paddingHorizontal: 36,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.darkGreen,
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default PrimaryButton
