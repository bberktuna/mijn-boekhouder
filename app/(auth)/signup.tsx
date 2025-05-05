import PrimaryButton from "@/components/PrimaryButton"
import { Link } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { TextInput as PaperTextInput } from "react-native-paper"
import colors from "../../constants/colors"

export default function SignupScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = useState(false)

  const handleSignup = () => {
    // TODO: backend entegrasyonu
    console.log("Signup pressed", email, password)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.background} />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <PaperTextInput
          label="Company Name"
          value={companyName}
          autoCapitalize="none"
          onChangeText={setCompanyName}
          mode="outlined"
          style={styles.input}
          selectionColor={colors.darkGreen}
          outlineColor={colors.darkGreen}
          activeOutlineColor={colors.darkGreen}
          textColor={colors.darkGreen}
        />
        <PaperTextInput
          label="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          selectionColor={colors.darkGreen}
          outlineColor={colors.darkGreen}
          activeOutlineColor={colors.darkGreen}
          textColor={colors.darkGreen}
        />
        <PaperTextInput
          style={styles.input}
          label="Password"
          secureTextEntry={!showPassword}
          textContentType="none"
          autoComplete="off"
          value={password}
          mode="outlined"
          onChangeText={setPassword}
          selectionColor={colors.darkGreen}
          outlineColor={colors.darkGreen}
          activeOutlineColor={colors.darkGreen}
          textColor={colors.darkGreen}
          right={
            <PaperTextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              color={colors.darkGreen}
              onPress={() => setShowPassword((prev) => !prev)}
            />
          }
        />
        <PaperTextInput
          style={styles.input}
          label="Confirm Password"
          secureTextEntry={!confirmShowPassword}
          textContentType="none"
          autoComplete="off"
          value={confirmPassword}
          mode="outlined"
          onChangeText={setConfirmPassword}
          selectionColor={colors.darkGreen}
          outlineColor={colors.darkGreen}
          activeOutlineColor={colors.darkGreen}
          textColor={colors.darkGreen}
          right={
            <PaperTextInput.Icon
              icon={confirmShowPassword ? "eye-off" : "eye"}
              color={colors.darkGreen}
              onPress={() => setConfirmShowPassword((prev) => !prev)}
            />
          }
        />

        <PrimaryButton
          title="Sign Up"
          onPress={() => console.log("signUp")}
          style={{ marginTop: 16 }}
        />
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Link href="/(auth)/login" style={styles.link}>
            Login
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.lightGreen, // senin lightgray rengin
    zIndex: -1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  input: {
    marginBottom: 12,
    backgroundColor: colors.lightGreen,
  },
  linkText: { marginTop: 20, textAlign: "center" },
  link: { color: colors.darkGray, fontWeight: "bold" },
})
