import React, { useState } from 'react'
import { ImageBackground, Linking, SafeAreaView, View } from 'react-native'
import backgroundImage from '@/assets/images/adesFon.jpg'
import { CustomButton } from '@/components/navigation/CustomButton'
import { DoubleCustomButton } from '@/components/navigation/BoubleCustomButton'
import { AccountButtonData } from '@/Data/AccountData/AccountButtonsData/AccountButtonData'
import { HelloUser } from '@/components/HelloUser'
import { Href, useRouter } from 'expo-router'
import { BottomModal } from '@/components/Modal/BottomModal'
import { CenterModal } from '@/components/Modal/CenterModal'
import { useAuth } from '@/app/context/AuthContext'
import { StyleSheet } from 'react-native'
import WhatsappIcon from '@/assets/images/WhatsApp.svg'

const Account = () => {
  const [isBottomModalVisible, setBottomModalVisible] = useState(false)
  const [isCenterModalVisible, setCenterModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const router = useRouter()
  const { userProfile } = useAuth()
  const showDeleteAccount = userProfile?.email === 'aitymkulovich@gmail.com'
  const hideFirstButton = userProfile?.email === 'aitymkulovich@gmail.com'

  const handlePress = (buttonName: string, route: string | null) => {
    if (route) {
      router.push(route as Href<string | object>)
    } else {
      setModalTitle(buttonName)
      if (buttonName === 'Помощь') {
        setBottomModalVisible(true)
      } else {
        setCenterModalVisible(true)
      }
    }
  }

  const linkToDeleteAccount = () => {
    const url = `https://ades.kg/delete-account`
    Linking.openURL(url)
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.firstSection}>
          <HelloUser
            firstName={userProfile.name}
            id={userProfile.personal_code}
          />
        </View>
        <View style={styles.secondSection}>
          <View style={styles.btnBoxes}>
            {showDeleteAccount && (
              <CustomButton
                icon={WhatsappIcon}
                title="Удалить аккаунт"
                onPress={linkToDeleteAccount}
              />
            )}
            {AccountButtonData.slice(0, 5)
              .filter((button) => !(hideFirstButton && button.id === 1))
              .map((button) => (
                <CustomButton
                  key={button.id}
                  icon={button.icon}
                  title={button.title}
                  onPress={() => handlePress(button.title, button.route)}
                />
              ))}
          </View>
          <View style={styles.btnBoxes}>
            {AccountButtonData.slice(5, 9).map((button, index) =>
              index % 2 === 0 ? (
                <DoubleCustomButton
                  key={button.id}
                  icon1={button.icon}
                  title1={button.title}
                  onPress1={() => handlePress(button.title, button.route)}
                  icon2={AccountButtonData[index + 6]?.icon}
                  title2={AccountButtonData[index + 6]?.title}
                  onPress2={
                    AccountButtonData[index + 6]
                      ? () =>
                          handlePress(
                            AccountButtonData[index + 6].title,
                            AccountButtonData[index + 6].route
                          )
                      : () => {}
                  }
                />
              ) : null
            )}
          </View>
        </View>
      </SafeAreaView>
      <BottomModal
        visible={isBottomModalVisible}
        onClose={() => setBottomModalVisible(false)}
        headTitle={modalTitle}
      />
      <CenterModal
        visible={isCenterModalVisible}
        onClose={() => setCenterModalVisible(false)}
      />
    </ImageBackground>
  )
}

export default Account

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondSection: {
    height: 491,
    width: '100%',
    backgroundColor: '#fffffa',
    paddingHorizontal: 16,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    gap: 10,
  },
  btnBoxes: {
    gap: 10,
  },
})
