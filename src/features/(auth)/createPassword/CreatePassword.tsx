import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'
import React, { FC, useState } from 'react'
import FormField from '../../../components/formField/FormField'
import { styles } from './style'
import CustomButton from '@/Shared/components/CustomButton/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import { Svg, Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import Notification from '@/Shared/components/notification/Notification'
import axios from 'axios'
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL
const CreatePassword: FC = () => {
  const { email } = useLocalSearchParams()
  const navigation = useNavigation()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    icon: '',
    iconColor: '',
  })
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })
  const submit = async () => {
    setIsLoading(true)

    if (!form.password) {
      setMessage('*Заполните поле')
      setIsLoading(false) // Завершаем загрузку при ошибке
      return
    }

    if (form.password.length >= 6) {
      console.log('====================================')
      console.log('making post update')
      console.log('email: ', email)
      console.log('password: ', form.password)

      try {
        const response = await axios.post(
          BASE_URL + '/users/update/password',
          {
            email: email,
            password: form.password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )

        if (response.data) {
          console.log('====================================')
          console.log('response.data: ', response.data)
          setNotification({
            message: 'Сохранено!',
            visible: true,
            icon: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z',
            iconColor: '#5EB147',
          })

          setTimeout(() => {
            router.replace('/(auth)/sign-in/sign-in')
          }, 800)
        }
      } catch (error) {
        console.error('Error updating password:', error)
        setMessage('Произошла ошибка, попробуйте еще раз.')
      } finally {
        setIsLoading(false)
      }
    } else {
      setNotification({
        message: 'Повторите еще раз!',
        visible: true,
        icon: 'M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z',
        iconColor: '#f40303',
      })
      setForm({ email: '', password: '' })
      setMessage('*Пароль должен содержать не менее 6 символов')
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('../@assets/images/Graident_16.png')}
      style={styles.fullBackground}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.loginBox}>
          <TouchableOpacity
            style={styles.linkBack}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.arrowBack}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                  fill="#C8C8C8"
                />
              </Svg>
              <Text style={styles.arrowBackTitle}>Назад</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.titleLogin}>Создание пароля</Text>
          <View style={styles.videoInstruction}>
            <ScrollView
              contentContainerStyle={styles.fullScroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.containerForm}>
                <Text style={styles.textTitle}>Придумайте новый пароль</Text>
                {message && <Text style={styles.errorTitle}>{message}</Text>}
                <FormField
                  title="*Пароль"
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                  otherStyles={{
                    ...(message && !form.password
                      ? {
                          borderColor: '#f40303',
                          borderWidth: 1,
                        }
                      : null),
                    marginBottom: 25,
                  }}
                  placeholder="Введите ваш пароль"
                  keyboardType="default"
                />
                <CustomButton
                  title="Сохранить"
                  handlePress={submit}
                  isLoading={isLoading}
                />
                <Notification
                  message={notification.message}
                  visible={notification.visible}
                  onClose={() =>
                    setNotification({ ...notification, visible: false })
                  }
                  icon={notification.icon}
                  iconColor={notification.iconColor}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default CreatePassword
