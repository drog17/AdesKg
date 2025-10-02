import React, { FC } from 'react'
import { View, Text } from 'react-native'
import FormField from '@/Shared/components/formField/FormField'
import { CustomButton } from '@/Shared/components/CustomButton/CustomButton'
import CustomCheckBox from '@/Shared/components/CustomCheckBox/CustomCheckBox'
import { styles } from '@/styles/authStyles/sign-up_styles/_style'

interface Props {
    form: any
    setForm: (data: any) => void
    message: string
    isChecked: boolean
    setIsChecked: (val: boolean) => void
    isLoading: boolean
    onSubmit: () => void
}

const SignUpForm: FC<Props> = ({
    form,
    setForm,
    message,
    isChecked,
    setIsChecked,
    isLoading,
    onSubmit,
}) => {
    return (
        <View>
            {message ? <Text style={styles.errorTitle}>{message}</Text> : null}
            <FormField
                title="*Фамилия"
                value={form.surname}
                handleChangeText={(e) => setForm({ ...form, surname: e })}
                placeholder="Введите вашу фамилию"
            />
            {/* остальные поля */}
            <CustomCheckBox
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                hasError={message !== '' && !isChecked}
            />
            <CustomButton title="Регистрация" onPress={onSubmit} isLoading={isLoading} />
        </View>
    )
}

export default SignUpForm
