import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { styles } from '@/styles/authStyles/sign-up_styles/_style'
import FormField from '@/Shared/components/formField/FormField'
import CustomCheckBox from '@/Shared/components/CustomCheckBox/CustomCheckBox'
import { CustomButton } from '@/Shared/components/CustomButton/CustomButton'
import BackButton from './Backbutton'
import { SignUpFormProps } from '@/Shared/types/types'

const SignUpForm: React.FC<SignUpFormProps> = ({
  form,
  setForm,
  message,
  isChecked,
  setIsChecked,
  errorFields,
  isLoading,
  handleSubmit,
  handleCityChange,
}) => {
  const cityOptions = [
    { value: 'Бишкек', label: 'Бишкек' },
    { value: 'Ош', label: 'Ош' },
  ]

  const branchOptions: { [key: string]: { value: string; label: string }[] } = {
    Бишкек: [{ value: 'Анкара 10B', label: 'Анкара 10B' }],
    Ош: [{ value: 'Алиева 219', label: 'Алиева 219' }],
  }

  return (
    <View style={styles.loginBox}>
      <BackButton />
      <Text style={styles.titleLogin}>Создание аккаунта</Text>
      <ScrollView contentContainerStyle={styles.fullScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.containerForm}>
          {message && <Text style={styles.errorTitle}>{message}</Text>}

          <FormField
            title="*Фамилия"
            value={form.surname}
            handleChangeText={(e) => setForm({ ...form, surname: e })}
            placeholder="Введите вашу фамилию"
          />
          <FormField
            title="*Имя"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            placeholder="Введите ваше имя"
          />
          <FormField
            title="*Номер телефона"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            keyboardType="phone-pad"
            placeholder="+996(000)000-000"
            mask="+996 (999) 99-99-99"
            otherStyles={errorFields.phone ? { borderColor: '#f40303', borderWidth: 1 } : null}
          />
          <FormField
            title="*Город"
            value={form.city}
            handleChangeText={handleCityChange}
            placeholder="Выберите город"
            cities={cityOptions}
            isDropdown
          />
          {form.city && (
            <FormField
              title="*Филиал"
              value={form.branch}
              handleChangeText={(branch) => setForm({ ...form, branch })}
              placeholder="Выберите филиал"
              cities={branchOptions[form.city] || []}
              isDropdown
            />
          )}
          <FormField
            title="*Почта"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder="example@gmail.com"
          />
          <FormField
            title="*Пароль"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="Введите пароль"
          />

          <View style={styles.boxCheckBox}>
            <CustomCheckBox isChecked={isChecked} setIsChecked={setIsChecked}   hasError={!isChecked && !!message} />
            <Text style={styles.textCheckBox}>
              Нажимая, вы соглашаетесь с <Text style={styles.linkCheckBox}>политикой конфиденциальности</Text>
            </Text>
          </View>

          <CustomButton title="Регистрация" onPress={handleSubmit} isLoading={isLoading} />
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUpForm
