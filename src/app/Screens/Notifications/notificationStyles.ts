import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    groupContainer: {
      paddingHorizontal: 16,
      paddingTop: 5,
      backgroundColor: '#FFFFFA',
      borderRadius: 15,
      paddingBottom: 15,
      marginBottom: 5,
    },
    groupTitle: {
      fontSize: 12,
      fontFamily: '400',
      color: "#737373",
      marginBottom: 10,
    },
    itemsBox: {
        gap: 5,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: "#777",
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    img: {
        width: 222,
        height: 222,
        marginBottom: 10
    },
    desc: {
        fontFamily: '400',
        fontSize: 16,
        textAlign: 'center'
    }
  });
  