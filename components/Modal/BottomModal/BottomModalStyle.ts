import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    popover: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      backgroundColor: "white",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingBottom: 20,
      alignItems: "center",
      justifyContent: "flex-start",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      height: 200,
    },
    modalTitle: {
      fontSize: 12,
      fontFamily: "400",
    },
    line: {
      width: '100%',
      marginBottom: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderColor: '#F1F1F1',
      paddingVertical: 10,
    },
    btnContainer: {
      paddingHorizontal: 16,
      gap: 10
    },
    nav: {
      width: 35,
      height: 5,
      backgroundColor: 'white',
      borderRadius: 100,
      position: 'absolute',
      top: -15,
    }
  });