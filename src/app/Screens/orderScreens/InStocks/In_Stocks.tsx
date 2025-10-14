
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Background } from '@/Shared/components/Background'
import OrdersStatus from '@/Shared/components/ordersStatus/OrdersStatus'
import { useSelector } from 'react-redux'
import { RootState } from '@/Data/store/store'
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack'
import { IOrderData, selectAllOrders } from '@/features/orders/orders.slice'

const In_Stocks = () => {
  const navigation = useNavigation()
  const allOrders = useSelector((state: RootState) => selectAllOrders(state) ?? [])

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const inStorageOrders = allOrders.filter((order: IOrderData) => order.status === 'in_storage')

  return (
    <Background>
      <GoBack title="Главная" />
      <OrdersStatus order_status="На складе" orders={inStorageOrders} />
    </Background>
  )
}

export default In_Stocks
