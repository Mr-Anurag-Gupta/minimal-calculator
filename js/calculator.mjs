import Screen from "./screen.mjs";
import Keypad from "./keypad.mjs";

class Calculator {
  #keypad;
  #screen;

  constructor() {
    this.#screen = new Screen("#output");

    this.#keypad = new Keypad(
      ".keypad-row .btn:not([class~='evaluate']):not([class~='operator'])",
      ".keypad-row .operator",
      ".keypad-row .evaluate",
      this.#screen
    );
  }
}

export default Calculator;
