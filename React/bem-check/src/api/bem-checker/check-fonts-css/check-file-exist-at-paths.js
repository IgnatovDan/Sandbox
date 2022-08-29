function isFileContent(itemValue) {
  return typeof itemValue === 'string' || itemValue instanceof String;
}

function findFiles(folderItems, fileName, parentPath) {
  const result = Object.getOwnPropertyNames(folderItems).reduce(
    (prevResult, itemName) => {
      const currentItemResult = [];
      if (isFileContent(folderItems[itemName])) {
        const equalsExpr = RegExp(fileName, "ig");
        if (itemName.match(equalsExpr)) {
          currentItemResult.push({
            path: parentPath,
            name: itemName
          });
        }
      } else {
        const nestedResult = findFiles(folderItems[itemName], fileName, parentPath + '/' + itemName);
        currentItemResult.push(...nestedResult);
      }
      return prevResult.concat(currentItemResult);
    },
    []
  );
  return result;
}

function checkSingleFileExistsAtOneOfPaths(folderItems, fileName, expectedPaths) {
  const result = [];
  const foundFiles = findFiles(folderItems, fileName, '.');

  if(foundFiles.length === 0) {
    result.push({
      message: `Файл \`${fileName}\` должен быть в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
    });
  }

  if (foundFiles.length > 1) {
    result.push({
      message:
        `Есть несколько \`${fileName}\` файлов: ${foundFiles.map(item => `\`${item.path + '/' + item.name}\``)}. ` +
        `Файл должен быть один в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
    });
  }

  if (foundFiles.length === 1) {
    const foundFile = foundFiles[0];
    const expectedPathsMessages = [];
    if (!expectedPaths.includes(foundFile.path)) {
      expectedPathsMessages.push({
        message:
          `Файл \`${foundFile.path + '/' + foundFile.name}\` должен быть в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
      });
    }
    result.push(...expectedPathsMessages);
  }
  return result;
}

export { checkSingleFileExistsAtOneOfPaths }
