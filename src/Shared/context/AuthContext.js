import {
  CheckAndUpdatePushToken,
  ClearPushToken,
  InvalidatePushTokenOnServer,
} from '@/Shared/util/saveAndUpdatePushToken'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('')
  const [userProfile, setUserProfile] = useState({})
  const [socket, setSocket] = useState(null)

  const login = async (token, profile) => {
    setAccessToken(token)
    setUserProfile(profile)
    try {
      await AsyncStorage.setItem('accessToken', token)
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile))
      console.log('Access token during login:', token) // Лог для проверки токена
      const expoPushToken = await CheckAndUpdatePushToken()
      if (expoPushToken) {
        console.log('Push token updated during login:', expoPushToken)
      }
    } catch (error) {
      console.error('Ошибка сохранения токена или профиля:', error)
    }
  }

  const logout = async () => {
    try {
      // Сначала инвалидируем токен на сервере, пока accessToken доступен
      await InvalidatePushTokenOnServer()

      // Затем очищаем локальные данные
      setAccessToken('')
      setUserProfile({})
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('userProfile')
      await ClearPushToken()
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error)
    }

    router.replace('/')
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken')
        console.log('Stored access token:', storedToken)
        const storedProfile = await AsyncStorage.getItem('userProfile')
        if (storedToken && storedProfile) {
          const profile = JSON.parse(storedProfile)
          setAccessToken(storedToken)
          setUserProfile(profile)
          const expoPushToken = await CheckAndUpdatePushToken()
          if (expoPushToken) {
            console.log('Push token updated on app start:', expoPushToken)
          }
          router.replace('/(tabs)/Home')
        } else {
          router.replace('/')
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error)
        router.replace('/')
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (userProfile.id) {
      const newSocket = io(`wss:bf4272e018c2.ngrok-free.app`, {
        query: { userId: userProfile.id },
      })

      console.log('Connected to WebSocket with userId:', userProfile.id)

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
        setSocket(null)
      }
    }
  }, [userProfile])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userProfile,
        login,
        logout,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
