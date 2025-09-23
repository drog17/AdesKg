import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import React, { FC, useState, useEffect, useRef } from 'react'
import FormField from '../../../components/formField/FormField'
import { styles } from './style'
import CustomBotton from '@/components/CustomButton/CustomButton'
import { router, Link } from 'expo-router'
import CustomCheckBox from '@/components/CustomCheckBox/CustomCheckBox'
import { Svg, Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import Notification from '@/components/notification/Notification'
import { OtpInput, OtpInputRef } from 'react-native-otp-entry'
import axios from 'axios'
import { useAuth } from '@/app/context/AuthContext'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [cityKey, setCityKey] = useState(0)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [errorFields, setErrorFields] = useState({
    phone: false,
  })
  const [form, setForm] = useState({
    email: '',
    password: '',
    surname: '',
    name: '',
    phone: '+996',
    city: '',
    branch: '',
  })
  const [message, setMessage] = useState('')
  const navigation = useNavigation()
  const [otp, setOtp] = useState('')
  const otpRef = useRef<OtpInputRef | null>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [confirmCode, setConfirmCode] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    icon: '',
    iconColor: '',
  })

  const handleButtonPress = () => {
    Keyboard.dismiss() // Скрывает клавиатуру
  }

  // Функция для проверки, что поле телефона не пустое
  const isPhoneEmpty = (phoneValue: string) => {
    const cleanedPhone = phoneValue.replace(/[^0-9]/g, '') // Удаляем все символы, кроме цифр
    return cleanedPhone.length <= 11
  }
  const { login } = useAuth()

  const cityOptions = [
    { value: 'Бишкек', label: 'Бишкек' },
    { value: 'Ош', label: 'Ош' },
  ]

  const branchOptions: {
    [key: string]: { value: string; label: string }[]
  } = {
    Бишкек: [
      { value: 'Анкара 10B', label: 'Анкара 10B' },
      // Другие филиалы
    ],
    Ош: [
      { value: 'Алиева 219', label: 'Алиева 219' },
      // Другие филиалы
    ],
  }

  useEffect(() => {
    if (otp.length === 4) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [otp])

  useEffect(() => {
    if (isTimerActive) {
      const fetchData = async () => {
        try {
          console.log('====================================')
          console.log('creating the confirmation......')
          const response = await axios.post(
            BASE_URL + '/users/createConfirmation/' + form.email,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          if (response.data.code) {
            console.log('====================================')
            console.log('sended confirm: ' + response.data.code)
            setConfirmCode(response.data.code)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1 // Уменьшаем время на 1 секунду
          } else {
            clearInterval(intervalId) // Останавливаем таймер
            setIsTimerActive(false) // Останавливаем таймер
            return 0
          }
        })
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [isTimerActive])

  const startNewTimer = () => {
    setTimeLeft(180) // Устанавливаем начальное время (например, 5 минут)
    setIsTimerActive(true) // Активируем таймер
  }

  const submitConfirm = async () => {
    handleButtonPress()
    setIsLoading(true)

    if (!otp || otp.length < 4) {
      setIsLoading(false)
      setMessage('Введите 4-значный код')
      return
    }
    if (otp === confirmCode) {
      // setNotification({
      //   message: 'Зарегистрировано',
      //   visible: true,
      //   icon: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z',
      //   iconColor: '#5EB147',
      // })

      try {
        const response = await axios.post(BASE_URL + '/users', {
          whatsApp: false,
          email: form.email,
          password: form.password,
          name: form.name,
          surname: form.surname,
          phone: form.phone,
          city: form.city,
          residenceCity: form.branch,
        })

        console.log('====================================')
        console.log('registered user: ' + response.data)
        console.log('email: ' + form.email)
        console.log('email: ' + form.password)

        if (response.data) {
          const responseLogin = await axios.post(
            BASE_URL + '/test/auth/login',
            {
              email: form.email,
              password: form.password,
            }
          )

          if (responseLogin.data.access_token) {
            console.log('====================================')
            console.log('success login: ' + responseLogin.data.access_token)
            login(response.data.access_token, response.data)
            setNotification({
              message: 'Зарегистрировано',
              visible: true,
              icon: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z',
              iconColor: '#5EB147',
            })
            setTimeout(() => {
              router.replace('/(tabs)/Home')
              setIsLoading(false) // Завершаем загрузку после успешного перехода
            }, 800)
            return // Завершение функции здесь, чтобы не сбрасывать `isLoading` ниже
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error response:", error.response?.data);
          if (error.response && error.response.status === 401) {
            setMessage('Invalid credentials. Please try again.')
          } else {
            setMessage('An error occurred. Please try again later.')
          }
        } else {
          setMessage('An unexpected error occurred.')
        }
        setIsLoading(false) // Завершаем загрузку при ошибке
      }
    } else {
      setNotification({
        message: 'Повторите еще раз!',
        visible: true,
        icon: 'M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z',
        iconColor: '#f40303',
      })
      setOtp('')
      otpRef.current?.clear()
      setIsLoading(false) // Завершаем загрузку, если код неверный
    }
  }

  const submit = async () => {
    handleButtonPress()
    setIsLoading(true)

    const trimmedForm = {
      email: form.email.trim(),
      password: form.password.trim(),
      surname: form.surname.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      branch: form.branch.trim(),
    }

    if (
      !trimmedForm.email ||
      !trimmedForm.password ||
      !trimmedForm.surname ||
      !trimmedForm.name ||
      !trimmedForm.phone ||
      !trimmedForm.city ||
      !trimmedForm.branch ||
      !isChecked
    ) {
      setIsLoading(false)
      setMessage('*Заполните поля')
      setErrorFields((prev) => ({
        ...prev,
        phone: !trimmedForm.phone, // Если поле телефона пустое, показываем ошибку
      }))
      setIsLoading(false)
      return
    }

    if (isPhoneEmpty(form.phone)) {
      setMessage('*Номер телефона не заполнен полностью')
      setErrorFields((prev) => ({
        ...prev,
        phone: true,
      }))
      setIsLoading(false)
      return
    }

    if (trimmedForm.password.length < 6) {
      setIsLoading(false)
      setMessage('*Пароль должен содержать не менее 6 символов')
      return
    }
    const response = await axios.get(
      BASE_URL + '/users/checkEmail/' + trimmedForm.email
    )

    if (response.data === true) {
      setIsLoading(false)
      setMessage('*такая почта уже существует')
      setForm((prevForm) => ({
        ...prevForm,
        email: '',
      }))
      setIsLoading(false)
      return
    }

    setErrorFields((prev) => ({
      ...prev,
      phone: false,
    }))

    setMessage('')
    console.log('====================================')
    console.log('Submit is passed')
    console.log('====================================')

    setIsFormComplete(true)
    setIsTimerActive(true)
    setIsLoading(false)
  }

  const handleCityChange = (text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      city: text,
      branch: '',
    }))
    setCityKey((prevKey) => prevKey + 1)
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
        keyboardVerticalOffset={0}
      >
        {!isFormComplete ? (
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

            <Text style={styles.titleLogin}>Создание аккаунта</Text>
            <View style={styles.videoInstruction}>
              <ScrollView
                contentContainerStyle={styles.fullScroll}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.containerForm}>
                  <View style={{ width: '100%' }}>
                    {message && (
                      // <View style={{ width: 288 }}>
                      <Text style={styles.errorTitle}>{message}</Text>
                      // </View>
                    )}
                    <FormField
                      title="*Фамилия"
                      value={form.surname}
                      handleChangeText={(e) => setForm({ ...form, surname: e })}
                      otherStyles={
                        message && !form.surname
                          ? {
                              borderColor: '#f40303',
                              borderWidth: 1,
                            }
                          : null
                      }
                      keyboardType="default"
                      placeholder="Введите вашу фамилию"
                    />
                    <FormField
                      title="*Имя"
                      value={form.name}
                      handleChangeText={(e) => setForm({ ...form, name: e })}
                      otherStyles={
                        message && !form.name
                          ? {
                              borderColor: '#f40303',
                              borderWidth: 1,
                            }
                          : null
                      }
                      keyboardType="default"
                      placeholder="Введите ваше имя"
                    />
                    <FormField
                      title="*Номер телефона"
                      value={form.phone}
                      handleChangeText={(e) => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          phone: e,
                        }))
                        setErrorFields((prev) => ({
                          ...prev,
                          phone: false, // Сбрасываем ошибку при изменении
                        }))
                      }}
                      otherStyles={
                        errorFields.phone
                          ? { borderColor: '#f40303', borderWidth: 1 } // Красный бордер при ошибке
                          : null
                      }
                      keyboardType="phone-pad"
                      placeholder="+996(000)000-000"
                      mask="+996 (999) 99-99-99"
                    />

                    <FormField
                      title="*Город"
                      value={form.city}
                      handleChangeText={handleCityChange}
                      otherStyles={
                        message && !form.city
                          ? { borderColor: '#f40303', borderWidth: 1 }
                          : null
                      }
                      keyboardType="default"
                      placeholder="Выберите из списка ваш город"
                      cities={cityOptions}
                      isDropdown
                    />
                    {form.city && (
                      <FormField
                        key={cityKey}
                        title="*Филиал"
                        value={form.branch}
                        handleChangeText={(branch) =>
                          setForm((prev) => ({ ...prev, branch }))
                        }
                        otherStyles={
                          message && !form.branch
                            ? { borderColor: '#f40303', borderWidth: 1 }
                            : null
                        }
                        keyboardType="default"
                        placeholder={'Выберите из списка ваш филиал'}
                        cities={branchOptions[form.city] || []}
                        isDropdown
                      />
                    )}
                    <FormField
                      title="*Почта"
                      value={form.email}
                      handleChangeText={(e) => setForm({ ...form, email: e })}
                      otherStyles={
                        message && !form.email
                          ? {
                              borderColor: '#f40303',
                              borderWidth: 1,
                            }
                          : null
                      }
                      keyboardType="email-address"
                      placeholder="example@gmail.com"
                    />
                    <FormField
                      title="*Пароль"
                      value={form.password}
                      handleChangeText={(e) =>
                        setForm({ ...form, password: e })
                      }
                      otherStyles={
                        message && (!form.password || form.password.length < 6)
                          ? {
                              borderColor: '#f40303',
                              borderWidth: 1,
                            }
                          : null
                      }
                      placeholder="Введите ваш пароль"
                      keyboardType="default"
                    />

                    <View style={styles.boxCheckBox}>
                      <CustomCheckBox
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        hasError={message !== '' && !isChecked}
                      />
                      <Text style={styles.textCheckBox}>
                        Нажимая, вы соглашаетесь с{' '}
                        {/* <Link style={styles.linkCheckBox} href="/">
                          политикой конфиденциальности
                        </Link> */}
                        <Text style={styles.linkCheckBox}>
                          политикой конфиденциальности
                        </Text>
                      </Text>
                    </View>

                    <CustomBotton
                      title="Регистрация"
                      handlePress={submit}
                      isLoading={isLoading}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
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
            <Text style={styles.titleLogin}>Введите код</Text>
            <View style={styles.videoInstruction}>
              <ScrollView
                contentContainerStyle={styles.fullScroll}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.containerForm}>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.textTitle}>
                      Введите код пришедший на указанную почту{' '}
                      <Text style={styles.emailText}>{form.email}</Text>
                    </Text>
                    {message && (
                      <Text style={styles.errorTitle}>{message}</Text>
                    )}
                    <OtpInput
                      ref={otpRef}
                      onTextChange={setOtp}
                      numberOfDigits={4}
                      theme={{
                        containerStyle: styles.otpContainer,
                        pinCodeContainerStyle: styles.pinCodeContainer,
                      }}
                    />
                    {isTimerActive ? (
                      <Text style={styles.timer}>
                        {`${Math.floor(timeLeft / 60)}:${String(
                          timeLeft % 60
                        ).padStart(2, '0')}`}
                      </Text>
                    ) : (
                      <TouchableOpacity onPress={startNewTimer}>
                        <Text style={styles.resetText}>
                          Отправить новый код
                        </Text>
                      </TouchableOpacity>
                    )}
                    <CustomBotton
                      title="Регистрация"
                      handlePress={submitConfirm}
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
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default SignUp
