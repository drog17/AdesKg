import backgroundImage from '@assets/images/adesFon.jpg'
import { HelloUser } from '@/Shared/components/HelloUser'
import InventoryStatus from '@/Shared/components/inventoryStatus/InvertoryStatus'
import SearchBar from '@/Shared/components/searchBar/SearchBar'
import {
  IProductHistory,
  setHistoryForOrder,
} from '@/Data/features/orders/productHistory.slice'
import {
  IOrderData,
  upsetOrders,
} from '@/Data/features/orders/orders.slice'
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
import { useAppDispatch } from '@/Data/store/store'
import { useAuth } from '@/Shared/context/AuthContext'

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

  const dispatch = useAppDispatch()

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
          axios.get<IProductHistory[]>(`${BASE_URL}/product/history/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
          }),
        ])

        // Обновляем статистику
        setCounts({
          DELIVERED: allRes.data.DELIVERED,
          IN_STORAGE: allRes.data.IN_STORAGE,
          ON_THE_WAY: allRes.data.ON_THE_WAY,
        })

        // Обновляем заказы
        dispatch(upsetOrders(allRes.data.products))

        // Обновляем историю — теперь передаём orderId и список history
        if (allRes.data.products?.length) {
          const firstOrderId = allRes.data.products[0].id // пример: можно расширить под каждый заказ
          dispatch(setHistoryForOrder({ orderId: firstOrderId, history: histRes.data }))
        }
      } catch (error: any) {
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

  // Логируем userProfile.id
  useEffect(() => {
    console.log('userProfile.id →', userProfile?.id)
  }, [userProfile?.id])

  // Загружаем данные при первом появлении id
  useEffect(() => {
    if (!userProfile?.id) return
    loadData(userProfile.id)
  }, [userProfile?.id, loadData])

  // Перезагрузка при возврате на экран
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
                firstName={userProfile?.name ?? ''}
                id={
                  userProfile?.personal_code != null
                    ? String(userProfile.personal_code)
                    : undefined
                }
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
