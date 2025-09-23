import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { Background } from '@/components/Background'
import { useNavigation } from 'expo-router'
import { CustomButton } from '@/components/navigation/CustomButton'
import WhatsApp from "@/assets/images/WhatsApp.svg";
import { GoBack } from '@/components/navigation/GoBackButton/GoBack'


const Delivery = () => {
    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
       const openWhatsAppChat = (phoneNumber: string) => {
         const url = `https://wa.me/${phoneNumber}`;
         Linking.openURL(url).catch((err) =>
           console.error("Ошибка открытия WhatsApp:", err)
         );
       };
  return (
    <Background>
      <GoBack title="Связь"></GoBack>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.forGaps}>
            <View style={styles.condition}>
              <Image
                source={require('@/assets/images/contactIcons/deliver.jpg')}
                style={styles.deliver}
              />
              <Text style={styles.deliverCondition}>Условия доставки</Text>
              <Text style={styles.instruction}>
                1. Предоставьте персональный код,{'\n'} ваше ФИО, контактный
                номер и{'\n'} адрес для доставки
              </Text>
              <Text style={styles.instruction}>
                2. Отправьте квитанцию об оплате,{'\n'} включающую стоимость
                веса и{'\n'}
                доставки
              </Text>
            </View>
            <View style={styles.attention}>
              <Text style={styles.attentionHeader}>Внимание!</Text>
              <View style={styles.attentionBox}>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>
                    Оплата за доставку не подлежит возврату! Доставка не
                    подлежит отмене! Пожалуйста, заранее ознакомьтесь с нашими
                    условиями!
                  </Text>
                </View>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>
                    Доставка до дверей не осуществляется. Курьер поднимает заказ
                    до квартиры за дополнительную плату
                  </Text>
                </View>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>
                    Курьер ожидает не более 10 минут. Если в течение этого
                    времени ответа не поступает, оплата за доставку не{'\n'}
                    возвращается (причины вроде «ребенок спал», «я был в душе» и
                    прочее не принимаются)
                  </Text>
                </View>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>Время доставки заранее не согласовывается</Text>
                </View>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>Доставка осуществляется в порядке очереди</Text>
                </View>
              </View>
              <View style={styles.remark}>
                <Text style={styles.remarkText}>
                  Убедитесь, что в момент доставки кто-то будет находиться дома,
                  так как изменение адреса после оформления заказа невозможно.
                </Text>
              </View>
              <Image
                source={require('@/assets/images/contactIcons/boxes.jpg')}
                style={styles.boxesImage}
              />
              <View style={styles.bottomBoxes}>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>
                    Стоимость доставки в пределах города составляет 150 сом.
                    {'\n'}
                    При доставке за пределы города стоимость обсуждается с
                    курьером
                  </Text>
                </View>
                <View style={styles.attentionBoxes}>
                  <Text>•</Text>
                  <Text>
                    Доставка охватывает район между улицами Ауэзова и Кулиева,
                    Жибек Жолу и 12 микрорайоном, а также верхние районы города
                    от улицы Баха
                  </Text>
                </View>
              </View>
              <View style={styles.remark}>
                <Text style={styles.remarkText}>
                  Оформление доставки необходимо за один день до выполнения, в
                  период с 12:00 до 17:00. Заявка, оставленная сегодня, будет
                  обработана и доставлена на следующий день.
                </Text>
              </View>
            </View>
            <View style={styles.plea}>
              <Text style={styles.pleaText1}>
                Просьба внимательно{'\n'} ознакомиться с условиями{'\n'}
                доставки!
              </Text>
              <Text style={styles.pleaText2}>
                Если вы не ознакомились с ними,{'\n'} вернитесь к тексту выше и
                прочитайте{'\n'} все пункты
              </Text>
            </View>
            <CustomButton
              title="WhatsApp"
              icon={WhatsApp}
              onPress={() => openWhatsAppChat('996997905055')}
            ></CustomButton>
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

export default Delivery

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  forGaps: {
    flex: 1,
    rowGap: 10,
    paddingBottom: 35
  },
  condition: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  deliver: {
    width: "100%",
    marginBottom: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  deliverCondition: {
    fontFamily: '600',
    fontSize: 14,
    textAlign: "center",
  },
  instruction: {
    marginTop: 10,
    fontFamily: '500',
    fontSize: 14,
    textAlign: "center",
  },

  attention: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    width: "100%",
    paddingVertical: 20,
    paddingLeft: 17,
    paddingRight: 17,
  },
  attentionHeader: {
    fontFamily: '600',
    fontSize: 14,
    textAlign: "center",
    color: "#F40303",
  },
  attentionBox: {
    rowGap: 5,
  },
  attentionBoxes: {
    flexDirection: "row",
    columnGap: 10,
  },
  remark: {
    width: "100%",
    borderBottomColor: "#5EB147",
    borderTopColor: "#5EB147",
    borderWidth: 1,
    borderRightColor: "white",
    borderLeftColor: "white",
    paddingVertical: 5,
    marginTop: 15,
  },
  remarkText: {
    color: "#737373",
    fontFamily: '400',
    fontSize: 14,
    textAlign: "center",
  },
  boxesImage: {
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
  },
  bottomBoxes: {
    rowGap: 5,
  },
  plea: {
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    rowGap: 10,
    marginBottom: 25
  },
  pleaText1: {
    fontFamily: '600',
    fontSize: 14,
    textAlign: "center",
    color: "#F40303",
  },
  pleaText2: {
    fontFamily: '400',
    fontSize: 12,
    textAlign: 'center'
  }
});