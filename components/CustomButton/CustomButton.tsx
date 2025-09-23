import { Text, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { FC } from 'react'

export interface ICustomButton {
  title: string
  handlePress: () => void
  buttonStyle?: object
  textStyles?: object
  isLoading?: boolean
  Disabled?: boolean
}

const CustomButton: FC<ICustomButton> = ({
  title,
  handlePress,
  textStyles,
  buttonStyle,
  isLoading,
  Disabled,
}) => {
  return (
    <TouchableOpacity
      onPressIn={handlePress}
      style={[styles.btnLogin, buttonStyle]}
      disabled={isLoading}
    >
      {isLoading ? (
        <Text style={styles.textBtn}>Загрузка...</Text> // Выводим текст загрузки
      ) : (
        <Text style={[styles.textBtn, textStyles]}>{title}</Text> // Применяем переданные стили текста
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
