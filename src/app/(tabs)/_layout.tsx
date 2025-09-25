import ContactIcon from '@assets/images/tabsIcons/Contact.svg'
import HomeAdes from '@assets/images/tabsIcons/HomeAdes.svg'
import UserIcon from '@assets/images/tabsIcons/userIcon.svg'
import { Tabs } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

const TabsLayout = () => {
  interface TabIconProps {
    icon: React.FC<SvgProps>
    name: string
    focused: boolean
  }

  const TabIcon: React.FC<TabIconProps> = ({
    icon: IconComponent,
    name,
    focused,
  }) => {
    return (
      <View style={styles.iconMain}>
        <IconComponent
          width={24}
          height={24}
          color={focused ? '#5eb147' : 'silver'}
        />
        <Text
          numberOfLines={1}
          style={[styles.mainText, { color: focused ? '#5eb147' : 'silver' }]}
        >
          {name}
        </Text>
      </View>
    )
  }

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={HomeAdes} name="Главная" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Contact/Contact"
        options={{
          title: 'Contact',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ContactIcon} name="Связь" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={UserIcon} name="Аккаунт" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  iconMain: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70, // ограничим чтобы текст не прыгал
  },
  mainText: {
    fontFamily: 'sans-serif',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
  },
})
