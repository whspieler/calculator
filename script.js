let firstNumber = null;
let currentOperator = null;
let displayValue = '0';
let waitingForSecondNumber = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Error: Division by zero");
        return null; // Indicate error
    }
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            alert("Error: Unknown operator");
            return null;
    }
}

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
}

function handleNumberClick(event) {
    const button = event.target;
    const number = button.textContent;

    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }

    updateDisplay(displayValue);
}

function handleOperatorClick(event) {
    if (waitingForSecondNumber) {
        // Perform the previous calculation before setting the new operator
        calculate();
    }

    currentOperator = event.target.textContent;
    firstNumber = parseFloat(displayValue);
    waitingForSecondNumber = true;
    displayValue = '0'; 
}

function calculate() {
    if (currentOperator === null || waitingForSecondNumber === false) return;

    const secondNumber = parseFloat(displayValue);
    const result = operate(currentOperator, firstNumber, secondNumber);

    if (result === null) {
        // Reset the calculator in case of an error
        displayValue = '0';
        firstNumber = null;
        currentOperator = null;
        waitingForSecondNumber = false;
    } else {
        displayValue = result.toString();
        updateDisplay(displayValue);
        firstNumber = result; // Update firstNumber with result for subsequent operations
    }

    currentOperator = null;
    waitingForSecondNumber = false;
}

function handleEqualsClick() {
    calculate();
}

function clearCalculator() {
    firstNumber = null;
    currentOperator = null;
    displayValue = '0';
    waitingForSecondNumber = false;
    updateDisplay(displayValue);
}

const numberButtons = document.querySelectorAll('.btn.number');
numberButtons.forEach(button => {
    button.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll('.btn.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', handleEqualsClick);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearCalculator);
