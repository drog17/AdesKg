import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   card: {
      width: '100%',
      padding: 15,
      backgroundColor: '#f1f1f1',
      borderRadius: 15,
   },
   btn: {
      width: '100%',
   },
   default: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
   },
   questionBox: {
      gap: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexShrink: 1
   },
   question: {
      fontWeight: '400',
      fontSize: 14,
      color: '#232323',
      flexShrink: 1
   },
   answer: {
      fontSize: 12,
      fontWeight: '400',
      color: '#232323',
   }
})