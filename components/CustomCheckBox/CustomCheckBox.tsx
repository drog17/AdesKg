import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { styles } from "./style";
import { Svg, Path } from "react-native-svg";

interface CustomCheckBoxProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  hasError: boolean;
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({
  isChecked,
  setIsChecked,
  hasError,
}) => {
  const handlePress = (event: GestureResponderEvent): void => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container]}>
      <View>
        {isChecked ? (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              fill="#5EB147"
              stroke="#5EB147"
              strokeWidth="1.5"
            />
            <Path
              d="M8.5 12.5L10.5 14.5L15.5 9.5"
              stroke="#FFFFFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        ) : hasError ? ( // Показываем новый SVG при ошибке
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              fill="#FFFFFA"
              stroke="#F40303"
              strokeWidth="1.5"
            />
            <Path
              d="M8.5 12.5L10.5 14.5L15.5 9.5"
              stroke="#C8C8C8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        ) : (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              fill="#FFFFFA"
              stroke="#C8C8C8"
              strokeWidth="1.5"
            />
            <Path
              d="M8.5 12.5L10.5 14.5L15.5 9.5"
              stroke="#C8C8C8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
