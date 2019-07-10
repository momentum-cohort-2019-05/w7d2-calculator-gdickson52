const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    user: null,
  };
  
  function addDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function addDecimal(dot) {
      if (calculator.waitingForSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleUser(nextUser) {
    const { firstOperand, displayValue, user } = calculator
    const addValue = parseFloat(displayValue);
  
    if (user && calculator.waitingForSecondOperand)  {
      calculator.user = nextUser;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = addValue;
    } else if (user) {
      const currentValue = firstOperand || 0;
      const result = Calculation[user](currentValue, addValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.user = nextUser;
  }
  
  const Calculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.user = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelectorAll('.keys')[0];
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('user')) {
      handleUser(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      addDecimal(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
          updateDisplay();
      return;
    }
  
    addDigit(target.value);
    updateDisplay();
  });




