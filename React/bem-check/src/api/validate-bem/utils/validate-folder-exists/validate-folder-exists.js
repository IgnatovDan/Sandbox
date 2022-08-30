import { ValidationItem } from "../../validation-item";
import { comparePaths } from "../utils";

class ErrorsCodes {
  constructor(errorPrefix) {
    if (!errorPrefix) {
      throw new Error('errorPrefix is empty');
    }
    this.notFound = errorPrefix + '-NotFound';
    this.incorrectPath = errorPrefix + '-IncorrectPath';
  }
}

function findFolders(folder, folderName) {
  if (!folder) {
    throw new Error('folder is null');
  }
  if (!folderName || (folderName === "")) {
    throw new Error('folderName is null or empty');
  }

  const childFolders = folder.folders[folderName] ? [folder.folders[folderName]] : [];

  const childFoldersResult = Object.values(folder.folders).reduce(
    (aggregator, folder) => {
      return aggregator.concat(findFolders(folder, folderName));
    },
    []
  );

  return [...childFolders, ...childFoldersResult];
}

function getNotFoundMessage(folderName, allowedPaths) {
  return `Нет каталога \`${folderName}\`, он должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`;
}

function getIncorrectPathMessage(folderName, parentFolderFullName, allowedPaths) {
  return `Каталог \`${folderName}\` расположен в \`${parentFolderFullName}\`, а должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`;
}

function validateFolderExists(folder, folderName, allowedPaths, errorCodePrefix) {
  if (!folderName || (folderName === "")) {
    throw new Error('folderName is null or empty');
  }
  if (!allowedPaths) {
    throw new Error('allowedPaths is null');
  }

  const result = [];
  const foundFolders = findFolders(folder, folderName);

  const errorCodes = new ErrorsCodes(errorCodePrefix);

  if (foundFolders.length === 0) {
    result.push(new ValidationItem(
      errorCodes.notFound,
      getNotFoundMessage(folderName, allowedPaths)
    ));
  }

  if (foundFolders.length === 1) {
    const foundFolder = foundFolders[0];
    if (!allowedPaths.find(item => comparePaths(foundFolder.getParentFolderFullName(), item))) {
      result.push(new ValidationItem(
        errorCodes.incorrectPath,
        getIncorrectPathMessage(folderName, foundFolder.getParentFolderFullName(), allowedPaths)
      ));
    }
  }

  return result;
}

export { validateFolderExists }
