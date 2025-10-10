import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { styles } from '@/styles/authStyles/sign-up_styles/_style'
import { CustomButton } from '@/Shared/components/CustomButton/CustomButton'
import Notification from '@/Shared/components/notification/Notification'
import { OtpInput } from 'react-native-otp-entry'
import BackButton from './Backbutton'
import { OtpConfirmFormProps } from '@/Shared/types/types'

const OtpConfirmForm: React.FC<OtpConfirmFormProps> = ({
  form,
  message,
  otp,
  setOtp,
  otpRef,
  isLoading,
  submitConfirm,
  isTimerActive,
  timeLeft,
  startNewTimer,
  notification,
  setNotification,
}) => {
  return (
    <View style={styles.loginBox}>
      <BackButton />
      <Text style={styles.titleLogin}>Введите код</Text>
      <ScrollView contentContainerStyle={styles.fullScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.containerForm}>
          <Text style={styles.textTitle}>
            Введите код, пришедший на почту <Text style={styles.emailText}>{form.email}</Text>
          </Text>

          {message && <Text style={styles.errorTitle}>{message}</Text>}

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
              {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
            </Text>
          ) : (
            <TouchableOpacity onPress={startNewTimer}>
              <Text style={styles.resetText}>Отправить новый код</Text>
            </TouchableOpacity>
          )}

          <CustomButton title="Регистрация" onPress={submitConfirm} isLoading={isLoading} />

          <Notification
            message={notification.message}
            visible={notification.visible}
            onClose={() => setNotification({ ...notification, visible: false })}
            icon={notification.icon}
            iconColor={notification.iconColor}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default OtpConfirmForm
