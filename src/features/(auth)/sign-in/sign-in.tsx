import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import React, { FC, useState } from 'react'
import FormField from '../../../components/formField/FormField'
import { styles } from './style'
import { router, Link } from 'expo-router'
import { Svg, Path } from 'react-native-svg'
import axios from 'axios'
import { useAuth } from '@/app/context/AuthContext'
import CustomButton from '@/src/Shared/components/CustomButton/CustomButton'
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const SignIn: FC = () => {
  const [message, setMessage] = useState('')
  const [errorFields, setErrorFields] = useState({
    email: false,
    password: false,
  })
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonPress = () => {
    Keyboard.dismiss() // Скрывает клавиатуру
  }

  const submit = async () => {
    handleButtonPress()
    setIsLoading(true)
    if (!form.email || !form.password) {
      setIsLoading(false)
      setMessage('*Заполните поля')
      const errors = {
        email: !form.email, // Ошибка, если поле email пустое
        password: !form.password, // Ошибка, если поле password пустое
      }

      setErrorFields(errors) // Обновляем состояние ошибок

      if (!errors.email && !errors.password) {
        console.log('Форма успешно отправлена:', form)
        setErrorFields({ email: false, password: false }) // Сбрасываем ошибки
      }
      return
    }
    try {
      const response = await axios.post(BASE_URL + '/test/auth/login', {
        email: form.email,
        password: form.password,
      })

      // get user profile
      if (response.data.access_token) {
        const userResponse = await axios.get(BASE_URL + '/users/info', {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        })

        // Save token and profile to context
        login(response.data.access_token, userResponse.data)
      }

      setTimeout(() => {
        router.replace('/(tabs)/Home')
      }, 100)
    } catch (error: unknown) {
      setIsLoading(false)
      setMessage('*Неверно указана почта/указан пароль')
      if (axios.isAxiosError(error)) {
        setErrorFields({ email: true, password: true })
      } else {
        setMessage('*Неверно указана почта/указан пароль')
        setErrorFields({ email: true, password: true })
      }
    }
  }
  return (
    <ImageBackground
      source={require('../../../assets/images/Graident_16.png')}
      style={styles.fullBackground}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0} // Задайте отступ по необходимости
      >
        <View style={styles.loginBox}>
          <Link style={styles.linkBack} href={'/'}>
            <View style={styles.arrowBack}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                  fill="#C8C8C8"
                />
              </Svg>
              <Text style={styles.arrowBackTitle}>Назад</Text>
            </View>
          </Link>
          <Text style={styles.titleLogin}>Вход в аккаунт</Text>
          <View style={styles.videoInstruction}>
            <ScrollView
              contentContainerStyle={styles.fullScroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.containerForm}>
                {message && (
                  <View>
                    <Text style={styles.errorTitle}>{message}</Text>
                  </View>
                )}

                <FormField
                  title="*Почта"
                  value={form.email}
                  handleChangeText={(e) => {
                    setForm({ ...form, email: e }) // Обновляем значение поля
                    setErrorFields({ ...errorFields, email: false }) // Убираем ошибку
                  }}
                  otherStyles={
                    errorFields.email
                      ? { borderColor: '#f40303', borderWidth: 1 } // Красный бордер при ошибке
                      : null
                  }
                  keyboardType="email-address"
                  placeholder="example@gmail.com"
                />
                <FormField
                  title="*Пароль"
                  value={form.password}
                  handleChangeText={(e) => {
                    setForm({ ...form, password: e })
                    setErrorFields({ ...errorFields, password: false })
                  }}
                  otherStyles={
                    errorFields.password
                      ? { borderColor: '#f40303', borderWidth: 1 }
                      : null
                  }
                  placeholder="Введите ваш пароль"
                  keyboardType="default"
                />
                <Link
                  style={styles.forgotPassword}
                  href={'/(auth)/forgotPassword/ForgotPassword'}
                >
                  Забыли пароль?
                </Link>
                <CustomButton
                  title="Войти"
                  handlePress={submit}
                  isLoading={isLoading}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default SignIn