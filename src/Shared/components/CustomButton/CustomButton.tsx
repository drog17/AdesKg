// import { Text, TouchableOpacity } from 'react-native'
// import { styles } from './style'
// import { FC } from 'react'

// export interface ICustomButton {
//   title: string
//   handlePress: () => void
//   buttonStyle?: object
//   textStyles?: object
//   isLoading?: boolean
//   Disabled?: boolean,
//   icon?: React.ReactElement,
//   onPress: () => void;
// }

// export const CustomButton: FC<ICustomButton> = ({
//   title,
//   handlePress,
//   textStyles,
//   buttonStyle,
//   isLoading,
//   Disabled,
// }) => {
//   return (
//     <TouchableOpacity
//       onPressIn={handlePress}
//       style={[styles.btnLogin, buttonStyle]}
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <Text style={styles.textBtn}>Загрузка...</Text> // Выводим текст загрузки
//       ) : (
//         <Text style={[styles.textBtn, textStyles]}>{title}</Text> // Применяем переданные стили текста
//       )}
//     </TouchableOpacity>
//   )
// }
import { Text, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { FC } from 'react'

export interface ICustomButton {
  title: string;
  onPress: () => void; // ✅ основной обработчик
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
      onPress={onPress} // ✅ заменили handlePress → onPress
      style={[styles.btnLogin, buttonStyle, (disabled || isLoading) && { opacity: 0.5 }]}
      disabled={disabled || isLoading} // ✅ правильное свойство
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
