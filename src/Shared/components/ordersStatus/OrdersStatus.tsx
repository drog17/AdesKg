import { FC, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwitchForOrders from '../switchForOrders/SwitchForOrders'
import OrderList from '../orderList/OrderList'
import { IOrderData, selectAllOrders } from '@/Data/features/orders/orders.slice'
import { useSelector } from 'react-redux'
import NoStatusOrdersIcon from '@assets/images/NoOrdersIcon.svg'
import dayjs from 'dayjs'
import ProductSummary from '../Summary/Summary'

interface IOrdersStatusProps {
  order_status: string
  orders: IOrderData[]
}

const OrdersStatus: FC<IOrdersStatusProps> = ({ order_status, orders }) => {
  const [activeTab, setActiveTab] = useState(order_status)

  const allOrders = useSelector((state: any) => selectAllOrders(state) ?? []) as IOrderData[]
  const productHistory = useSelector((state: any) => state.productHistory?.allHistory ?? []) as any[]
  const deliveredProducts = productHistory.filter(product => product.statusNew === 'delivered')

  let arr: IOrderData[] = orders ?? []

  // Фильтрация по вкладкам
  switch (activeTab) {
    case 'В пути':
      arr = allOrders.filter(el => el?.status === 'on_the_way')
      break
    case 'На складе':
      arr = allOrders.filter(el => el?.status === 'in_storage')
      break
    case 'В Кыргызстане':
      arr = allOrders.filter(el => el?.status === 'delivered')
      break
  }

  // Получаем день заказа
  const getOrderDay = (dateUpdated?: string) => {
    if (!dateUpdated || !dayjs(dateUpdated).isValid()) return 'Неизвестная дата'
    const date = dayjs(dateUpdated)
    if (date.isSame(dayjs(), 'day')) return 'Сегодня'
    if (date.isSame(dayjs().subtract(1, 'day'), 'day')) return 'Вчера'
    return date.format('DD.MM.YYYY')
  }

  // Группировка заказов по дням как массив объектов
  const groupedOrders: { day: string; orders: IOrderData[] }[] = []

  arr.forEach(order => {
    const day = getOrderDay(order.dateUpdated)
    let dayGroup = groupedOrders.find(g => g.day === day)
    if (!dayGroup) {
      dayGroup = { day, orders: [] }
      groupedOrders.push(dayGroup)
    }
    dayGroup.orders.push(order)
  })

  return (
    <SafeAreaView style={styles.container}>
      <SwitchForOrders activeTab={activeTab} onTabChange={setActiveTab} />
      <ScrollView showsVerticalScrollIndicator style={styles.listBoxes}>
        {groupedOrders.length > 0 ? (
          groupedOrders
            .slice()
            .reverse()
            .map(group => {
              const relatedProducts = deliveredProducts.filter(product =>
                group.orders.some(order =>
                  order.dateUpdated &&
                  dayjs(order.dateUpdated).isSame(dayjs(product.changedDateTime), 'day')
                )
              )

              return (
                <View style={styles.groupedContainer} key={group.day}>
                  <OrderList orders={group.orders} day={group.day} />
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
    flex: 1,
  },
  groupedContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  noStatusOrders: {
    marginTop: 22,
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
