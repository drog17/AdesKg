import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollBox: {
        flex: 1,
        backgroundColor: '#fffffa',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 21,
    },
    Card: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 15,  
        paddingBottom: 20, 
        marginBottom: 10,
        gap: 20
    },
    taoBaoImg: {
        width: '100%',
        height: 150,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    taoBaoInKg: {
        fontFamily: '600',
        fontSize: 14,
        textAlign: 'center',
        color: '#232323',
    },
    TextBox: {
        flex: 1,
        paddingHorizontal: 15,
        gap: 10
    },
    desc: {
        fontFamily: '400',
        fontSize: 14,
        textAlign: 'center',
        color: '#232323',  
    },
    greenText: {
        marginTop: 20,
        fontFamily: '600',
        fontSize: 14,
        textAlign: 'center',
        color: '#5eb147',
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 24,
    },
    List: {
        flex: 1,
        paddingHorizontal: 15,
        gap: 5
    },
    pointBox: {
        paddingHorizontal: 17,
        flexDirection: 'row',
        textAlign: 'left'
    },
    point: {
        fontFamily: '900',
        textAlign: 'center',
        fontSize: 14,
        marginRight: 8
    },
    pointBoxDesc: {
        fontFamily: '400',
        fontSize: 14,
        color: '#232323',
    },
    spanText: {
        fontSize: 14,
        fontFamily: '500',
        color: '#232323',
        textAlign: 'center'
    },
    advantagesImg: {
        height: 188,
        width: '100%'
    },
    comment: {
        fontFamily: '400',
        fontSize: 12,
        textAlign: 'right',
        color: '#737373',
        width: '100%',
        paddingHorizontal: 15
    },
    videoCard: {
        width: '100%',
        backgroundColor: '#f1f1f1',
        paddingVertical: 20,
        gap: 15,
        borderRadius: 15,
    },

});
