import { store } from '@/Data/store/store'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import 'react-native-reanimated'
import { Provider } from 'react-redux'
import  {AuthProvider}  from '@/Shared/context/AuthContext'
import { NotificationProvider } from '@/Shared/context/NotificationContext'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    900: require('@assets/fonts/Montserrat-Black.ttf'),
    700: require('@assets/fonts/Montserrat-Bold.ttf'),
    800: require('@assets/fonts/Montserrat-ExtraBold.ttf'),
    300: require('@assets/fonts/Montserrat-Light.ttf'),
    500: require('@assets/fonts/Montserrat-Medium.ttf'),
    400: require('@assets/fonts/Montserrat-Regular.ttf'),
    600: require('@assets/fonts/Montserrat-SemiBold.ttf'),
  })

  useEffect(() => {
    const prepareApp = async () => {
      if (loaded) {
        await SplashScreen.hideAsync()
      }
    }
    prepareApp()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthProvider>
          <NotificationProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </NotificationProvider>
        </AuthProvider>
      </PaperProvider>
    </Provider>
  )
}