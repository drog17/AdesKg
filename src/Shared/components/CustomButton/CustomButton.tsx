import { Text, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { FC } from 'react'

export interface ICustomButton {
  title: string;
  onPress: () => void; 
  buttonStyle?: object;
  textStyles?: object;
  isLoading?: boolean;
  disabled?: boolean;   
  icon?: React.ReactElement;
}

export const CustomButton: FC<ICustomButton> = ({
  title,
  onPress,
  textStyles,
  buttonStyle,
  isLoading = false,
  disabled = false,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress} 
      style={[styles.btnLogin, buttonStyle, (disabled || isLoading) && { opacity: 0.5 }]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Text style={styles.textBtn}>Загрузка...</Text>
      ) : (
        <>
          {icon}
          <Text style={[styles.textBtn, textStyles]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}
