import { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Text, View, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/Data/store/store'
import { GoBack } from '@/components/navigation/GoBackButton/GoBack'
import { Background } from '@/components/Background'
import { NotificationItem } from '@/components/NotificationItem'
import { IOrderData } from '@/Data/store/slices/getStatusOrder/status.order.slice'
import { useDispatch } from 'react-redux'
import { setNotifications } from '@/Data/store/slices/notificationDelivered/notificationDeliverd.slice'
import { styles } from './notificationStyles'

interface GroupedNotifications {
  title: string
  data: IOrderData[]
}

const getNotificationDateTitle = (dateString: string): string => {
  const notificationDate = new Date(dateString)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (notificationDate.toDateString() === today.toDateString()) {
    return 'Сегодня'
  } else if (notificationDate.toDateString() === yesterday.toDateString()) {
    return 'Вчера'
  } else {
    return notificationDate.toLocaleDateString()
  }
}

export default function Notification() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const deliveredOrders = useSelector((state: RootState) =>
    state.orders.data
      .filter((order) => order.status === 'delivered')
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
  )
  const status = useSelector((state: RootState) =>
    state.notification.notificationData.find((order) => order.isRead)
  )

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  useEffect(() => {
    return () => {
      dispatch(setNotifications(deliveredOrders))
    }
  }, [])

  const groupedNotifications: GroupedNotifications[] = deliveredOrders.reduce(
    (acc: GroupedNotifications[], notification) => {
      const title = getNotificationDateTitle(notification.dateCreated)
      const existingGroup = acc.find((group) => group.title === title)

      if (existingGroup) {
        existingGroup.data.push(notification)
      } else {
        acc.push({ title, data: [notification] })
      }

      return acc
    },
    []
  )

  return (
    <Background>
      <GoBack title="Главная" />
      <View style={styles.container}>
        {deliveredOrders.length > 0 ? (
          <FlatList
            data={groupedNotifications}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>{item.title}</Text>
                <View style={styles.itemsBox}>
                  {item.data.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      order={notification}
                      isRead={status?.isRead}
                    />
                  ))}
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.list}>
            <Image
              source={require('@/assets/images/Illustration.png')}
              style={styles.img}
            />
            <Text style={styles.desc}>У вас пока нет уведомлений</Text>
          </View>
        )}
      </View>
    </Background>
  )
}
