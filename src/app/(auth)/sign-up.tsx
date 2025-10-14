import React, { FC } from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import { styles } from '@/styles/authStyles/sign-up_styles/_style'
import SignUpForm from './sign-up/SignUpForm'
import OtpConfirmForm from './sign-up/OtpConfirmForm'
import { useSignUpForm } from '@/Shared/hooks/useSignUpForm'

const SignUp: FC = () => {
  const signUp = useSignUpForm()

  return (
    <ImageBackground
      source={require('@assets/images/Graident_16.png')}
      style={styles.fullBackground}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {!signUp.isFormComplete ? (
          <SignUpForm {...signUp} />
        ) : (
          <OtpConfirmForm {...signUp} />
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default SignUp
