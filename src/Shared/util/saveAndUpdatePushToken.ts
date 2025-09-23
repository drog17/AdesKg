import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerForPushNotificationsAsync } from './registerForPushNotificationAsync'
import axios from 'axios'
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL
const PUSH_TOKEN_STORAGE_KEY = 'expoPushToken'
const ACCESS_TOKEN_STORAGE_KEY = 'accessToken'

export const StoredPushToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, token)
  } catch (e) {
    console.error('Failed to save ExpoPushToken to AsyncStorage, e')
    throw e
  }
}

export const getStoredPushToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY)
  } catch (e) {
    console.error('Failed to get ExpoPushToken from AsyncStorage', e)
    return null
  }
}

export const SendPushTokenToServer = async (token: string): Promise<void> => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    console.log('Sending push token to server', { token })
    if (!accessToken) {
      throw new Error('No access token found. User must be authenticated.')
    }
    const response = await axios.post(
      BASE_URL + '/push-tokens/update-push-token',
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    console.log('ExpoPushToken sent to server successfully:', response.data)
  } catch (e) {
    console.error('Failed to send ExpoPushToken to server', e)
    throw e
  }
}

export const CheckAndUpdatePushToken = async (): Promise<string | null> => {
  try {
    const newToken = await registerForPushNotificationsAsync()
    if (!newToken) {
      throw new Error('FailedToGetExpoPushToken')
    }

    const storedToken = await getStoredPushToken()

    if (newToken !== storedToken) {
      console.log('ExpoPushToken changed or not found. Updating...')
      await StoredPushToken(newToken)
      await SendPushTokenToServer(newToken)
      return newToken
    } else {
      console.log('ExpoPushToken is up-to-date:', newToken)
      return newToken
    }
  } catch (e) {
    console.error('Error in checkAndUpdatePushToken:', e)
    throw e
  }
}

export const ClearPushToken = async (): Promise<void> => {
  try {
    AsyncStorage.removeItem(PUSH_TOKEN_STORAGE_KEY)
    console.log('ExpoPushToken removed from AsyncStorage')
  } catch (e) {
    console.error('Failed to remove ExpoPushToken from AsyncStorage', e)
    throw e
  }
}

export const InvalidatePushTokenOnServer = async (): Promise<void> => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    if (!accessToken) {
      throw new Error('No access token found. User must be authenticated.')
    }
    const response = await axios.post(
      BASE_URL + '/push-tokens/invalidate-push-token',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    console.log(
      'ExpoPushToken invalidated on server successfully:',
      response.data
    )
  } catch (e) {
    console.error(
      'Failed to invalidate ExpoPushToken on server:',
    )
    throw e
  }
}
