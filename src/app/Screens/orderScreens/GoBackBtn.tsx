import { type FC } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Arrow from '@/assets/images/ArrowLeft.svg'
import { useNavigation } from 'expo-router'

export const GoBackBtn: FC = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.btnBox}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
        <Arrow height={24} width={24} />
        <Text style={styles.title}>Главная</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    width: '100%',
    paddingTop: 47,
    paddingBottom: 25,
    marginTop: 47
  },
  btn: {
    width: '100%',
    backgroundColor: '#fffffa',
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    fontFamily: '400',
    fontSize: 12,
    color: '#737373',
  },
})
