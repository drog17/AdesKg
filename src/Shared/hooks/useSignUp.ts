import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { OtpInputRef } from 'react-native-otp-entry'
import { SignUpFormData } from '../types/types'
import { useAuth } from '@/Shared/context/AuthContext'
import { router } from 'expo-router'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

export const useSignUp = () => {
  const { login } = useAuth()
  const [form, setForm] = useState<SignUpFormData>({
    email: '',
    password: '',
    surname: '',
    name: '',
    phone: '+996',
    city: '',
    branch: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const otpRef = useRef<OtpInputRef | null>(null)
  const [timeLeft, setTimeLeft] = useState(180)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // Таймер
  useEffect(() => {
    if (isTimerActive) {
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isTimerActive])

  const startNewTimer = () => {
    setTimeLeft(180)
    setIsTimerActive(true)
  }

  const handleSubmit = async () => {
    // логика проверки формы и отправки запроса
  }

  const handleConfirm = async () => {
    // логика проверки кода и логина
  }

  return {
    form,
    setForm,
    isLoading,
    isFormComplete,
    message,
    otp,
    setOtp,
    confirmCode,
    otpRef,
    timeLeft,
    isTimerActive,
    startNewTimer,
    handleSubmit,
    handleConfirm,
  }
}
