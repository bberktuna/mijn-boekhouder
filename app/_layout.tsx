// app/_layout.tsx
import { Slot, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export default function RootLayout() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Şimdilik false (yani her zaman signup’a gidecek)

  useEffect(() => {
    const checkAuth = async () => {
      // TODO: Burada ileride token kontrolü yapılacak
      // Örn: const token = await SecureStore.getItemAsync("token");
      // setIsLoggedIn(!!token);

      setTimeout(() => {
        setIsLoggedIn(false) // şimdilik hep logout gibi davran
        setIsLoading(false)
      }, 500) // sahte yükleme efekti
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        router.replace("/(tabs)")
      } else {
        //router.replace("/(auth)/signup")
        router.replace("/(tabs)")
      }
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <Slot />
}
