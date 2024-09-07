import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    darkContainer: {
        backgroundColor: '#000000',
    },
    displayContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        width: '100%',
    },
    operationText: {
        fontSize: 24,
        color: '#333',
        marginBottom: 10,
        textAlign: 'right',
        width: '100%',
    },
    darkOperationText: {
        color: '#fff',
    },
    resultText: {
        fontSize: 36,
        color: '#333',
        textAlign: 'right',
        width: '100%',
    },
    darkResultText: {
        color: '#fff',
    },
    buttonContainer: {
        flex: 3,
        width: '80%',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        margin: 2,
        padding: 15,
    },
    darkButton: {
        backgroundColor: '#242424',
    },
    buttonText: {
        fontSize: 19.5,
        color: '#333',
    },
    darkButtonText: {
        color: '#fff',
    },
    operatorButton: {
        backgroundColor: '#dce0e6',
    },
    darkOperatorButton: {
        backgroundColor: '#242424',
    },
    operatorButtonText: {
        color: '#ff9500',
    },
    darkOperatorButtonText: {
        color: '#EE8011',
    },
    equalButton: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EE8011',
        elevation: 3,
        margin: 2,
        padding: 15,
    },
    darkEqualButton: {
        backgroundColor: '#EE8011',
    },
    equalButtonText: {
        fontSize: 32,
        color: '#fff',
    },
    darkEqualButtonText: {
        color: '#fff',
    },
    clearButton: {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        elevation: 3,
        padding: 10,
    },
    darkClearButton: {
        backgroundColor: '#555',
    },
    clearButtonText: {
        fontSize: 24,
        color: '#333',
    },
    darkClearButtonText: {
        color: '#fff',
    },
    historyButton: {
        marginTop: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        elevation: 3,
        padding: 10,
    },
    darkHistoryButton: {
        backgroundColor: '#555',
    },
    historyButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    darkHistoryButtonText: {
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    darkModalContent: {
        backgroundColor: '#555',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    darkModalTitle: {
        color: '#fff',
    },
    historyItem: {
        fontSize: 18,
        marginVertical: 5,
    },
    darkHistoryItem: {
        color: '#fff',
    },
    closeButton: {
        marginTop: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff9500',
        elevation: 3,
        padding: 10,
    },
    darkCloseButton: {
        backgroundColor: '#555',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    darkCloseButtonText: {
        color: '#fff',
    },
    darkModeButton: {
        position: 'absolute',
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#fff', // Màu nền chế độ sáng
        elevation: 3,
    },
});

export default styles;