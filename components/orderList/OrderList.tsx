import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import OrderItem from '../orderItem/OrderItem'
import { IOrderData } from '@/Data/store/slices/getStatusOrder/status.order.slice'

interface OrderListProps {
  orders: IOrderData[]
  day: string
}

const OrderList: React.FC<OrderListProps> = ({ orders, day }) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{day}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 15,
  },
  header: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
})

export default OrderList
