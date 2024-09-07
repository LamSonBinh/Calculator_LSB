import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, PanResponder } from 'react-native';
import { evaluate } from 'mathjs';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from './compoment/styles';

export default function App() {

    const [displayValue, setDisplayValue] = useState('0');
    const [history, setHistory] = useState([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [isResultSaved, setIsResultSaved] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const [darkModePosition, setDarkModePosition] = useState({ x: 20, y: 20 });
    
    const handleInput = (input) => {
        const operators = ['+', '-', '*', '/'];

        if (operators.includes(input)) {
            const lastChar = displayValue.slice(-1);
            
            if (operators.includes(lastChar)) {
                setDisplayValue(displayValue.slice(0, -1) + input);
            } else {
                setDisplayValue(displayValue + input);
            }
        } else {
            if (displayValue === '0' && !isNaN(input)) {
                setDisplayValue(input.toString());
            } else {
                setDisplayValue(displayValue + input);
            }
        }

        setIsResultSaved(false);
        setIsCleared(false);
    };

    const handleToggleSign = () => {
        const operators = ['+', '-', '*', '/'];

        let lastNumberIndex = displayValue.length;
        for (let i = displayValue.length - 1; i >= 0; i--) {
            if (operators.includes(displayValue[i])) {
                lastNumberIndex = i + 1;
                break;
            }
        }

        let lastNumber = displayValue.slice(lastNumberIndex);

        if (lastNumber) {
            if (lastNumber[0] === '-') {
                lastNumber = lastNumber.slice(1); 
            } else {
                lastNumber = '-' + lastNumber; 
            }

            setDisplayValue(displayValue.slice(0, lastNumberIndex) + lastNumber);
        }
    };

    const handleSpecialOperation = (operation) => {
        let updatedValue = displayValue.trim();
    
        if (updatedValue === '0') {
            updatedValue = '';
        }
        
        if (operation === '√x') {
            if (updatedValue === '') {
                setDisplayValue('√(');
            } else {
                setDisplayValue(updatedValue + '√(');
            }
        } else if (operation === 'lg' || operation === 'ln') {
            setDisplayValue(updatedValue + operation + '(');
        } else if (operation === 'e') {
            setDisplayValue(updatedValue + 'e');
        } else if (operation === 'π') {
            setDisplayValue(updatedValue + 'π');
        } else if (operation === 'x^y') {
            setDisplayValue(`${updatedValue}^`);
        } else if (operation === 'x!') {
            const lastChar = updatedValue.slice(-1);
    
            if (['+', '-', '*', '/', '^'].includes(lastChar)) {
                setDisplayValue(updatedValue.slice(0, -1) + '!');
            } else {
                const lastNumberMatch = updatedValue.match(/(\d+|\))$/);
                if (lastNumberMatch) {
                    const lastNumber = lastNumberMatch[0];
                    setDisplayValue(updatedValue.slice(0, -lastNumber.length) + `${lastNumber}!`);
                } else {
                    setDisplayValue(updatedValue + 'factorial(');
                }
            }
        } else if (operation === '1/x') {
            setDisplayValue(updatedValue + '1/(');
        }
    
        setIsResultSaved(false);
        setIsCleared(false);
    };

    const calculateResult = () => {
        try {
            let expression = displayValue;

            const sqrtRegex = /√\(([^)]+)\)/;
            const match = displayValue.match(sqrtRegex);

            if (match) {
                const valueInsideSqrt = parseFloat(match[1]);
                if (valueInsideSqrt < 0) {
                    return `Lỗi`;
                }
            }

            const logRegex = /(lg|ln)\(([^)]+)\)/g;
            const matchLog = [...displayValue.matchAll(logRegex)];

            for (let match of matchLog) {
                const valueInsideLog = parseFloat(match[2]);
                if (valueInsideLog <= 0) {
                    return `Lỗi`;
                }
            }

            expression = expression
                .replace(/lg/g, 'log10')      
                .replace(/ln/g, 'log')       
                .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
                .replace(/x!/g, 'factorial') 
                .replace(/π/g, Math.PI)       
                .replace(/(\d+),(\d+)/g, 'Math.pow($1, $2)'); 

            const result = evaluate(expression);

            if (result === Infinity || result === -Infinity) {
                return 'Không thể chia cho 0';
            }

            return result.toString();
        } catch (error) {
            return 'Lỗi';
        }
    };

    const handleEqual = () => {
        if (isCleared) {
            return;
        }
        const result = calculateResult();
        if (isResultSaved) {
            return;
        }
        setDisplayValue(result);
        setHistory([...history, `${displayValue} = ${result}`]);
        setIsResultSaved(true);
    };

    const handleClear = () => {
        setDisplayValue('0');
        setIsResultSaved(false);
        setIsCleared(true);
    };

    const handleDelete = () => {
        setDisplayValue(displayValue.slice(0, -1) || '0');
        setIsResultSaved(false);
        setIsCleared(false);
    };

    const toggleHistoryModal = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            setDarkModePosition({
                x: Math.max(0, Math.min(gestureState.moveX, 300)), 
                y: Math.max(0, Math.min(gestureState.moveY, 600)), 
            });
        },
        onPanResponderRelease: () => {
        },
    });

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <View
                    style={[styles.darkModeButton, { left: darkModePosition.x, top: darkModePosition.y }]}
                    {...panResponder.panHandlers}
                >
                    <TouchableOpacity onPress={toggleDarkMode}>
                        <Icon name={isDarkMode ? 'sun-o' : 'moon-o'} size={30} color={isDarkMode ? '#ff9500' : '#333'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.displayContainer}>
                <Text style={[styles.operationText, isDarkMode && styles.darkOperationText]}>
                    {displayValue}
                </Text>
                <Text style={[styles.resultText, isDarkMode && styles.darkResultText]}>
                    {calculateResult()}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('lg')}><Text style={[styles.buttonText, styles.operatorButtonText]}>lg</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('ln')}><Text style={[styles.buttonText, styles.operatorButtonText]}>ln</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('e')}><Text style={[styles.buttonText, styles.operatorButtonText]}>e</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('(')}><Text style={[styles.buttonText, styles.operatorButtonText]}>(</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput(')')}><Text style={[styles.buttonText, styles.operatorButtonText]}>)</Text></TouchableOpacity>

                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('^')}><Text style={[styles.buttonText, styles.operatorButtonText]}>x^y</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={handleClear}><Text style={[styles.buttonText, styles.operatorButtonText]}>C</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={handleDelete}><Text style={[styles.buttonText, styles.operatorButtonText]}>⌫</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('%')}><Text style={[styles.buttonText, styles.operatorButtonText]}>%</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('/')}><Text style={[styles.buttonText, styles.operatorButtonText]}>÷</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('√x')}><Text style={[styles.buttonText, styles.operatorButtonText]}>√x</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('7')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>7</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('8')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>8</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('9')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>9</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('*')}><Text style={[styles.buttonText, styles.operatorButtonText]}>×</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('x!')}><Text style={[styles.buttonText, styles.operatorButtonText]}>x!</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('4')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>4</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('5')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>5</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('6')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>6</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('-')}><Text style={[styles.buttonText, styles.operatorButtonText]}>−</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('1/x')}><Text style={[styles.buttonText, styles.operatorButtonText]}>1/x</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('1')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>1</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('2')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>2</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('3')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>3</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleInput('+')}><Text style={[styles.buttonText, styles.operatorButtonText]}>+</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={() => handleSpecialOperation('π')}><Text style={[styles.buttonText, styles.operatorButtonText]}>π</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.operatorButton, isDarkMode && styles.darkOperatorButton]} onPress={handleToggleSign}><Text style={[styles.buttonText, styles.operatorButtonText]}>+/-</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('0')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>0</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => handleInput('.')}><Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>.</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.equalButton, isDarkMode && styles.darkEqualButton]} onPress={handleEqual}><Text style={[styles.equalButtonText, isDarkMode && styles.darkEqualButtonText]}>=</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={toggleHistoryModal}>
                        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
                            <Icon name="history" size={20} color={isDarkMode ? '#fff' : '#333'} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={isHistoryVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize:24}}>Lịch sử</Text>
                        <FlatList
                            data={history}
                            renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={toggleHistoryModal}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}