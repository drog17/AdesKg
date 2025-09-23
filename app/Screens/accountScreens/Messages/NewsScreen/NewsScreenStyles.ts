import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 10,
    },
    parent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
        gap: 10,
    },
    title: {
        fontFamily: '500',
        fontSize: 14,
        color: ' #232323',
    },
    desc: {
        fontFamily: '400',
        fontSize: 12,
        color: ' #232323',
    }
})