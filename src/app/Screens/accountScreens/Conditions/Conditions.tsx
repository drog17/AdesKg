import { Image, ScrollView, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ConditionsStyle';
import { useEffect } from 'react';
import { Background } from '@/Shared/components/Background';
import conditionImg from '@assets/images/conditionImg.jpg'
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack'
import { WhiteBack } from '@/Shared/components/WhiteBack';

const Conditions = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    return (
      <Background>
        <GoBack title="Аккакунт" />
        <ScrollView style={styles.scrollBox}>
          <WhiteBack>
            <View style={styles.parent}>
              <View style={styles.card}>
                <View style={styles.textBox}>
                  <Text style={styles.title}>Уважаемые клиенты!</Text>
                  <Text style={styles.desc}>
                    Обращаем ваше внимание, что наша компания оказывает услуги
                    по транспортировке грузов и не несет ответственности за их
                    сохранность. Мы настоятельно рекомендуем вам заранее
                    позаботиться о качественной упаковке вашего груза,
                    обеспечивающей его защиту от возможных повреждений в
                    процессе перевозки.
                  </Text>
                </View>
              </View>
              <View style={styles.card}>
                <Image source={conditionImg} style={styles.img} />
                <View style={styles.box}>
                  <Text style={styles.desc}>
                    Для обеспечения максимальной безопасности, упаковка должна
                    соответствовать следующим требованиям:
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                     <Text style={styles.number}>1</Text>. Надежно защищать груз
                    от механических повреждений
                  </Text>
                  <Text style={styles.listItem}>
                     <Text style={styles.number}>2</Text>. Быть
                    водонепроницаемой, если это необходимо для характера груза
                  </Text>
                  <Text style={styles.listItem}>
                     <Text style={styles.number}>3</Text>. Соответствовать
                    габаритам и особенностям перевозимого товара
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={styles.lineBox}>
                    <Text style={styles.lineText}>
                      Компания не несет ответственности за повреждения,
                      возникшие вследствие некачественной или неподходящей
                      упаковки. Пожалуйста, убедитесь, что ваша упаковка
                      соответствует всем требованиям для безопасной
                      транспортировки
                    </Text>
                    <Text style={styles.lineText}>
                      Если у вас возникли вопросы по поводу правильной упаковки,
                      наши специалисты готовы проконсультировать вас и помочь
                      выбрать подходящие решения
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.greyCard}>
                <Text style={styles.title}>Условия хранения</Text>
                <View style={styles.greyBox}>
                  <View style={styles.pointBox}>
                    <Text> • </Text>
                    <Text style={styles.pointText}>
                      Бесплатное хранение товара в течение{' '}
                      <Text style={styles.number}>15</Text> дней
                    </Text>
                  </View>
                  <View style={styles.pointBox}>
                    <Text> • </Text>
                    <Text style={styles.pointText}>
                      Начиная с 16-го дня, плата за хранение составляет{' '}
                      <Text style={styles.number}>20</Text> сом в день
                    </Text>
                  </View>
                  <View style={styles.pointBox}>
                    <Text> • </Text>
                    <Text style={styles.pointText}>
                      По истечении <Text style={styles.number}>1</Text> месяца
                      товар подлежит утилизации
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </WhiteBack>
        </ScrollView>
      </Background>
    )
}

export default Conditions;
