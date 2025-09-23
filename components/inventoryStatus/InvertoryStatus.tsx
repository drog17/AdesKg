import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import StatusCard from '../statusCard/StatusCard'
import { Href, useRouter } from 'expo-router'

interface I_InventoryStatusProps {
  in_stock: string | number
  on_the_way: string | number
  in_Kyrgyzstan: string | number
}

const InventoryStatus: FC<I_InventoryStatusProps> = ({
  in_Kyrgyzstan,
  in_stock,
  on_the_way,
}) => {
  const router = useRouter()

  const handlePress = (route: string | null) => {
    if (route) {
      router.push(route as Href<string | object>)
    }
  }

  return (
    <View style={styles.cardContainer}>
      <StatusCard
        count={in_stock}
        label="На складе"
        onPress={() => handlePress('/Screens/orderScreens/InStocks/In_Stocks')}
      />
      <StatusCard
        count={on_the_way}
        label="В пути"
        onPress={() => handlePress('/Screens/orderScreens/on_the_way/OnTheWay')}
      />
      <StatusCard
        count={in_Kyrgyzstan}
        label="В Кыргызстане"
        onPress={() =>
          handlePress('/Screens/orderScreens/in_Kyrgyzstan/In_Kyrgyzstan')
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})

export default InventoryStatus
