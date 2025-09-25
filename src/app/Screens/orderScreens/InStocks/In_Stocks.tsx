import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from '../GoBackBtn'
import { Background } from '@/Shared/components/Background'
import OrdersStatus from '@/Shared/components/ordersStatus/OrdersStatus'
import { useSelector } from 'react-redux'
import { RootState } from '@/Data/store/store'
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack'

const In_Stocks = () => {
  const navigation = useNavigation()
  const { data } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const in_storage_orders_arr = data.filter((el) => el.status === 'in_storage')

  return (
    <Background>
      <GoBack title="Главная" />
      <OrdersStatus order_status="На складе" orders={in_storage_orders_arr} />
    </Background>
  )
}

export default In_Stocks
