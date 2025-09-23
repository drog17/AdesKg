import { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Button, View } from "react-native";

const PROJECT_ID = "54e8b4b6-2480-4ec0-9523-ed7a4a1851d9";

async function registerForPushNotificationAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus === 'granted') {
            token = (await Notifications.getExpoPushTokenAsync({ projectId: PROJECT_ID })).data;
            console.log("Push token:", token);
        } else {
            Alert.alert('Ошибка при получении токена для уведомления!');
        }
    } else {
        Alert.alert('Нужно использовать реальное устройство');
    }
    return token;
}

async function sendPushNotificationToServer(token: string) {
    const message = {
        to: token,
        sound: 'default',
        title: 'Привет!',
        body: 'Это тестовое уведомление',
        // data: { customData: 'Дополнительные данные' },
    };

    try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const result = await response.json();
        console.log("Ответ сервера:", result);

        if (!response.ok) {
            Alert.alert("Ошибка при отправке уведомления!", result.errors[0].message);
        }
    } catch (error) {
        console.error('Ошибка при отправке уведомления:', error);
    }
}

export const PushNotification = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        registerForPushNotificationAsync().then((token) => {
            if (token) {
                setToken(token);
            }
        });

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log("Получено уведомление:", notification);
            Alert.alert("Получено уведомление", JSON.stringify(notification));
        });

        return () => subscription.remove();
    }, []);

    const sendPushNotification = async () => {
        if (!token) {
            Alert.alert('Не доступен токен для уведомления');
            return;
        }
        await sendPushNotificationToServer(token);
    };

    return (
        <View>
            <Button title="Отправить уведомление" onPress={sendPushNotification}/>
        </View>
    );
};
