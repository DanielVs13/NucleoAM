import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 30,
        gap: 15,
        backgroundColor: '#f5f5f5', 
    },
    text: {
        fontSize: 28, 
        fontWeight: "bold",
        textAlign: "center",
        color: "#333", 
    },

    botton: {
        gap: 25
    },
    message: {
        backgroundColor: '#ff4d4d', 
        width: '120%',
        padding: 10,
        borderRadius: 10, 
    },
    textRedicte: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#6a5acd", 
    },
    homeheard: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 50, 
    },
    bienvenida: {
        fontSize: 22,
        flexDirection: 'row',
        gap: 15,
        alignItems: "center",
    },
    iconPefil: {
        alignItems: 'flex-end',
        flex: 1
    },
    modela2: {
        padding: 20,
        margin: 20,
        backgroundColor: '#ffffff', 
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5, 
        gap: 15,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    headListProduct: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 15,
        backgroundColor: '#ececec', 
        borderRadius: 10, 
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee', 
    },
    logout: {
        backgroundColor: '#d9534f', 
        alignSelf: 'flex-start',
        left: 10,
        marginTop: 20,
        paddingVertical: 8, 
        paddingHorizontal: 25, 
        borderRadius: 5, 
    },
    rootDetail: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        gap: 15,
        backgroundColor: '#f5f5f5', 
    },
});
