import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/tabsStyles/styles';
import { VideoPlayer } from '@/Shared/components/VideoPlayer';
import { CustomButton } from '@/Shared/components/CustomButton/CustomButton';

const warehouseAddress = [
  "1. 收件人: ваш код",
  "2. 📱: +8615147091119",
  "3. 广东省广州市白云区江高镇南海元南路62号赛仕仓储119 - ваш код 库房"
];

const WarehouseScreen: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    const text = warehouseAddress.join('\n');
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [showVideo, setShowVideo] = useState(false);

  const handlePress = () => {
    setShowVideo(prev => !prev);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressTitle}>Адрес склада</Text>
          <TouchableOpacity onPress={copyAddress}>
            <Ionicons name="copy-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        {warehouseAddress.map((line, index) => (
          <Text key={index} style={styles.addressLine}>{line}</Text>
        ))}
        {copied && (
          <View style={styles.copiedBox}>
            <Ionicons name="checkmark-circle" size={18} color="green" />
            <Text style={styles.copiedText}>Скопировано</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Видеоинструкции по заполнению</Text>
      <VideoPlayer />
      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Важно!</Text>
        <Text style={styles.warningText}>
          После заполнения отправьте нашему менеджеру для проверки корректности заполненного адреса.
          В случае неверного заполнения компания не несет ответственности за груз.
        </Text>
      </View>
    </ScrollView>
  );
}
export default WarehouseScreen