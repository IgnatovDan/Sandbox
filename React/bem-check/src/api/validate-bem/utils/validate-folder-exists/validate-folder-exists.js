import { ValidationResultItem } from "../../validation-item";
import { comparePaths } from "../utils";

class ValidationResults {
  #notFound = 'NotFound';
  #incorrectPath = 'IncorrectPath';
  #incorrectCaseInFileName = 'IncorrectCaseInFileName';

  constructor(errorPrefix) {
    if (!errorPrefix) { throw new Error('errorPrefix is empty'); }

    this.#notFound = errorPrefix + '-NotFound';
    this.#incorrectPath = errorPrefix + '-IncorrectPath';
    this.#incorrectCaseInFileName = errorPrefix + '-IncorrectCaseInFileName';
  }

  createNotFound(folderName, allowedPaths) {
    if (!folderName) { throw new Error('folderName is null/undefined'); }
    if (!allowedPaths) { throw new Error('allowedPaths is null/undefined'); }

    return new ValidationResultItem(
      this.#notFound,
      `Нет каталога \`${folderName}\`, он должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
    )
  }

  createIncorrectPath(parentFolderFullName, folderName, allowedPaths) {
    if (!folderName) { throw new Error('folderName is null/undefined'); }
    if (!allowedPaths) { throw new Error('allowedPaths is null/undefined'); }
    if (!parentFolderFullName) { throw new Error('parentFolderFullName is null/undefined'); }

    return new ValidationResultItem(
      this.#incorrectPath,
      `Каталог \`${folderName}\` расположен в \`${parentFolderFullName}\`, а должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
    )
  }

  createIncorrectCaseInFolderName(folderFullName, targetFolderName) {
    if (!folderFullName) { throw new Error('folderName is null/undefined'); }
    if (!targetFolderName) { throw new Error('targetFolderName is null/undefined'); }

    return new ValidationResultItem(
      this.#incorrectCaseInFileName,
      `Каталог \`${folderFullName}\` должен иметь название \`${targetFolderName}\``
    );
  }
}

function findFoldersInFolder(folder, folderName) {
  if (!folder) { throw new Error('folder is null/undefined'); }
  if (!folderName) { throw new Error('folderName is null/undefined'); }

  const result = [];
  const propertyName = Object.getOwnPropertyNames(folder.folders).find(
    propertyName => propertyName.toUpperCase() === folderName.toUpperCase()
  );
  if (propertyName) {
    result.push(folder.folders[propertyName]);
  }
  return result;
}

function findFoldersRecursive(folder, folderName) {
  if (!folder) { throw new Error('folder is null'); }
  if (!folderName || (folderName === '')) { throw new Error('folderName is null or empty'); }

  const childFolders = findFoldersInFolder(folder, folderName);

  const childFoldersResult = Object.values(folder.folders).reduce(
    (aggregator, folder) => {
      return aggregator.concat(findFoldersRecursive(folder, folderName));
    },
    []
  );

  return [...childFolders, ...childFoldersResult];
}

function validateFolderExists(folder, folderName, allowedPaths, errorCodePrefix) {
  if (!folderName || (folderName === '')) { throw new Error('folderName is null/undefined'); }
  if (!allowedPaths) { throw new Error('allowedPaths is null'); }

  const result = [];
  const foundFolders = findFoldersRecursive(folder, folderName);

  const validationResults = new ValidationResults(errorCodePrefix);

  if (foundFolders.length === 0) {
    result.push(
      validationResults.createNotFound(folderName, allowedPaths)
    );
  }

  if (foundFolders.length === 1) {
    const foundFolder = foundFolders[0];
    if (foundFolder.name.toUpperCase() === folderName.toUpperCase() && foundFolder.name !== folderName) {
      result.push(
        validationResults.createIncorrectCaseInFolderName(foundFolder.getFullName(), folderName)
      );
    }
    if (!allowedPaths.find(item => comparePaths(foundFolder.getParentFolderFullName(), item))) {
      result.push(
        validationResults.createIncorrectPath(foundFolder.getParentFolderFullName(), folderName, allowedPaths)
      );
    }
  }

  return result;
}

export { validateFolderExists }
