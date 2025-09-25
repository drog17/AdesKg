import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    cardBox: {
        gap: 10,
        marginBottom: 25,
    },
    card: {
        width: '100%',
        backgroundColor: '#f1f1f1',
        borderRadius: 15,
    },
    line: {
        width: '100%',
        height: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#c8c8c8',
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    city: {
        fontFamily: '400',
        fontSize: 12,
        color: '#232323',
    },
    info: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 6,
    },
    adress: {
        fontFamily: '500',
        fontSize: 14,
        color: '#232323',
    },

    desc: {
        fontFamily: '400',
        fontSize: 12,
        color: '#737373',
    },
    linksBox: {
        gap: 15,
    },
    title: {
        fontFamily: '400',
        fontSize: 12,
        color: '#737373',
    },
    links: {
        flexDirection: 'row',
        gap: 15,
    }
});
