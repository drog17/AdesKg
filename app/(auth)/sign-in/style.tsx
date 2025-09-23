import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  linkBack: {
    marginTop: 10,
    marginLeft: 8,
  },
  titleLogin: {
    textAlign: 'center',
    marginTop: 59,
    marginBottom: 55,
    fontFamily: '500',
    fontSize: 24,
    color: '#fffffa',
  },
  fullBackground: {
    flex: 1,
    paddingTop: 47,
  },
  containerForm: {
    alignItems: 'flex-end',
    width: '100%',
    height: 418,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  loginBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScroll: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  forgotPassword: {
    fontFamily: '400',
    fontSize: 12,
    textAlign: 'right',
    color: '#f40303',
    marginTop: 10,
    marginBottom: 25,
    alignSelf: 'flex-end',
  },
  arrowBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackTitle: {
    fontFamily: '400',
    fontSize: 12,
    color: '#c8c8c8',
  },
  errorTitle: {
    color: '#f40303',
    fontFamily: '400',
    fontSize: 12,
    textAlign: 'right',
  },
  videoInstruction: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 13,
  },
})
