import { FC, useEffect } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GoBackBtn } from './GoBackBtn'
import { Background } from '@/components/Background'

interface IOrdersScreenProps {
  order_status: string
}

const In_Stocks: FC<IOrdersScreenProps> = ({ order_status }) => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <Background>
      <GoBackBtn />
      <Text>{order_status}</Text>
    </Background>
  )
}

export default In_Stocks
