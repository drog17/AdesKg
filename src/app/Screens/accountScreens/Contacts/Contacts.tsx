import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Background } from '@/Shared/components/Background';
import { WhiteBack } from '@/Shared/components/WhiteBack';
import { styles } from './ContactsStyles';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import InstagramIcon from '@assets/images/Instagram.svg'
import TelegramIcon from '@assets/images/Telegram.svg'
import { GoBack } from '@/Shared/components/navigation/GoBackButton/GoBack'


const Contacts = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    const openIn2GIS = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <Background>
          <GoBack title='Аккакунт'/>
                <WhiteBack>
                    <View style={styles.parent}>
                        <View style={styles.cardBox}>
                            <TouchableOpacity onPress={() => openIn2GIS("https://2gis.kg/bishkek/geo/70000001087656619")}>
                            <View style={styles.card}>
                                <View style={styles.line}>
                                    <Text style={styles.city}>Филиал Бишкек</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.adress}>Анкара 10В, бутик 8-13</Text>
                                    <View>
                                        <Text style={styles.desc}>График работы: </Text>
                                        <Text style={styles.desc}>Вт-Вс с 12:00 до 19:00</Text>
                                        <Text style={styles.desc}>Пн- Выходной</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openIn2GIS("https://2gis.kg/bishkek/geo/70030076150280476")}>
                            <View style={styles.card}>
                                <View style={styles.line}>
                                    <Text style={styles.city}>Филиал Ош</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.adress}>Алиева 219</Text>
                                    <View>
                                        <Text style={styles.desc}>График работы: </Text>
                                        <Text style={styles.desc}>Вт-Вс с 12:00 до 19:00</Text>
                                        <Text style={styles.desc}>Пн- Выходной</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.linksBox}>
                            <Text style={styles.title}>Наши социальные сети</Text>
                            <View style={styles.links}>
                                <TouchableOpacity onPress={() => openLink("https://www.instagram.com/ades_express_cargo?igsh=MXRreDQ5dHBvemhqZA== ")}>
                                <InstagramIcon height={32} width={32}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openLink("https://t.me/+Yn4OkYESMvU5Mjky")}>
                                <TelegramIcon height={32} width={32}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </WhiteBack>
        </Background>
    );
}

export default Contacts;
