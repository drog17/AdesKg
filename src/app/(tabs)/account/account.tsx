import React, { useState } from 'react';
import { ImageBackground, Linking, View, StyleSheet } from 'react-native';
import backgroundImage from '@assets/images/adesFon.jpg';
import { CustomButton } from '@/Shared/components/navigation/CustomButton';
import { DoubleCustomButton } from '@/Shared/components/navigation/BoubleCustomButton';
import { AccountButtonData } from '@/Data/AccountData/AccountButtonsData/AccountButtonData';
import { HelloUser } from '@/Shared/components/HelloUser';
import { Href, useRouter } from 'expo-router';
import { BottomModal } from '@/Shared/components/Modal/BottomModal';
import { CenterModal } from '@/Shared/components/Modal/CenterModal';
import { useAuth } from '@/Shared/context/AuthContext';
import WhatsappIcon from '@assets/images/WhatsApp.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account: React.FC = () => {
  const [isBottomModalVisible, setBottomModalVisible] = useState(false);
  const [isCenterModalVisible, setCenterModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const router = useRouter();
  const { userProfile } = useAuth();

  const showDeleteAccount = userProfile?.email === 'aitymkulovich@gmail.com';
  const hideFirstButton = userProfile?.email === 'aitymkulovich@gmail.com';

  const handlePress = (buttonName: string, route: string | null) => {
    if (route) {
      router.push(route as Href);
    } else {
      setModalTitle(buttonName);
      if (buttonName === 'Помощь') {
        setBottomModalVisible(true);
      } else {
        setCenterModalVisible(true);
      }
    }
  };

  const linkToDeleteAccount = () => {
    const url = `https://ades.kg/delete-account`;
    Linking.openURL(url).catch((e) => console.error('Open url error', e));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.firstSection}>
          <HelloUser
            firstName={userProfile?.name ?? ''}
            id={userProfile?.personal_code != null ? String(userProfile.personal_code) : undefined}
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
            {(() => {
              const pairs: React.ReactNode[] = [];
              const start = 5;
              for (let i = start; i < Math.min(AccountButtonData.length, start + 4); i += 2) {
                const btn1 = AccountButtonData[i];
                const btn2 = AccountButtonData[i + 1]; // может быть undefined
                if (!btn1) continue;

                pairs.push(
                  <DoubleCustomButton
                    key={`double-${btn1.id}-${btn2?.id ?? 'none'}`}
                    icon1={btn1.icon}
                    title1={btn1.title}
                    onPress1={() => handlePress(btn1.title, btn1.route ?? null)}
                    icon2={btn2?.icon}
                    title2={btn2?.title ?? ''}
                    onPress2={btn2 ? () => handlePress(btn2.title, btn2.route ?? null) : () => {}}
                  />
                );
              }
              return pairs;
            })()}
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
  );
};

export default Account;
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
});