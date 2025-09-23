import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import CustomButton from '../Shared/components/CustomButton/CustomButton'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

const App = () => {
  const logoOpacity = useSharedValue(0)
  const logoPosition = useSharedValue(0)
  const buttonsOpacity = useSharedValue(0)

  useEffect(() => {
    const prepare = async () => {
        try {
            logoOpacity.value = withTiming(1, { duration: 1000 });
            logoPosition.value = withDelay(1000, withTiming(-100, { duration: 1000 }));
            buttonsOpacity.value = withDelay(2000, withTiming(1, { duration: 1000 }));
        } catch (e) {
            console.warn(e);
        } 
    };
    prepare();
}, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoPosition.value }],
  }))

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
  }))
  return (
    <ImageBackground
      source={require('../assets/images/Graident_16.png')}
      style={styles.fullBackground}
      resizeMode='cover'
    >
      <SafeAreaView style={styles.fullBackground}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </Animated.View>
            <Animated.View style={[styles.btns, buttonsAnimatedStyle]}>
              <CustomButton
                title="Войти"
                handlePress={() => router.push('/(auth)/sign-in/sign-in')}
              />
              <CustomButton
                title="Регистрация"
                handlePress={() => router.push('/(auth)/sign-up/sign-up')}
                buttonStyle={{
                  backgroundColor: '#fffffa',
                  borderWidth: 1,
                  bordeStyle: 'solid',
                  borderColor: '#5eb147',
                }}
                textStyles={{ color: '#232323' }}
              />
            </Animated.View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="transparent" style="light" />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default App

const styles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center', 
    resizeMode: 'contain', 
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
    flex: 1, 
  },
  container: {
    width: 288,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
  },
  btns: {
    width: '100%',
    rowGap: 20,
    marginBottom: 40,
  },
  btnRegistration: {
    borderWidth: 1,
    borderColor: '#90EE90',
    backgroundColor: '#fffffa',
  },
})
