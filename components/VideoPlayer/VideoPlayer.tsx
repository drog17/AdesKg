import React, { useState } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { PlayButton } from '../PlayIcon'

export const VideoPlayer = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)

  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/shorts/7l3WXuZmQrk?enablejsapi=1',
      poster: require('@/assets/images/contactIcons/1TaoBao.jpg'),
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/nwKFK7S_NIs?enablejsapi=1',
      poster: require('@/assets/images/contactIcons/TaoBao.jpg'),
    },
    {
      id: 3,
      url: 'https://youtube.com/shorts/Lwt16jizc3k?si=z-oc27FBZazGG9zk',
      poster: require('@/assets/images/contactIcons/TaoBao.jpg'),
    },
  ]

  const handlePlay = (index: number) => {
    setActiveVideoIndex(index)
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.videoScrollBox}
    >
      <View style={styles.videoContainer}>
        {videos.map((video, index) => (
          <View key={video.id} style={styles.videoBox}>
            {activeVideoIndex === index ? (
              <WebView
                source={{
                  uri: `${video.url}`,
                }}
                style={styles.webView}
                javaScriptEnabled
                domStorageEnabled
                allowsInlineMediaPlayback
                allowsFullscreenVideo={true} // Не используем полноэкранный режим
                mediaPlaybackRequiresUserAction={true} // Автозапуск после нажатия
              />
            ) : (
              <TouchableOpacity
                onPress={() => handlePlay(index)}
                activeOpacity={1}
              >
                <Image
                  source={video.poster}
                  style={styles.videoPoster}
                  resizeMode="cover"
                />
                <PlayButton
                  isPlaying={false}
                  onPress={() => handlePlay(index)}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  videoScrollBox: {
    flex: 1,
  },
  videoContainer: {
    paddingHorizontal: 15,
    gap: 15,
    flexDirection: 'row',
    marginBottom: 20,
  },
  videoBox: {
    height: 340,
    borderRadius: 5,
    width: 157,
  },
  videoPoster: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  webView: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
})
