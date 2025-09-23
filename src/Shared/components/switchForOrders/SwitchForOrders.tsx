import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface SwitchForOrdersProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const SwitchForOrders: React.FC<SwitchForOrdersProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        {['На складе', 'В пути', 'В Кыргызстане'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  switch: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 19,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    fontSize: 16,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  activeTab: {
    paddingHorizontal: 20,
    backgroundColor: '#5EB147',
  },
  tabText: { fontFamily: '400', color: '#888' },
  activeTabText: {
    color: '#FFFFFF',
  },
})

export default SwitchForOrders
