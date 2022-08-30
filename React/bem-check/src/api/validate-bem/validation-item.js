class ValidationResultItem {
  code;
  text;

  constructor(code, text) {
    if (!code) { throw new Error('code is null/undefined'); }
    if (!text) { throw new Error('text is null/undefined'); }

    this.code = code;
    this.text = text;
  }
  
  //get Code() { return this.#code;  } - properties are not supported in node (jest.toEqual({ code: 1 }) and console.log)
}

export { ValidationResultItem }
