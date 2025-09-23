import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './MessagesStyles';
import { useEffect, useState } from 'react';
import { Background } from '@/components/Background';
import { WhiteBack } from '@/components/WhiteBack';
import { News } from '@/components/News';
import { Href, router } from 'expo-router';
import { GoBack } from '@/components/navigation/GoBackButton/GoBack'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

type NewsItem = {
  id: string;
  cover: string;
  title: string;
  content: string;
};

const Messages = () => {
    const navigation = useNavigation();
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [viewedNews, setViewedNews] = useState<string[]>([]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false, 
        });
    }, [navigation]);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/news/getAllNews`);
          const reversedData = data.reverse(); // Новые новости сверху
          setNewsList(reversedData);
          const storedViewedNews = await AsyncStorage.getItem('viewedNews')
          if (storedViewedNews) {
            setViewedNews(JSON.parse(storedViewedNews))
          }
        } catch (error) {
          console.error('Ошибка при получении новостей:', error);
        }
      };
      fetchNews();
    }, []); 

    useEffect(() => {
      const markAsViewed = async () => {
        const newNewsIds = newsList
          .filter((newsItem) => !viewedNews.includes(newsItem.id))
          .map((newsItem) => newsItem.id);

          if (newNewsIds.length > 0) {
            const updatedViewedNews = [...viewedNews, ...newNewsIds]
            setViewedNews(updatedViewedNews)
            await AsyncStorage.setItem('viewedNews', JSON.stringify(updatedViewedNews));
          }
      };
  
      if (newsList.length > 0) {
        markAsViewed();
      }
    }, [newsList]);

    const handlePress = (newsItem: NewsItem) => {
      router.push({
            pathname: '/Screens/accountScreens/Messages/NewsScreen/NewsScreen',
            params: {
              id: newsItem.id,
            },
        } as Href<string | object>);
    }
    return (
      <Background>
        <GoBack title="Аккакунт" />
        <WhiteBack>
          <View style={styles.parent}>
            {newsList.map((newsItem) => (
              <News
                key={newsItem.id}
                image={{ uri: `${BASE_URL}/${newsItem.cover}`}}
                description={newsItem.title} 
                showNew={!viewedNews.includes(newsItem.id)}
                onPress={() => handlePress(newsItem)}
              />
            ))}
          </View>
        </WhiteBack>
      </Background>
    )
}

export default Messages;
