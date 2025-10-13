import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from '../../../../Shared/types/GoBackBtn'
import { Background } from '@/Shared/components/Background'
import OrdersStatus from '@/Shared/components/ordersStatus/OrdersStatus'
import {selectAllOrders, IOrderData} from '@/Data/features/orders/orders.slice'
import { RootState } from '@/Data/store/store'

const OnTheWay = () => {
  const navigation = useNavigation()
  const orders = useSelector((state: RootState) => selectAllOrders(state))

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const in_storage_orders_arr = orders.filter((el:IOrderData) => el.status === 'on_the_way')

  return (
    <Background>
      <GoBackBtn />
      <OrdersStatus order_status="В пути" orders={in_storage_orders_arr} />
    </Background>
  )
}

export default OnTheWay
