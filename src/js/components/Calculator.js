import { OPERATIONS, ERROR_MESSAGES } from '../constants.js';

const initialState = {
  total: '0',
  leftOperand: '0',
  rightOperand: null,
  operation: null,
};

class Calculator {
  constructor() {
    this.state = initialState;
    this.$total = document.getElementById('total');
    this.$calculate = document.getElementById('calculate');
    this.$opertions = document.querySelector('.operations');
    this.$modifier = document.querySelector('.modifier');
    this.$digits = document.querySelector('.digits');

    this.onClickDigit();
    this.onClickCalculateOperation();
    this.onClickOperation();
    this.onClickModifier();
  }

  onClickOperation() {
    const onClickOperation = selectedOperation => {
      const { total, operation } = this.state;

      const isAlreadySelectedOperation = !!operation;

      if (isAlreadySelectedOperation) {
        alert(ERROR_MESSAGES.promptEnterNumberFirst);
      } else {
        this.setState({
          ...this.state,
          operation: selectedOperation,
          total: total + selectedOperation,
        });
      }
    };

    this.$opertions.addEventListener('click', event => { 
      const selectedOperation = event.target.textContent;
      
      if(selectedOperation !== OPERATIONS.CALCULATE) {
        onClickOperation(selectedOperation);
      }
    });
  }

  onClickCalculateOperation() {
    const onClickCalculateOperation = () => {
      const { leftOperand, rightOperand, operation } = this.state;

      switch (operation) {
        case OPERATIONS.PLUS:
          this.setState({ ...this.state, total: leftOperand + rightOperand });
          return;
        case OPERATIONS.MINUS:
          this.setState({ ...this.state, total: leftOperand - rightOperand });
          return;
        case OPERATIONS.DIVIDE:
          this.setState({
            ...this.state,
            total: Math.floor(leftOperand / rightOperand),
          });
          return;
        case OPERATIONS.MULTIPLE:
          this.setState({ ...this.state, total: leftOperand * rightOperand });
          return;
      }
    };

    this.$calculate.addEventListener('click', event => {
      const selectedOperation = event.target.textContent;

      if(selectedOperation === OPERATIONS.CALCULATE) {
        onClickCalculateOperation();
      }
    });
  }

  onClickDigit() {
    const onClickDigit = event => {
      const selectedDigit = event.target.textContent;
      let { leftOperand, rightOperand } = this.state;
      const { operation } = this.state;

      const isAlreadySelectedOperation = !!operation;

      if(isAlreadySelectedOperation) {
        rightOperand = getUpdatedOperand(rightOperand, selectedDigit);
      } else {
        leftOperand = getUpdatedOperand(leftOperand, selectedDigit);
      }

      const total = isAlreadySelectedOperation ? leftOperand + operation + rightOperand : leftOperand;

      if(leftOperand?.length > 3 || rightOperand?.length > 3) {
        alert(ERROR_MESSAGES.numberLimitThree);
      } else {
        this.setState({
          ...this.state,
          leftOperand,
          rightOperand,
          total,
        });
      }
    };

    const getUpdatedOperand = (operand, selectedDigit) => {
      return operand === null || operand === '0' ? selectedDigit : operand + selectedDigit;
    };

    this.$digits.addEventListener('click', onClickDigit);
  }

  onClickModifier() {
    const onClickModifier = () => {
      if (this.state !== initialState) {
        this.setState(initialState);
      }
    };

    this.$modifier.addEventListener('click', onClickModifier);
  }

  setState(newState) {
    this.state = newState;

    this.render();
  }

  render() {
    this.$total.textContent = this.state.total;
  }
}

export default Calculator;
