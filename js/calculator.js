// *** Global variables ***
const numericButtons = document.querySelectorAll(
  ".keypad-row .btn:not([class~='evaluate']):not([class~='operator'])"
);
const operators = document.querySelectorAll(".keypad-row .operator");
const evaluator = document.querySelector(".keypad-row .evaluate");
const outputScreen = document.querySelector("#output");

// Holds expression
let expression = "";

// Flags
let isOperatorDetected = false;
let isEvaluationHappened = false;
let expressResultInScientificNotation = false;

// Add listener to each numeric button including (.)
numericButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Ignore further entries if the length becomes
    // equal to 9.
    const value = outputScreen.value;
    if (value != undefined && value.length === 9) {
      expressResultInScientificNotation = true;
      return;
    }

    console.log(
      `outputScreen.value Length: ${outputScreen.value.toString().length}`
    );

    // Reduce the font size after length becomes greater than equal
    // to 7
    reduceFontSize();

    // If previous `click` event occured because of an operator
    // then clear the output screen & set it to incoming
    // value.
    if (isOperatorDetected) {
      outputScreen.value = e.target.innerText;
      isOperatorDetected = false;
      resetFontSize();
    } else {
      if (isEvaluationHappened) {
        // reset the expression after evaluation
        // to start fresh.
        expression = "";
        isEvaluationHappened = false;
        outputScreen.value = e.target.innerText;
      } else outputScreen.value += e.target.innerText;
    }

    expression += e.target.innerText;
    console.log(`expression: ${expression}`);
  });
});

// Add listeners to each operation
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const operation = e.target.innerText;

    // Don't add the operation to expression, if the expression is
    // empty and operation isn't '+' or '-'.
    if (expression === "" && (operation !== "+" || operation !== "-")) return;

    // If there's already an operator in the `expression`,
    // replace it will current incoming operator.
    const regex = new RegExp("[/*-+]$");
    if (regex.test(expression)) {
      expression = expression.replace(regex, operation);
    } else {
      // Otherwise add the operation.
      expression += operation;
    }

    console.log(`Operation: ${operation}, Expression: ${expression}`);

    // & set the necessary flags.
    isOperatorDetected = true;
    isEvaluationHappened = false;
  });
});

// Add listener to the evaluation button -> (=).
evaluator.addEventListener("click", (e) => {
  outputScreen.value = eval(expression);
  reduceFontSize();
  expression = outputScreen.value;
  isEvaluationHappened = true;
});

function resetFontSize() {
  outputScreen.style.fontSize = "3.2rem";
}

/*
 * Reduces the font size of the data contain
 * in the input box based its length.
 */
function reduceFontSize() {
  const len = outputScreen.value.length + 1;
  const valueAsFloat = Number.parseFloat(outputScreen.value);
  if (len == 7) {
    outputScreen.style.fontSize = "3rem";
  }
  else if (len == 8) {
    outputScreen.style.fontSize = "2.8rem";
  }
  else if (len >= 9) {
    outputScreen.style.fontSize = "2.6rem";
    outputScreen.value = valueAsFloat.toPrecision(9);
  }
}
