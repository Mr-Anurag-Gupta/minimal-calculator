class Screen {
  #result;
  #handle;

  constructor(selectors) {
    this.#initialize(selectors);
  }

  #initialize(selectors) {
    this.#result = 0;
    this.#handle = document.querySelector(selectors);
    //this.update(this.#result);
  }

  update(value) {
    this.#result = value;
    this.#updateFontSize();
    this.#handle.value = value;
  }

  #updateFontSize() {
    const len = this.#result.toString().length;
    const valueAsFloat = Number.parseFloat(this.#result);
    if (len == 7) {
      this.#handle.style.fontSize = "3rem";
    } else if (len == 8) {
      this.#handle.style.fontSize = "2.8rem";
    } else if (len >= 9) {
      this.#handle.style.fontSize = "2.6rem";
      this.#handle.value = valueAsFloat.toPrecision(9);
    }
  }

  getLength() {
    return this.#result;
  }
}

export default Screen;
