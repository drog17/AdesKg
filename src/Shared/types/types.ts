import { OtpInputRef } from 'react-native-otp-entry'
/**
 * Данные формы регистрации
 */
export interface SignUpFormData {
  email: string
  password: string
  surname: string
  name: string
  phone: string
  city: string
  branch: string
}

/**
 * Ошибки валидации
 */
export interface ErrorFields {
  phone: boolean
}

/**
 * Состояние уведомлений
 */
export interface NotificationState {
  message: string
  visible: boolean
  icon: string
  iconColor: string
}

/**
 * Хук useSignUpForm возвращает этот объект
 */
export interface UseSignUpForm {
  form: SignUpFormData
  setForm: React.Dispatch<React.SetStateAction<SignUpFormData>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
  isFormComplete: boolean
  setIsFormComplete: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  errorFields: ErrorFields
  handleSubmit: () => Promise<void>
  handleCityChange: (text: string) => void
  notification: NotificationState
  setNotification: React.Dispatch<React.SetStateAction<NotificationState>>
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  otpRef: React.MutableRefObject<OtpInputRef | null>
  isTimerActive: boolean
  timeLeft: number
  startNewTimer: () => void
  submitConfirm: () => Promise<void>
}

/**
 * Пропсы для формы регистрации
 */
export type SignUpFormProps = Pick<
  UseSignUpForm,
  'form' | 'setForm' | 'message' | 'isChecked' | 'setIsChecked' | 'errorFields' | 'isLoading' | 'handleSubmit' | 'handleCityChange'
>

/**
 * Пропсы для формы подтверждения кода
 */
export type OtpConfirmFormProps = Pick<
  UseSignUpForm,
  'form' | 'message' | 'otp' | 'setOtp' | 'otpRef' | 'isLoading' | 'submitConfirm' | 'isTimerActive' | 'timeLeft' | 'startNewTimer' | 'notification' | 'setNotification'
>
