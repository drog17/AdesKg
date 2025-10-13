import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  addressContainer: {
    marginTop: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressLine: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  copiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  copiedText: {
    marginLeft: 6,
    color: 'green',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
    color: '#333',
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  videoBox: {
    height: 340,
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  videoImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  warningBox: {
    textAlign: 'center',
    height: 169,
    backgroundColor: '#fbf9f9ff',
    borderRadius: 10,
    padding: 12,
  },
  warningTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'red',
    marginBottom: 4,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});
