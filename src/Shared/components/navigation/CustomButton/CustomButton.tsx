import { Text, TouchableOpacity, View } from "react-native";
import Arrow from '@assets/images/ArrowIcon.svg'
import { type FC } from 'react'
import { styles } from "./CustomButtonStyle";


interface CustomButtonProps {
  icon: React.ElementType,
  title: string,
  onPress: () => void,
}

export const CustomButton: FC<CustomButtonProps> = ({icon: Icon, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.iconAndText}>
      <Icon width={32} height={32}  style={styles.logo}/>
      <Text style={styles.desc}>{title}</Text>
      </View>
      <Arrow width={24} height={24} />
    </TouchableOpacity>
  )
}


