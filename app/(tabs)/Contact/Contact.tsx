import { Text, View, SafeAreaView, Linking } from "react-native";
import React, { FC, useState } from "react";
import { router, Href } from "expo-router";
import { CustomButton } from "@/components/navigation/CustomButton";
import ChatIcon from "@/assets/images/contactIcons/Icon - Chat.svg";
import DeliveryIcon from "@/assets/images/contactIcons/Icon - Delivery.svg";
import MoneyIcon from "@/assets/images/contactIcons/Icon - Money.svg";
import PackageIcon from "@/assets/images/contactIcons/Icon - Package.svg";
import { BottomModal } from "@/components/Modal/BottomModal";
import { Background } from "@/components/Background";
import { HelloUser } from "@/components/HelloUser";
import { useAuth } from "@/app/context/AuthContext";
import { StyleSheet } from 'react-native'


const Contact: FC = () => {
  const { userProfile } = useAuth()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  

 const handlePress = (buttonName: string, route: string | null) => {
   if (route) {
     router.push(route as Href<string | object>);
   } else {
     setSelectedButton(buttonName);
     setModalVisible(true);
   }
 };
 const openWhatsAppChat = (phoneNumber: string) => {
   const url = `https://wa.me/${phoneNumber}`;
   Linking.openURL(url).catch((err) =>
     console.error("Ошибка открытия WhatsApp:", err)
   );
 };
  return (
    <Background
    >
      <SafeAreaView style={styles.header}>
      <View style={styles.firstSection}>
          <HelloUser firstName={userProfile.name} id={userProfile.personal_code} />
        </View>
      <View style={styles.banner}>
        <CustomButton
          icon={ChatIcon}
          title="Связаться с менеджером"
          onPress={() => handlePress("Связаться с менеджером", null)}
        />
        <CustomButton
          icon={DeliveryIcon}
          title="Оформить доставку"
          onPress={() =>
            handlePress("Оформить доставку", "Screens/ContactScreens/Delivery")
          }
        />
        <CustomButton
          icon={MoneyIcon}
          title="Выкуп товара"
          onPress={() => openWhatsAppChat("996502905055")}
        />
        <CustomButton
          icon={PackageIcon}
          title="Крупногабарит"
          onPress={() =>
            handlePress("Крупногабарит", "Screens/ContactScreens/LargePackage")
          }
        />
      </View>
      {selectedButton === "Связаться с менеджером" && (
        <BottomModal
          headTitle="Связаться с менеджером"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </SafeAreaView>
    </Background>
  );
};

export default Contact;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: "#FFFFFA",
    fontSize: 18,
    fontFamily: "400",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 20,
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 25,
  },
  phoneText: {
    fontSize: 14,
    fontFamily: "400",
    alignItems: "center",
    color: "#FFFFFA",
  },
  iconImage: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  banner: {
    backgroundColor: "white",
    width: "100%",
    height: 491,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 10,
  },

}
);