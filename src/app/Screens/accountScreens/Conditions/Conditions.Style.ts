import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollBox: {
        flex: 1,
        backgroundColor: '#fffffa',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    parent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 10,
    },
    card: {
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#c8c8c8'
    },
    textBox: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 5,
    },
    title: {
        fontSize: 14,
        fontFamily: '500',
        textAlign: 'center',
        color: '#232323',
    },
    desc: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: '400',
        color: '#232323'
    },
    img: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 20,
    },
    box: {
        paddingHorizontal: 10,
    },
    list: {
        width: '100%',
        marginTop: 10,
        gap: 5,
        marginBottom: 10,
        paddingHorizontal:20,
    }, 
    listItem: {
        fontSize: 14,
        fontFamily: '400',
        color: '#232323'
    },
    number: {
        fontSize: 14,
        fontFamily: '500',
        color: '#232323'
    },
    lineBox: {
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#5eb147',
        borderBottomColor: '#5eb147',
        gap: 10,
        paddingVertical: 5,
        marginBottom: 20
    },
    lineText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: '400',
        color: '#737373',    
    },
    greyCard: {
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 17,
        paddingVertical: 20,
        backgroundColor: '#f1f1f1',
        marginBottom: 20,
    },
    greyBox: {
        gap: 5,
        marginTop: 10,
    },
    pointBox: {
        flexDirection: 'row'
    },
    pointText: {
        fontFamily: '400',
        fontSize: 14,
        color: '#232323',
    }

});
