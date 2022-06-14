class Calculator {

    constructor(prevOperandTxtElement, currOperandTxtElement) {
      this.prevOperandTxtElement = prevOperandTxtElement
      this.currOperandTxtElement = currOperandTxtElement
      this.clear()
    }
  
    clear() {

      this.currOperand = ''
      this.previOperand = ''
      this.operation = undefined
    }
  
    delete() {

      this.currOperand = this.currOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {

      if (number === '.' && this.currOperand.includes('.')) return
      this.currOperand = this.currOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {

      if (this.currOperand === '') return
      if (this.previOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previOperand = this.currOperand
      this.currOperand = ''
    }
  
    compute() {

      let computation

      const prev = parseFloat(this.previOperand)
      const current = parseFloat(this.currOperand)

      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }

      this.currOperand = computation
      this.operation = undefined
      this.previOperand = ''

    }
  
    getDisplayNumber(number) {

      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {

        integerDisplay = ''
      } else {

        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {

        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {

      this.currOperandTxtElement.innerText =
        this.getDisplayNumber(this.currOperand)
      if (this.operation != null) {
        this.prevOperandTxtElement.innerText =
          `${this.getDisplayNumber(this.previOperand)} ${this.operation}`
      } else {
        this.prevOperandTxtElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-num]')
  const operationButtons = document.querySelectorAll('[data-operation]')

  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-del]')

  const allClearButton = document.querySelector('[data-clear-all]')

  const prevOperandTxtElement = document.querySelector('[data-prev-oper]')
  const currOperandTxtElement = document.querySelector('[data-curr-oper]')
  
  const calculator = new Calculator(prevOperandTxtElement, currOperandTxtElement)
  
  numberButtons.forEach(button => {

    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {

    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  

  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  


  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })