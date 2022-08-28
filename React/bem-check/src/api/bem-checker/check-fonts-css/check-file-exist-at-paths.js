function isFileContent(itemValue) {
  return typeof itemValue === 'string' || itemValue instanceof String;
}

function containsFile(folderItems, fileName, expectedFolders) {
  const containingItem = Object.getOwnPropertyNames(folderItems).find(
    (itemName) => {
      if (isFileContent(folderItems[itemName])) {
        if (expectedFolders && !expectedFolders.includes('./')) {
          return false;
        }
        const equalsExpr = RegExp(fileName, "ig");
        return itemName.match(equalsExpr);
      } else {
        if (expectedFolders && !expectedFolders.includes(itemName)) {
          return false;
        }
        return containsFile(folderItems[itemName], fileName);
      }
    }
  );
  return (containingItem !== undefined);
}

function checkFileExistAtLeastOnePath(folderItems, fileName, expectedPaths) {
  const result = [];
  if (!containsFile(folderItems, fileName, expectedPaths)) {
    result.push({
      message: `\`${fileName}\` файл должен быть в одном из каталогов: ${expectedPaths.map(item => `\`${item}\``)}`
    });
  }
  return result;
}

export { checkFileExistAtLeastOnePath }
