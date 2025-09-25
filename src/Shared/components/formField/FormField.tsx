import {
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { styles } from './style'
import Dropdown, { OptionItem } from '../dropDown/DropDown'
import { MaskedTextInput } from 'react-native-mask-text'

export interface IFormFieldProps {
  title: string // Исправлено на string
  value: string // Исправлено на string
  placeholder: string // Исправлено на string
  handleChangeText: (text: string) => void // Тип функции для onChange
  otherStyles?: StyleProp<ViewStyle> // Исправлено с "string" на StyleProp<ViewStyle>
  keyboardType?: KeyboardTypeOptions
  cities?: OptionItem[] // Массив городов с типом OptionItem для Dropdown
  isDropdown?: boolean
  options?: OptionItem[]
  mask?: string
}

const FormField: FC<IFormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  cities,
  isDropdown = false,
  options,
  mask,
  ...props
}) => {
  const initialPhoneValue = '+996'
  const isPhoneField = mask && mask.startsWith('')

  // Если поле - телефон, установим начальное значение, если оно не задано
  useEffect(() => {
    if (isPhoneField && !value.startsWith(initialPhoneValue)) {
      handleChangeText(initialPhoneValue)
    }
  }, [isPhoneField, value])

  const handleMaskedInputChange = (formatted: string) => {
    // Проверка, чтобы всегда сохранять +996 в начале
    if (isPhoneField) {
      if (!formatted.startsWith(initialPhoneValue)) {
        // Восстанавливаем +996, если пользователь его удалил
        handleChangeText(
          initialPhoneValue + formatted.replace(initialPhoneValue, '')
        )
      } else {
        handleChangeText(formatted)
      }
    } else {
      handleChangeText(formatted)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleCitySelect = (city: OptionItem) => {
    handleChangeText(city.label)
  }

  return (
    <View style={{ width: '100%' }}>
      <Text style={[styles.textTitle]}>{title}</Text>
      <View style={[styles.inputBox, otherStyles]}>
        {isDropdown && cities ? (
          <Dropdown
            data={cities}
            onChange={handleCitySelect}
            placeholder={placeholder}
          />
        ) : mask ? (
          <MaskedTextInput
            mask={mask}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#c8c8c8"
            onChangeText={handleMaskedInputChange}
            style={styles.input}
            keyboardType={keyboardType}
            {...props}
          />
        ) : (
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#c8c8c8"
            onChangeText={handleChangeText}
            style={styles.input} // Добавляем цвет текста для наглядности
            {...props} // Пропускаем остальные пропсы
            keyboardType={keyboardType}
            secureTextEntry={title === '*Пароль' && !showPassword}
          />
        )}
        {title === '*Пароль' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                !showPassword
                  ? require('@assets/images/IconEyeClose.png')
                  : require('@assets/images/IconEyeOpen.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
