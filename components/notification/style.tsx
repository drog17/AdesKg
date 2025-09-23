import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  notificationContainer: {
    // width: 121,
    height: 44,
    borderRadius: 10,
    flexDirection: 'row',
    columnGap: 5,
    justifyContent: 'space-around',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: -100,
    right: 10,
  },
  notificationText: {
    fontFamily: '400',
    fontSize: 12,
    color: '#232323',
  },
  container: {
    flex: 1,
  },
})
