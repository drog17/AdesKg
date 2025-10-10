import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export interface WarehouseInfo {
  recipient: string;
  phone: string;
  address: string;
}

export interface NavItem {
  icon: string;
  label: string;
  onPress?: () => void;
}

const WarehouseScreen: React.FC = () => {
  const warehouseInfo = {
    recipient: "ваш код",
    phone: "+8615147091119",
    address: "广东省广州市白云区江高镇南岗三元南路62号安托仓储1119 - ваш код 库房"
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Скопировано', 'Текст скопирован в буфер обмена');
  };

  const openPhone = () => {
    Linking.openURL(`tel:${warehouseInfo.phone}`);
  };

  const openTaobao = () => {
    Linking.openURL('https://taobao.com');
  };

  const openTaobaoCC = () => {
    Linking.openURL('https://taobao.cc');
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>Адрес склада</Text>
        </View>

        {/* Информация о складе */}
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>1. 收件人：</Text>
            <TouchableOpacity 
              style={styles.copyableField}
              onPress={() => copyToClipboard(warehouseInfo.recipient)}
            >
              <Text style={styles.infoValue}>{warehouseInfo.recipient}</Text>
              <Ionicons name="copy-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>2. 备注：</Text>
            <TouchableOpacity 
              style={styles.copyableField}
              onPress={() => copyToClipboard(warehouseInfo.phone)}
            >
              <Text style={styles.infoValue}>{warehouseInfo.phone}</Text>
              <Ionicons name="copy-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>3. 地址：</Text>
            <TouchableOpacity 
              style={styles.copyableField}
              onPress={() => copyToClipboard(warehouseInfo.address)}
            >
              <Text style={styles.infoValue}>{warehouseInfo.address}</Text>
              <Ionicons name="copy-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Видеоинструкции */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Видеоинструкции по заполнению</Text>
          <TouchableOpacity style={styles.videoButton}>
            <Ionicons name="play-circle" size={24} color="#FF3B30" />
            <Text style={styles.videoButtonText}>Смотреть инструкцию</Text>
          </TouchableOpacity>
        </View>

        {/* Taobao ссылки */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.taobaoCard} onPress={openTaobao}>
            <View style={styles.taobaoHeader}>
              <Ionicons name="logo-tux" size={24} color="#FF4400" />
              <Text style={styles.taobaoTitle}>淘宝网 Taobao.com</Text>
            </View>
            <Text style={styles.taobaoSubtitle}>теперь в Кыргызстане!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.taobaoCard} onPress={openTaobaoCC}>
            <View style={styles.taobaoHeader}>
              <Ionicons name="cart-outline" size={24} color="#007AFF" />
              <Text style={styles.taobaoTitle}>淘虾 Taobao.cc</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Важное предупреждение */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <Ionicons name="warning" size={20} color="#FF9500" />
            <Text style={styles.warningTitle}>Важно!</Text>
          </View>
          <Text style={styles.warningText}>
            После заполнения отправьте нашему менеджеру для проверки корректности заполненного адреса. 
            В случае неверного заполнения компания не несет ответственности за груз.
          </Text>
        </View>

        {/* Дублирование информации (как в оригинале) */}
        <View style={styles.duplicateSection}>
          {/* <Text style={styles.duplicateTitle}>Адрес склада</Text>
          
          <View style={styles.duplicateInfo}>
            <Text style={styles.duplicateText}>1. 收件人：{warehouseInfo.recipient}</Text>
            <Text style={styles.duplicateText}>2. 备注：{warehouseInfo.phone}</Text>
            <Text style={styles.duplicateText}>3. {warehouseInfo.address}</Text>
          </View> */}

          <Text style={styles.sectionTitle}>Видеоинструкции по заполнению</Text>
          
          <TouchableOpacity style={styles.taobaoCard} onPress={openTaobao}>
            <View style={styles.taobaoHeader}>
              <Ionicons name="logo-tux" size={20} color="#FF4400" />
              <Text style={styles.taobaoTitle}>淘宝网 Taobao.com</Text>
            </View>
            <Text style={styles.taobaoSubtitle}>теперь в Кыргызстане!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Нижняя навигация */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9ff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#8e8e93',
    minWidth: 80,
    marginRight: 8,
  },
  copyableField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#1c1c1e',
    flex: 1,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoButtonText: {
    fontSize: 16,
    color: '#1c1c1e',
    marginLeft: 12,
  },
  taobaoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taobaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taobaoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginLeft: 12,
  },
  taobaoSubtitle: {
    fontSize: 14,
    color: '#8e8e93',
    marginLeft: 36,
  },
  warningCard: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    textAlign:'center'
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0b0bff',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  duplicateSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  duplicateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 12,
    textAlign: 'center',
  },
  duplicateInfo: {
    marginBottom: 16,
  },
  duplicateText: {
    fontSize: 14,
    color: '#1c1c1e',
    marginBottom: 6,
    lineHeight: 18,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
});

export default WarehouseScreen;