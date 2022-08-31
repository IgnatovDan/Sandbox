import { ValidationResultItem } from "../../validation-item";
import { comparePaths } from "../utils";

class ValidationResults {
  #notFound = 'notFound';
  #severalFiles = 'severalFiles';
  #incorrectPath = 'incorrectPath';
  #incorrectCaseInFileName = 'incorrectCaseInFileName';

  constructor(errorPrefix) {
    if (!errorPrefix) { throw new Error('errorPrefix is empty'); }

    this.#notFound = errorPrefix + '-NotFound';
    this.#severalFiles = errorPrefix + '-SeveralFiles';
    this.#incorrectPath = errorPrefix + '-IncorrectPath';
    this.#incorrectCaseInFileName = errorPrefix + '-IncorrectCaseInFileName';
  }

  createNotFound(fileName, allowedPaths) {
    if (!fileName) { throw new Error('fileName is null/undefined'); }
    if (!allowedPaths) { throw new Error('allowedPaths is null/undefined'); }

    const message = allowedPaths.length === 1 ?
      `Нет файла \`${fileName}\`, он должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
      :
      `Нет файла \`${fileName}\`, он должен быть в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`;

    return new ValidationResultItem(this.#notFound, message);
  }

  createSeveralFiles(fileName, foundFiles, allowedPaths) {
    if (!fileName) { throw new Error('fileName is null/undefined'); }
    if (!foundFiles) { throw new Error('foundFiles is null/undefined'); }
    if (!allowedPaths) { throw new Error('allowedPaths is null/undefined'); }

    const message = `Есть несколько \`${fileName}\` файлов: ${foundFiles.map(item => `\`${item.getFullName()}\``)}. ` +
      (
        allowedPaths.length === 1 ?
          `Файл \`${fileName}\` должен быть один в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
          :
          `Файл \`${fileName}\` должен быть один в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`
      );

    return new ValidationResultItem(this.#severalFiles, message);
  }

  createIncorrectPath(fileFullName, allowedPaths) {
    if (!fileFullName) { throw new Error('fileFullName is null/undefined'); }
    if (!allowedPaths) { throw new Error('allowedPaths is null/undefined'); }

    const message = allowedPaths.length === 1 ?
      `Файл \`${fileFullName}\` должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
      :
      `Файл \`${fileFullName}\` должен быть в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`;

    return new ValidationResultItem(this.#incorrectPath, message);
  }

  createIncorrectCaseInFileName(fileFullName, targetFileName) {
    if (!fileFullName) { throw new Error('fileFullName is null/undefined'); }
    if (!targetFileName) { throw new Error('targetFileName is null/undefined'); }

    const message = `Файл \`${fileFullName}\` должен иметь название \`${targetFileName}\``;

    return new ValidationResultItem(this.#incorrectCaseInFileName, message);
  }
}

function validateFileExists(folder, fileName, allowedPaths, errorCodePrefix, allowUpperCase) {
  if (!fileName || (fileName === '')) { throw new Error('fileName is null/undefined/empty string'); }
  if (!allowedPaths) { throw new Error('expectedPaths is null/undefined'); }

  const result = [];
  const foundFiles = folder.findFilesRecursive(fileName);

  const validationResults = new ValidationResults(errorCodePrefix);

  if (foundFiles.length === 0) {
    result.push(validationResults.createNotFound(fileName, allowedPaths));
  }

  if (foundFiles.length > 1) {
    result.push(validationResults.createSeveralFiles(fileName, foundFiles, allowedPaths));
  }

  if (foundFiles.length === 1) {
    const foundFile = foundFiles[0];
    if (!allowUpperCase && foundFile.name.toUpperCase() === fileName.toUpperCase() && foundFile.name !== fileName) {
      result.push(validationResults.createIncorrectCaseInFileName(foundFile.getFullName(), fileName));
    }
    if (!allowedPaths.find(item => comparePaths(foundFile.getParentFolderFullName(), item))) {
      result.push(validationResults.createIncorrectPath(foundFile.getFullName(), allowedPaths));
    }
  }
  return result;
}

export { validateFileExists }
