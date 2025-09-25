import { FC, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwitchForOrders from '../switchForOrders/SwitchForOrders'
import OrderList from '../orderList/OrderList'
import { IOrderData } from '@/Data/store/slices/getStatusOrder/status.order.slice'
import { useSelector } from 'react-redux'
import { RootState } from '@/Data/store/store'
import NoStatusOrdersIcon from '@assets/images/NoOrdersIcon.svg'
import dayjs from 'dayjs' 
import ProductSummary from '../Summary/Summary'

interface IOrdersStatusProps {
  order_status: string
  orders: IOrderData[]
}

const OrdersStatus: FC<IOrdersStatusProps> = ({ order_status, orders }) => {
  const [activeTab, setActiveTab] = useState(order_status)
  const { data } = useSelector((state: RootState) => state.orders)
  const productHistory = useSelector((state: RootState) => state.productHistory.allHistory)
  const deliveredProducts = productHistory.filter(
    (product) => product.statusNew === 'delivered'
  )

  let arr: IOrderData[] | [] = orders

  switch (activeTab) {
    case 'В пути':
      arr = data.filter((el) => el.status === 'on_the_way')
      break
    case 'На складе':
      arr = data.filter((el) => el.status === 'in_storage')
      break
    case 'В Кыргызстане':
      arr = data.filter((el) => el.status === 'delivered')
      break
    default:
      break
  }

  const getOrderDay = (dateUpdated: string) => {
    const date = dayjs(dateUpdated)
    if (date.isSame(dayjs(), 'day')) return 'Сегодня' 
    if (date.isSame(dayjs().subtract(1, 'day'), 'day')) return 'Вчера'
    return date.format('DD.MM.YYYY') 
  }

  const groupedOrders = arr.reduce<Record<string, IOrderData[]>>((acc, order) => {
    const day = getOrderDay(order.dateUpdated)
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(order)
    return acc
  }, {})

  return (
    <SafeAreaView style={styles.container}>
      <SwitchForOrders activeTab={activeTab} onTabChange={setActiveTab} />
      <ScrollView showsVerticalScrollIndicator={true} style={styles.listBoxes}>
        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders).reverse().map(([day, orders]) => {
            const relatedProducts = deliveredProducts.filter((product) =>
              orders.some((order) =>
                dayjs(order.dateUpdated).isSame(dayjs(product.changedDateTime), 'day')
              )
            )

            console.log(`Related Products for ${day}:`, relatedProducts)

            return (
              <View style={styles.groupedContainer} key={day}>
                <OrderList orders={orders} day={day} />
                {activeTab === 'В Кыргызстане' && relatedProducts.length > 0 && (
                  <ProductSummary products={relatedProducts} />
                )}
              </View>
            )
          })
        ) : (
          <View style={styles.noStatusOrders}>
            <NoStatusOrdersIcon />
            <Text style={styles.noStatusOrdersText}>
              В данном разделе пока заказов нет
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrdersStatus

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    flex: 1,
  },
  listBoxes: {
    flex: 1
  },
  groupedContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  noStatusOrders: {
    marginTop: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStatusOrdersText: {
    width: '100%',
    paddingHorizontal: '17.19%',
    textAlign: 'center',
    color: '#C8C8C8',
    fontFamily: '400',
    fontSize: 16,
  },
})
