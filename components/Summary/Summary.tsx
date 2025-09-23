import { IProductHistory } from '@/Data/store/slices/getStatusOrder/productHistory.slice'
import { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface ProductSummaryProps {
  products: IProductHistory[]
}

const ProductSummary: FC<ProductSummaryProps> = ({ products }) => {
  const totalWeight = products.reduce((acc, item) => acc + (item.weight || 0), 0)
  const totalPrice = products.reduce((acc, item) => acc + (item.price || 0), 0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Общий вес: {totalWeight} кг</Text>
      <Text style={styles.text}>Общая сумма: {totalPrice.toFixed(2)} сом</Text>
    </View>
  )
}

export default ProductSummary

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontFamily: '400',
  },
})
