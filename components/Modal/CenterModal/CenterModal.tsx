import {
    View,
    Text,
    Animated,
    TouchableOpacity,
  } from "react-native";
  import React, { FC, useState, useEffect } from "react";
  import { Portal } from "react-native-paper";
  import { styles } from "./CenterModalStyles";
import { Href, router } from "expo-router";
import { useAuth } from '@/app/context/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  interface CenteredModalProps {
    visible: boolean;
    onClose: () => void;
  }
  
  export const CenterModal: FC<CenteredModalProps> = ({
    visible,
    onClose,
  }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.8)); 
	const { logout } = useAuth()

  
    useEffect(() => {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }, [visible]);
  
    const showModal = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, 
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    };
  
    const hideModal = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0, 
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => onClose());
    };

    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('userAgreed')
        await logout()
        onClose()
        router.push('/')
      } catch(error) {
        console.error('ошибка при выходе из аккаунта', error);
      }
    }
  
    if (!visible) return null;
  
    return (
      <Portal>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <View style={styles.centeredContainer}>
            <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.message}>Вы уверены что хотите выйти с аккаунта?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                  <Text style={styles.Text}>Да, выйти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.Text}>Нет, отменить</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </Portal>
    );
  };
  