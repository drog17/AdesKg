import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout: React.FC = () => {

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterCode"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePassword"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar backgroundColor="transparent" style="light" />
    </>
  )
}

export default AuthLayout
