import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from '../GoBackBtn'
import { Background } from '@/src/Shared/components/Background'
import OrdersStatus from '@/src/Shared/components/ordersStatus/OrdersStatus'

import { RootState } from '@/Data/store/store'

const OnTheWay = () => {
  const navigation = useNavigation()
  const { data } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const in_storage_orders_arr = data.filter((el) => el.status === 'on_the_way')

  return (
    <Background>
      <GoBackBtn />
      <OrdersStatus order_status="В пути" orders={in_storage_orders_arr} />
    </Background>
  )
}

export default OnTheWay
