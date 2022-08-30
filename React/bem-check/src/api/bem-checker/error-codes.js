class ErrorMessage {
  code;
  message;
  constructor(code, message) {
    if (!code) {
      throw new Error('code is empty');
    }
    if (!message) {
      throw new Error('message is empty');
    }
    this.code = code;
    this.message = message;
  }
  //get Code() { return this.#code;  } - properties are not supported in jest.toEqual({ code: 1 }) and 'node' console.log
}

const errorCodes = {
  FontsCssFile_NotFound: 1,
  FontsCssFile_SeveralFiles: 2,
  FontsCssFile_IncorrectPath: 3,
};

export { ErrorMessage, errorCodes }
