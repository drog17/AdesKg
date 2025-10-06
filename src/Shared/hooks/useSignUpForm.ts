import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { OtpInputRef } from 'react-native-otp-entry'
import { useAuth } from '@/Shared/context/AuthContext'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

export const useSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [cityKey, setCityKey] = useState(0)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [errorFields, setErrorFields] = useState({ phone: false })
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
  const [otp, setOtp] = useState('')
  const otpRef = useRef<OtpInputRef | null>(null)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [confirmCode, setConfirmCode] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    icon: '',
    iconColor: '',
  })

  const { login } = useAuth()

  // Проверка телефона
  const isPhoneEmpty = (phoneValue: string) => {
    const cleanedPhone = phoneValue.replace(/[^0-9]/g, '')
    return cleanedPhone.length <= 11
  }

  // Таймер
  useEffect(() => {
    if (isTimerActive) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            BASE_URL + '/users/createConfirmation/' + form.email,
            { headers: { 'Content-Type': 'application/json' } }
          )
          if (response.data.code) setConfirmCode(response.data.code)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData()

      const intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1
          clearInterval(intervalId)
          setIsTimerActive(false)
          return 0
        })
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [isTimerActive])

  const startNewTimer = () => {
    setTimeLeft(180)
    setIsTimerActive(true)
  }

  // Сабмит формы
  const handleSubmit = async () => {
    Keyboard.dismiss()
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
      setMessage('*Заполните поля')
      setErrorFields((prev) => ({
        ...prev,
        phone: !trimmedForm.phone,
      }))
      setIsLoading(false)
      return
    }

    if (isPhoneEmpty(form.phone)) {
      setMessage('*Номер телефона не заполнен полностью')
      setErrorFields((prev) => ({ ...prev, phone: true }))
      setIsLoading(false)
      return
    }

    if (trimmedForm.password.length < 6) {
      setMessage('*Пароль должен содержать не менее 6 символов')
      setIsLoading(false)
      return
    }

    const response = await axios.get(BASE_URL + '/users/checkEmail/' + trimmedForm.email)

    if (response.data === true) {
      setMessage('*такая почта уже существует')
      setForm((prevForm) => ({ ...prevForm, email: '' }))
      setIsLoading(false)
      return
    }

    setMessage('')
    setIsFormComplete(true)
    setIsTimerActive(true)
    setIsLoading(false)
  }

  // Сабмит кода
  const submitConfirm = async () => {
    Keyboard.dismiss()
    setIsLoading(true)

    if (!otp || otp.length < 4) {
      setMessage('Введите 4-значный код')
      setIsLoading(false)
      return
    }

    if (otp === confirmCode) {
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

        if (response.data) {
          const responseLogin = await axios.post(BASE_URL + '/test/auth/login', {
            email: form.email,
            password: form.password,
          })

          if (responseLogin.data.access_token) {
            login(response.data.access_token, response.data)
            setNotification({
              message: 'Зарегистрировано',
              visible: true,
              icon: 'M22 12C22...',
              iconColor: '#5EB147',
            })
            setTimeout(() => {
              router.replace('/(tabs)/Home')
              setIsLoading(false)
            }, 800)
            return
          }
        }
      } catch (error) {
        setMessage('Ошибка при регистрации')
        setIsLoading(false)
      }
    } else {
      setNotification({
        message: 'Повторите еще раз!',
        visible: true,
        icon: 'M12...',
        iconColor: '#f40303',
      })
      setOtp('')
      otpRef.current?.clear()
      setIsLoading(false)
    }
  }

  const handleCityChange = (text: string) => {
    setForm((prevForm) => ({ ...prevForm, city: text, branch: '' }))
    setCityKey((prevKey) => prevKey + 1)
  }

  return {
    form,
    setForm,
    message,
    setMessage,
    isChecked,
    setIsChecked,
    isFormComplete,
    setIsFormComplete,
    isLoading,
    setIsLoading,
    errorFields,
    handleSubmit,
    handleCityChange,
    notification,
    setNotification,
    otp,
    setOtp,
    otpRef,
    isTimerActive,
    timeLeft,
    startNewTimer,
    submitConfirm,
  }
}
