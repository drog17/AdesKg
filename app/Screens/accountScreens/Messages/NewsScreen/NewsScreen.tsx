import { Background } from '@/components/Background';
import { WhiteBack } from '@/components/WhiteBack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState, type FC } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from './NewsScreenStyles';
import { GoBack } from '@/components/navigation/GoBackButton/GoBack';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

interface NewsScreenProps {}

const NewsScreen: FC<NewsScreenProps> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [newsItem, setNewsItem] = useState<{
    image: string;
    title: string;
    content: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = route.params as { id: string };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/news/${id}`);
        setNewsItem({
          image: `${BASE_URL}/${data.cover}`,
          title: data.title,
          content: data.content.split('\n'), 
        });
      } catch (error) {
        console.error('Ошибка при загрузке новости:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <Background>
        <WhiteBack>
          <ActivityIndicator size="large" color="#0000ff" />
        </WhiteBack>
      </Background>
    );
  }

  if (!newsItem) {
    return (
      <Background>
        <WhiteBack>
          <Text>Новость не найдена</Text>
        </WhiteBack>
      </Background>
    );
  }

    return (
        <Background>
            <GoBack title='Новости'/>
            <WhiteBack>
            <Image source={{ uri: newsItem.image }} style={styles.img}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.parent}>
                <Text style={styles.title}>{newsItem.title}</Text>
                {newsItem.content.map((item, index) => (
                    <Text key={index} style={styles.desc}>{item}</Text>
                ))}
                </View>
                </ScrollView>
            </WhiteBack>
        </Background>
    );

}

export default NewsScreen
