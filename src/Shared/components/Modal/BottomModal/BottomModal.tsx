import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { Portal } from 'react-native-paper'
import WhatsappIcon from '@assets/images/WhatsApp.svg'
import { DoubleCustomButton } from '@/Shared/components/navigation/BoubleCustomButton/DoubleCustomButton'
import { styles } from './BottomModalStyle'
import { CustomButton } from '@/Shared/components/navigation/CustomButton'

interface BottomModalProps {
  visible: boolean
  onClose: () => void
  headTitle: string
}

export const BottomModal: FC<BottomModalProps> = ({
  visible,
  onClose,
  headTitle,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(300))

  useEffect(() => {
    if (visible) {
      showModal()
      // Подключение обработчика кнопки "Назад"
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      )
      return () => backHandler.remove() // Удаляем обработчик при закрытии модального окна
    } else {
      hideModal()
    }
  }, [visible])

  const handleBackPress = () => {
    // Блокируем кнопку "Назад", если модальное окно активно
    if (visible) {
      return true // Блокирует стандартное поведение
    }
    return false // Разрешает стандартное поведение
  }

  const showModal = () => {
    fadeAnim.setValue(0) // Сброс значения анимации непрозрачности
    slideAnim.setValue(300) // Сброс значения анимации сдвига

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const hideModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => onClose())
  }

  if (!visible) return null

  const openWhatsAppChat = (phoneNumber: string) => {
    const url = `https://wa.me/${phoneNumber}`
    Linking.openURL(url).catch((err) =>
      console.error('Ошибка открытия WhatsApp:', err)
    )
  }
  const Link = () => {
    const url = `https://ades.kg/delete-account`
    Linking.openURL(url)
  }

  return (
    <Portal>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View
            style={[styles.popover, { transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.nav}></View>
            <View style={styles.line}>
              <Text style={styles.modalTitle}>{headTitle}</Text>
            </View>
            <View style={styles.btnContainer}>
              <DoubleCustomButton
                icon1={WhatsappIcon}
                title1="WhatsApp - Бишкек"
                onPress1={() => openWhatsAppChat('996225905055')}
                icon2={WhatsappIcon}
                title2="WhatsApp - Ош"
                onPress2={() => openWhatsAppChat('996705905055')}
              />
              <CustomButton 
              icon={WhatsappIcon}
              title='Удалить аккаунт'
              onPress={Link}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  )
}
