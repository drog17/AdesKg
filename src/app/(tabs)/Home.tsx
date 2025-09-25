import backgroundImage from '@assets/images/adesFon.jpg'
import { HelloUser } from '@/Shared/components/HelloUser'
import InventoryStatus from '@/Shared/components/inventoryStatus/InvertoryStatus'
import SearchBar from '@/Shared/components/searchBar/SearchBar'
import {
  IProductHistory,
  setProductHistory,
} from '@/Data/store/slices/getStatusOrder/productHistory.slice'
import {
  IOrderData,
  setOrder,
} from '@/Data/store/slices/getStatusOrder/status.order.slice'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useAuth } from '../context/AuthContext'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

interface IResponse {
  DELIVERED: number
  IN_STORAGE: number
  ON_THE_WAY: number
  products: IOrderData[]
}

export default function HomeScreen() {
  const { userProfile } = useAuth()
  const [counts, setCounts] = useState({
    DELIVERED: 0,
    IN_STORAGE: 0,
    ON_THE_WAY: 0,
  })

  const dispatch = useDispatch()

  // Общая функция загрузки данных
  const loadData = useCallback(
    async (userId: string) => {
      if (!BASE_URL) {
        console.warn('BASE_URL is not defined')
        return
      }
      try {
        const [allRes, histRes] = await Promise.all([
          axios.get<IResponse>(`${BASE_URL}/product/all/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get<IProductHistory[]>(
            `${BASE_URL}/product/history/${userId}`,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          ),
        ])

        setCounts({
          DELIVERED: allRes.data.DELIVERED,
          IN_STORAGE: allRes.data.IN_STORAGE,
          ON_THE_WAY: allRes.data.ON_THE_WAY,
        })
        dispatch(setOrder(allRes.data.products))
        dispatch(setProductHistory(histRes.data))
      } catch (error: any) {
        // Полезные логи
        console.error(
          'Error fetching data:',
          error?.message,
          error?.response?.status,
          error?.response?.data
        )
      }
    },
    [dispatch]
  )

  // 1) Просто логируем userProfile.id когда он появляется/меняется
  useEffect(() => {
    console.log('userProfile.id →', userProfile?.id)
  }, [userProfile?.id])

  // 2) Загружаем данные при первом появлении id (и если id поменяется)
  useEffect(() => {
    if (!userProfile?.id) return
    loadData(userProfile.id)
  }, [userProfile?.id, loadData])

  // 3) Дополнительно перезагрузка при возврате на экран (фокус)
  useFocusEffect(
    useCallback(() => {
      if (!userProfile?.id) return
      loadData(userProfile.id)
    }, [userProfile?.id, loadData])
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground
          source={backgroundImage}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <>
            <SafeAreaView style={styles.container}>
              <HelloUser
                firstName={userProfile?.name}
                id={userProfile?.personal_code}
                key={'home_screen'}
              />
            </SafeAreaView>
            <View style={styles.secondSection}>
              <SearchBar />
              <InventoryStatus
                in_Kyrgyzstan={counts.DELIVERED}
                in_stock={counts.IN_STORAGE}
                on_the_way={counts.ON_THE_WAY}
              />
            </View>
          </>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondSection: {
    height: 491,
    backgroundColor: '#fff',
    display: 'flex',
    gap: 35,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
  },
})
