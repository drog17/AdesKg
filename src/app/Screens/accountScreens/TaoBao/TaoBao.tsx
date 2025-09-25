import { Text, View, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles } from './TaoBaoStyles'
import { useEffect } from 'react'
import { Background } from '@/Shared/components/Background'
import taoBaoImg from '@assets/images/taoBaoInKG.jpg'
import advantagesImg from '@assets/images/advantagesImg.jpg'
import { VideoPlayer } from '@/Shared/components/VideoPlayer'
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack'

const TaoBao = () => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])
  return (
    <Background>
          <GoBack title='Аккакунт'/>
        <ScrollView style={styles.scrollBox} showsVerticalScrollIndicator={false}>
          <View style={styles.Card}>
            <Image
              style={styles.taoBaoImg}
              source={taoBaoImg}
            />
            <View style={styles.TextBox}>
              <Text style={styles.desc}>
                <Text style={styles.taoBaoInKg}>Taobao в Кыргызстане</Text> — мы
                стали официальным партнером одного из гигантов онлайн-торговли!
              </Text>
              <Text style={styles.desc}>
                Теперь для вас появилась уникальная возможность заказывать
                посылки прямо в Кыргызстан. Больше никаких сложностей с
                логистикой
              </Text>
            </View>
          </View>
          <View style={styles.Card}>
            <View style={styles.List}>
              <Text style={styles.greenText}>Какие преимущества вас ждут?</Text>
              <View style={styles.pointBox}>
                <Text style={styles.point}>.</Text>
                <Text style={styles.pointBoxDesc}>
                  <Text style={styles.spanText}>Скидки на всё!</Text> Для наших
                  клиентов мы предоставляем специальный промокод, который
                  позволит получить скидки на Taobao при покупке товара
                </Text>
              </View>
              <View style={styles.pointBox}>
                <Text style={styles.point}>.</Text>
                <Text style={styles.pointBoxDesc}>
                  <Text style={styles.spanText}>Быстрая доставка</Text> без
                  дополнительных посредников"
                </Text>
              </View>
              <View style={styles.pointBox}>
                <Text style={styles.point}>.</Text>
                <Text style={styles.pointBoxDesc}>
                  <Text style={styles.spanText}>Цены в сомах.</Text>Больше
                  никаких юаней — Taobao сразу показывает цены в нашей валюте
                </Text>
              </View>
            </View>
            <Image 
              source={advantagesImg}
              style={styles.advantagesImg}
            />
          <View style={styles.TextBox}>
            <Text style={styles.desc}>Прямые поставки означают минимум задержек и максимум комфорта для вас</Text>
            <Text style={styles.desc}>Переходите на сайт и совершайте покупки прямо в свой город. С нами покупки становятся проще!</Text>
            <Text style={styles.desc}>Это только начало нашего пути! Мы будем радовать вас новыми возможностями</Text>
          </View>
          <Text style={styles.comment}>С уважением, Ades Cargo</Text>
          </View>
          <View style={styles.videoCard}>
            <View style={styles.List}>
                <Text style={styles.spanText}>TAOBAO- в Кыргызстане</Text>
                <Text style={styles.desc}>Теперь для вас появилась уникальная возможность- заказывать посылки сразу в Кыргызстан. Больше никаких сложностей с логистикой!</Text>
            </View>
            <View style={styles.List}>
                <View style={styles.pointBox}>
                <Text style={styles.point}>.</Text>
                <Text style={styles.desc}>Самовывоз с ПВЗ - 3$ за 1 кг</Text>
                </View>
                <View style={styles.pointBox}>
                    <Text style={styles.point}>.</Text>
                    <Text style={styles.desc}>Доставка до двери - 5$ за 1 кг</Text>               
                </View>
            </View>
            <VideoPlayer />
          </View>
        </ScrollView>
    </Background>
  )
}

export default TaoBao
