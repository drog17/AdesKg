import { type FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './NewsStyles'
import { New } from '@/components/New'

interface NewsProps {
  image: ImageSourcePropType
  description: string
  showNew: boolean
  onPress: () => void
}

export const News: FC<NewsProps> = ({ image, description, showNew, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.newsContainer}>
          <Image source={image} style={styles.newsImg} />
          {showNew && <New />}
        </View>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}
