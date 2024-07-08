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
    this.$modifier = document.querySelector('.modifier');
    this.$digits = document.querySelector('.digits');
    this.$opertions = document.querySelector('.operations');

    this.onClickDigit();
    this.onClickOperation();
    this.onClickModifier();
  }

  onClickOperation() {
    const onClickOperation = (event) => {
      const value = event.target.textContent;
      const { total, leftOperand, rightOperand, operation } = this.state;

      if (value === '=') {
        switch (operation) {
          case '+':
            this.setState({ ...this.state, total: leftOperand + rightOperand });
            return;
          case '-':
            this.setState({ ...this.state, total: leftOperand - rightOperand });
            return;
          case '/':
            this.setState({
              ...this.state,
              total: Math.floor(leftOperand / rightOperand),
            });
            return;
          case 'X':
            this.setState({ ...this.state, total: leftOperand * rightOperand });
            return;
        }
      }

      if (!operation) {
        this.setState({ ...this.state, operation: value, total: total + value });
      } else {
        alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      }
    };

    this.$opertions.addEventListener('click', onClickOperation);
  }

  onClickDigit() {
    const onClickDigit = (event) => {
      const value = event.target.textContent;
      const { leftOperand, rightOperand, operation, total } = this.state;

      if (!operation) {
        let accLeftOperand = leftOperand === '0' ? value : leftOperand + value;

        if (accLeftOperand.length > 3) {
          alert('숫자는 세 자리까지만 입력 가능합니다!');
        } else {
          this.setState({
            ...this.state,
            leftOperand: accLeftOperand,
            total: accLeftOperand,
          });
        }
      } else {
        let accRightOperand = rightOperand === null ? value : rightOperand + value;

        if (accRightOperand.length > 3) {
          alert('숫자는 세 자리까지만 입력 가능합니다!');
        } else {
          this.setState({
            ...this.state,
            rightOperand: accRightOperand,
            total: leftOperand + operation + accRightOperand,
          });
        }
      }
    };

    this.$digits.addEventListener('click', onClickDigit);
  }

  onClickModifier() {
    const onClickModifier = () => {
      this.setState(initialState);
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
