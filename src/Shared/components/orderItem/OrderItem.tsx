import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import OrderIcon from '@assets/images/IconOrder.svg'
import { IOrderData } from '@/Data/store/slices/getStatusOrder/status.order.slice'

interface OrderItemProps {
  order: IOrderData
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  let status = null
  let location = null

  switch (order.status) {
    case 'in_storage':
      status = 'На складе'
      location = 'прибыл на склад (Китай)'
      break
    case 'on_the_way':
      status = 'В пути'
      location = 'в пути'
      break
    case 'delivered':
      status = 'На складе'
      location = 'прибыл на склад (Кыргызстан)'
      break
    default:
      break
  }

  const time = new Date(`2024-01-01T${order.dateCreated.slice(11)}`)

  return (
    <View style={styles.container}>
      <View style={styles.container_inStorageAndOnTheWay}>
        <OrderIcon width={40} height={40} />
        <View style={styles.textContainer}>
          <View style={styles.statusAndTime}>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.time}>
              {time.getUTCHours()}:{time.getUTCMinutes()}
            </Text>
          </View>
          <Text style={styles.details}>
            <Text>Ваш заказ под номером</Text>{' '}
            <Text style={styles.bold}>{order.hatch}</Text>{' '}
            <Text style={styles.location}>{location}</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginVertical: 8,
  },
  container_inStorageAndOnTheWay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  delivered_order_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '17.32%',
    paddingTop: 8.5,
    borderTopWidth: 1,
    borderTopColor: 'rgb(255, 255, 250)',
    marginTop: 7.5,
  },
  colorText_deliverd_info: {
    fontFamily: '500',
  },
  delivered_info_text: {
    fontFamily: '400',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  statusAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: '500',
  },
  status: {
    fontFamily: '500',
  },
  details: {
    fontFamily: '400',
    fontSize: 14,
    color: '#555',
  },
  location: {},
  bold: {
    fontWeight: 'bold',
  },
  time: {
    fontFamily: '400',
    fontSize: 14,
    color: '#888',
  },
})

export default OrderItem
