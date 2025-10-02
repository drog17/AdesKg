import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import {CustomButton} from '@/Shared/components/CustomButton/CustomButton'

interface Props {
  otp: string
  setOtp: (val: string) => void
  timeLeft: number
  isTimerActive: boolean
  startNewTimer: () => void
  onConfirm: () => void
  isLoading: boolean
}

const ConfirmCode: FC<Props> = ({
  otp,
  setOtp,
  timeLeft,
  isTimerActive,
  startNewTimer,
  onConfirm,
  isLoading,
}) => {
  return (
    <View>
      <Text>Введите код</Text>
      <OtpInput numberOfDigits={4} onTextChange={setOtp} />
      {isTimerActive ? (
        <Text>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</Text>
      ) : (
        <TouchableOpacity onPress={startNewTimer}>
          <Text>Отправить новый код</Text>
        </TouchableOpacity>
      )}
      <CustomButton title="Подтвердить" onPress={onConfirm} isLoading={isLoading} />
    </View>
  )
}

export default ConfirmCode
