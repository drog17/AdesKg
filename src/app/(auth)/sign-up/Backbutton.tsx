import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { styles } from '@/styles/authStyles/sign-up_styles/_style'
import { useNavigation } from '@react-navigation/native'

const BackButton = ({ link }: { link?: string }) => {
  const navigation = useNavigation()

  return link ? (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkBack}>
      <View style={styles.arrowBack}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4881 4.43057C15.8026..."
            fill="#C8C8C8"
          />
        </Svg>
        <Text style={styles.arrowBackTitle}>Назад</Text>
      </View>
    </TouchableOpacity>
  ) : null
}

export default BackButton
