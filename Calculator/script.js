//Query the DOM to select calculator elements and create a new Calculator object
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-allclear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



// Calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {  /* // These parameters represent the DOM elements where the previous and current operands will be displayed.*/
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // clear method will reset the calculator data to its initial state
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // delete method , removes the last digit from the current operand.
    //it converst the current operand to string and then slice off the last character
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        // in js slice(start , end)=> this will return the arrays stt=arting from start till end-1,
        //and - 1 refers to the last element and - 2 refers to second last and so one, so here we wil get extracted string
    }

    //
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //
    chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

    //
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    // This method sets the inner text of cuurent operand.
    //also for previous operand it checks if there is a operation or not if there is then it display the prev operand along with the operation symbol
    //otherwise it sets the prev operand to null/undefined to avoid showing the prev even when there is o operation.
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// creating an object of calculator class to make the calci functional
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

// taking input numbers:  this method will work whenever any number is clicked then
//it will register that number on diplay and if there is already anumber
//then it will append to it.

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

// taking input operations:  this method will work whenever any operation is clicked.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

// delete button:
deleteButton.addEventListener('click', ()=> {
    calculator.delete();
    calculator.updateDisplay();
});

// allclear button:
allclearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// equals button
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
});




