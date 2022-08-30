import { errorCodes, ErrorMessage } from "../error-codes";

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

function checkSingleFileExistsAtOneOfPaths(folder, fileName, expectedPaths) {
  if (!fileName || (fileName === "")) {
    throw new Error('fileName is null or empty');
  }
  if (!expectedPaths) {
    throw new Error('expectedPaths is null');
  }  

  const result = [];
  const foundFiles = findFiles(folder, fileName);

  debugger;
  if(foundFiles.length === 0) {
    result.push(new ErrorMessage(
      errorCodes.FontsCssFile_NotFound,
      `Нет файла \`${fileName}\`, он должен быть в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
    ));
  }

  if (foundFiles.length > 1) {
    result.push(new ErrorMessage(
      errorCodes.FontsCssFile_SeveralFiles,
      `Есть несколько \`${fileName}\` файлов: ${foundFiles.map(item => `\`${item.getFullName()}\``)}. ` +
      `Файл \`${fileName}\` должен быть один в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
    ));
  }

  if (foundFiles.length === 1) {
    const foundFile = foundFiles[0];
    if (!expectedPaths.find(item => comparePaths(foundFile.getParentFolderFullName(), item))) {
      result.push(new ErrorMessage(
        errorCodes.FontsCssFile_IncorrectPath,
        `Файл \`${foundFile.getFullName()}\` должен быть в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
      ));
    }
  }
  return result;
}

export { checkSingleFileExistsAtOneOfPaths }
