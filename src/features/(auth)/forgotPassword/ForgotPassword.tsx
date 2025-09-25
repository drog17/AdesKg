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
import { router } from 'expo-router'
import { Svg, Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const ForgotPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const navigation = useNavigation()
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const submit = async () => {
    setIsLoading(true)
    if (!form.email) {
      setIsLoading(false)
      setMessage('*Заполните поле')
      return
    }

    try {
      setIsDisabled(true)
      const response = await axios.post(
        BASE_URL + '/users/createConfirmationForgot/' + form.email,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (response.data.code) {
        router.replace({
          pathname: '/(auth)/enterCode/EnterCode',
          params: { code: response.data.code, email: form.email },
        })
      }
    } catch (error: unknown) {
      setIsDisabled(false)
      setIsLoading(false)
      if (axios.isAxiosError(error)) {
        setMessage('*Неверно указана почта/указан пароль')
        setForm({ email: '', password: '' })
      } else {
        setMessage('*Неверно указана почта/указан пароль')
      }
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
        keyboardVerticalOffset={0} // Задайте отступ по необходимости
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
          <Text style={styles.titleLogin}>Забыли пароль</Text>
          <View style={styles.videoInstruction}>
            <ScrollView
              contentContainerStyle={styles.fullScroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.containerForm}>
                <Text style={styles.textTitle}>
                  На вашу почту{' '}
                  <Text style={styles.emailText}>{form.email}</Text> придет код
                  для создания нового пароля
                </Text>
                {message && <Text style={styles.errorTitle}>{message}</Text>}
                <FormField
                  title="*Почта"
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyles={{
                    ...(message && !form.email
                      ? {
                          borderColor: '#f40303',
                          borderWidth: 1,
                        }
                      : null),
                    marginBottom: 25,
                  }}
                  keyboardType="email-address"
                  placeholder="example@gmail.com"
                />
                <CustomButton
                  title="Отправить код"
                  handlePress={submit}
                  isLoading={isLoading}
                  Disabled={isDisabled}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default ForgotPassword
