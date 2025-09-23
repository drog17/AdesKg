import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from '../GoBackBtn'
import { Background } from '@/components/Background'
import OrdersStatus from '@/components/ordersStatus/OrdersStatus'
import { RootState } from '@/Data/store/store'

const In_Kyrgyzstan = () => {
  const navigation = useNavigation()
  const { data } = useSelector((state: RootState) => state.orders)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const in_storage_orders_arr = data.filter((el) => el.status === 'delivered')

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
