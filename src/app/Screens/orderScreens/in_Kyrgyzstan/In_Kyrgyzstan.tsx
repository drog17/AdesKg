import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from '@/Shared/types/GoBackBtn'
import { Background } from '@/Shared/components/Background'
import OrdersStatus from '@/Shared/components/ordersStatus/OrdersStatus'
import { RootState } from '@/Data/store/store'
import {selectAllOrders, IOrderData} from '@/features/orders/orders.slice'

const In_Kyrgyzstan = () => {
  const navigation = useNavigation()
  const orders = useSelector((state: RootState) => selectAllOrders(state))
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const in_storage_orders_arr = orders.filter((el: IOrderData) => el.status === 'delivered')

  return (
    <Background>
      <GoBackBtn />
      <OrdersStatus
        order_status="В Кыргызстане"
        orders={in_storage_orders_arr}
      />
    </Background>
  )
}

export default In_Kyrgyzstan
