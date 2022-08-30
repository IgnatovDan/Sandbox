import { ValidationItem } from "../validation-item";

class ErrorsCodes {
  constructor(errorPrefix) {
    if (!errorPrefix) {
      throw new Error('errorPrefix is empty');
    }
    this.notFound = errorPrefix + '-NotFound';
    this.severalFiles = errorPrefix + '-SeveralFiles';
    this.incorrectPath = errorPrefix + '-IncorrectPath';
  }
}

function comparePaths(path1, path2) {
  // remove leading './' and trailing '/'
  const path1_ = path1.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  const path2_ = path2.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  return (path1_ === path2_);
}

function findFiles(folder, fileName) {
  if (!folder) {
    throw new Error('folder is null');
  }
  if (!fileName || (fileName === "")) {
    throw new Error('fileName is null or empty');
  }

  const currentFolderFiles = folder.files[fileName] ? [folder.files[fileName]] : [];

  const folderFoldersResult = Object.values(folder.folders).reduce(
    (aggregator, folder) => {
      return aggregator.concat(findFiles(folder, fileName));
    },
    []
  );

  return [...currentFolderFiles, ...folderFoldersResult];
}

function getNotFoundMessage(fileName, allowedPaths) {
  return allowedPaths.length === 1 ?
    `Нет файла \`${fileName}\`, он должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
    :
    `Нет файла \`${fileName}\`, он должен быть в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`
    ;
}

function getSeveralFilesMessage(fileName, foundFiles, allowedPaths) {
  return `Есть несколько \`${fileName}\` файлов: ${foundFiles.map(item => `\`${item.getFullName()}\``)}. ` +
    (
      allowedPaths.length === 1 ?
        `Файл \`${fileName}\` должен быть один в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
        :
        `Файл \`${fileName}\` должен быть один в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`
    );
}

function getIncorrectPathMessage(file, allowedPaths) {
  return allowedPaths.length === 1 ?
    `Файл \`${file.getFullName()}\` должен быть в каталоге ${allowedPaths.map(item => `\`${item}\``)}`
    :
    `Файл \`${file.getFullName()}\` должен быть в одном из каталогов: ${allowedPaths.map(item => `\`${item}\``)}`
    ;
}


function validateFileExists(folder, fileName, allowedPaths, errorCodePrefix) {
  if (!fileName || (fileName === "")) {
    throw new Error('fileName is null or empty');
  }
  if (!allowedPaths) {
    throw new Error('expectedPaths is null');
  }

  const result = [];
  const foundFiles = findFiles(folder, fileName);

  const errorCodes = new ErrorsCodes(errorCodePrefix);

  if (foundFiles.length === 0) {
    result.push(new ValidationItem(
      errorCodes.notFound,
      getNotFoundMessage(fileName, allowedPaths)
    ));
  }

  if (foundFiles.length > 1) {
    result.push(new ValidationItem(
      errorCodes.severalFiles,
      getSeveralFilesMessage(fileName, foundFiles, allowedPaths)
    ));
  }

  if (foundFiles.length === 1) {
    const foundFile = foundFiles[0];
    if (!allowedPaths.find(item => comparePaths(foundFile.getParentFolderFullName(), item))) {
      result.push(new ValidationItem(
        errorCodes.incorrectPath,
        getIncorrectPathMessage(foundFile, allowedPaths)
      ));
    }
  }
  return result;
}

export { validateFileExists }
