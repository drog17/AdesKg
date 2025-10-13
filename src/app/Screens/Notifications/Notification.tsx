import React, { useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Data/store/store'; 
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack';
import { Background } from '@/Shared/components/Background';
import { NotificationItem } from '@/Shared/components/NotificationItem';
import { IOrderData, selectAllOrders } from '@/features/orders/orders.slice';
import { setNotifications } from '@/features/notifications/notification.slice';
import { styles } from './notificationStyles';
import { useRouter } from 'expo-router';

interface GroupedNotifications {
  title: string;
  data: IOrderData[];
}

const getNotificationDateTitle = (dateString: string): string => {
  const notificationDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (notificationDate.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (notificationDate.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return notificationDate.toLocaleDateString();
  }
};

export default function Notification() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Получаем все заказы через селектор selectAllOrders
  const orders: IOrderData[] = useSelector((state: RootState) => selectAllOrders(state));

  // Фильтруем только доставленные заказы
  const deliveredOrders = orders
    .filter(order => order.status === 'delivered')
    .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  // Получаем уведомления из slice notifications
  const notifications = useSelector((state: RootState) => state.notifications.items);

  // Статус для NotificationItem (например, есть ли непрочитанное уведомление)
  const status = notifications.find((n:IOrderData) => n.isRead);

  // Сохраняем уведомления при размонтировании
  useEffect(() => {
    return () => {
      dispatch(setNotifications(deliveredOrders));
    };
  }, [dispatch, deliveredOrders]);

  // Группировка уведомлений по дате
  const groupedNotifications: GroupedNotifications[] = deliveredOrders.reduce(
    (acc: GroupedNotifications[], notification) => {
      const title = getNotificationDateTitle(notification.dateCreated);
      const existingGroup = acc.find(group => group.title === title);

      if (existingGroup) {
        existingGroup.data.push(notification);
      } else {
        acc.push({ title, data: [notification] });
      }

      return acc;
    },
    []
  );

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
                  {item.data.map((notification: IOrderData) => (
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
              source={require('@assets/images/Illustration.png')}
              style={styles.img}
            />
            <Text style={styles.desc}>У вас пока нет уведомлений</Text>
          </View>
        )}
      </View>
    </Background>
  );
}