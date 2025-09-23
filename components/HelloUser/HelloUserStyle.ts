import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    userBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fffffa',
        fontFamily: '400',
    },
    btnCopy: {
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 5,
        width: 131,
        height: 30,
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userId: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fffffa',
        fontFamily: '400',
    }
})