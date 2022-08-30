class ErrorMessage {
  code;
  text;
  constructor(code, text) {
    if (!code) {
      throw new Error('code is empty');
    }
    if (!text) {
      throw new Error('text is empty');
    }
    this.code = code;
    this.text = text;
  }
  //get Code() { return this.#code;  } - properties are not supported in jest.toEqual({ code: 1 }) and 'node' console.log
}

const errorCodes = {
  FontsCssFile_NotFound: 1,
  FontsCssFile_SeveralFiles: 2,
  FontsCssFile_IncorrectPath: 3,
};

export { ErrorMessage, errorCodes }
