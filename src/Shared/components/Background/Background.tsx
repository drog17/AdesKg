import React, { FC, ReactNode } from 'react'
import { ImageBackground } from 'react-native'
import BackFon from '@/assets/images/adesFon.jpg'
import { styles } from './BackgroundStyle'

interface BackgroundProps {
  children: ReactNode
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={BackFon}
      resizeMode="cover"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  )
}
