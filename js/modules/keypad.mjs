class Keypad {
  #numericButtons;
  #operatorButtons;
  #evaluateButton;
  #isOperatorDetected;
  #isEvaluationHappened;
  #currentOutputValue;
  #expression;
  #screen;

  constructor(numericSelector, operatorSelector, evaluatorSelector, screen) {
    this.#initialize(
      numericSelector,
      operatorSelector,
      evaluatorSelector,
      screen
    );
  }

  #initialize(numericSelector, operatorSelector, evaluatorSelector, screen) {
    this.#screen = screen;
    this.#expression = '';
    this.#currentOutputValue = '';
    this.#isOperatorDetected = false;
    this.#numericButtons = document.querySelectorAll(numericSelector);
    this.#operatorButtons = document.querySelectorAll(operatorSelector);
    this.#evaluateButton = document.querySelector(evaluatorSelector);
    this.#addListeners();
  }

  #addListeners() {
    // Attach listeners to numeric buttons [0-9]
    this.#numericButtons.forEach((numericbutton) => {
      numericbutton.addEventListener('click', this.#handleNumbericButtons);
    });

    // Attach listeners to operator buttons [+, -, *, /]
    this.#operatorButtons.forEach((operatorButton) => {
      operatorButton.addEventListener('click', this.#handleOperatorButtons);
    });

    // Attach listener to evaluator button [=]
    this.#evaluateButton.addEventListener('click', this.#handleEvaluation);
  }

  #handleNumbericButtons = (event) => {
    const value = event.target.value;
    const currentValue = this.#currentOutputValue;
    let expression = this.#expression;

    // Ignore further entries if the length becomes
    // equal to 9
    if (
      currentValue != undefined &&
      currentValue.length === 9 &&
      !this.#isOperatorDetected
    )
      return;

    // If previous `click` event occured because of an operator
    // then clear the output screen & set it to incoming
    // value.
    if (this.#isOperatorDetected) {
      this.#currentOutputValue = '';
      this.#isOperatorDetected = false;
    }

    // The expression must be set to empty, if
    // a numeric button is press just after the evaluation.
    if (this.#isEvaluationHappened) {
      expression = '';
      this.#isEvaluationHappened = false;
    }

    const regex = /\./;
    if (value == '.') {
      if (!regex.test(this.#currentOutputValue)) {
        this.#currentOutputValue += value;
        expression += value;
      }
    } else {
      expression += value;
      this.#currentOutputValue += value;
    }

    this.#expression = expression;
    this.#screen.update(this.#currentOutputValue);
    console.log(expression);
  };

  #handleOperatorButtons = (event) => {
    let operatorsAtEndRegex = /(\+|\-|\/|\*)$/;
    let expression = this.#expression;

    // In case if the image on the button is clicked
    // we need to get the value from its parent.
    let value = this.#getValue(event);

    // If the expression is empty, either '+' or '-' can be added.
    if (expression === '') {
      if (value === '+' || value === '-') {
        expression += value;
      }
    }
    // Replace the operator if the expression only contains
    // either '+' or '-'.
    else if (
      expression.length === 1 &&
      /(\+|\-)/.test(expression) &&
      /(\+|\-)/.test(value)
    ) {
      let newExpression = expression.replace(/(\+|\-)/, value);
      expression = newExpression;
    }
    // Add the operator if the expression ends with a digit.
    else if (/\d$/.test(expression)) {
      expression += value;
    }
    // Replace the operator if the expression ends with an
    // operator with the new operator.
    else if (operatorsAtEndRegex.test(expression) && expression.length > 1) {
      let newExpression = expression.replace(operatorsAtEndRegex, value);
      expression = newExpression;
    }

    this.#update(expression, false, true);
  };

  #handleEvaluation = () => {
    // need different evaluation logic if the expression
    // is complex.
    // const regex = '/[+*/-]+/';
    // const splits = this.#expression.split(regex);
    // console.log(`Splits count: ${splits.length}`);

    // Otherwise, it's just a normal expression.
    let result = eval(this.#expression);
    this.#screen.update(result);
    this.#update(result, true, false, '');
  };

  #update = (
    expression,
    isEvaluateHappened,
    isOperatorDetected,
    currentOutputValue = undefined
  ) => {
    this.#expression = expression;
    this.#isEvaluationHappened = isEvaluateHappened;
    this.#isOperatorDetected = isOperatorDetected;

    if (currentOutputValue !== undefined)
      this.#currentOutputValue = currentOutputValue;
  };

  reset() {
    //
  }

  #getValue(event) {
    const target = event.target;
    let value = target.value;
    if (value == undefined && target.nodeName == 'IMG') {
      let parent = event.target.parentNode;
      value = parent.value;
    }

    return value;
  }
}

export default Keypad;
