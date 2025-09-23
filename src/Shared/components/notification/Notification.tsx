import React, { useRef, useEffect } from "react";
import {
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { styles } from "./style";

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  icon: string;
  iconColor: string;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  visible,
  onClose,
  icon,
  iconColor,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Начальная позиция вне экрана

  useEffect(() => {
    if (visible) {
      // Плавный выезд уведомления справа
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Плавный уход уведомления вправо
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return visible ? (
    <Animated.View
      style={[
        styles.notificationContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d={icon}
            fill={iconColor}
          />
        </Svg>
        <Text style={styles.notificationText}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};

export default Notification;
