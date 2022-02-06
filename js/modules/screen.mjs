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
    this.#handle.value = this.#result;
  }

  #updateFontSize() {
    const len = this.#result.toString().length;

    if (len >= 9) {
      this.#handle.style.fontSize = "2.8rem";
      this.#result = this.#result.toString().slice(0, 9);
    }
  }

  getLength() {
    return this.#result;
  }
}

export default Screen;
