import { StyleSheet, Text, TouchableOpacity, View, Linking, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import { Background } from '@/src/Shared/components/Background';
import { CustomButton } from '@/src/Shared/components/navigation/CustomButton';
import WhatsApp from "@/assets/images/WhatsApp.svg";
import { GoBack } from '@/src/Shared/components/navigation/GoBackButton/GoBack';
const LargePackage = () => {
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
      <GoBack title="Связь" />
      <View style={styles.container}>
        <View style={styles.infoBanner}>
          <Image source={require("@/assets/images/contactIcons/LargePackage.jpg")} style={styles.package}/>
          <View style={styles.sendBox}>
            <Text style={styles.header}>
              Чтобы рассчитать стоимость доставки вашего товара - нам нужно знать
              точные параметры вашего груза
            </Text>
            <Text style={styles.send}>отправьте нам : </Text>
            <View style={styles.product}>
              <View style={styles.productImage}>
                <Text>•</Text> 
                <Text style={styles.productText}>фото товара</Text>
              </View>
              <View style={styles.productImage}>
                <Text>•</Text>
                <Text style={styles.productText}>
                  точные габариты после упаковки
                </Text>
              </View>
              <View style={styles.productImage}>
                <Text>•</Text>
                <Text style={styles.productText}>
                  точный вес товара{" "}
                  <Text style={styles.productDate}>
                    ( данные должен выслать ваш поставщик )
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={styles.price}>
              И мы с удовольствием рассчитаем и предложим для вас самые выгодные
              цены!
            </Text>
          </View>
        </View>
        <CustomButton
          title="WhatsApp"
          icon={WhatsApp}
          onPress={() => openWhatsAppChat("996500073733")}
        ></CustomButton>
      </View>
    </Background>
  );
}

export default LargePackage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  infoBanner: {
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    width: '100%',
    marginBottom: 25,

    alignItems: 'center',
  },
  sendBox: {
    paddingVertical: 20,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    textAlign: 'center',
    fontFamily: '400',
    fontSize: 14,
  },
  send: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontFamily: '400',
  },
  productImage: {
    flexDirection: 'row',
    columnGap: 10,
  },
  productText: {
    fontFamily: '400',
    fontSize: 14,
  },
  productDate: {
    color: '#737373',
  },
  product: {
    flexDirection: 'column',
    rowGap: 5,
    marginTop: 10,
  },
  price: {
    textAlign: 'center',
    marginTop: 15,
    fontFamily: '400',
    fontSize: 14,
  },
  package: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%"
  },
})
