import { checkFileExistAtLeastOnePath } from './check-fonts-css/check-file-exist-at-paths';

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

function checkFontsCss(folderItems, fontCssOptions) {
  const result = [];
  if (fontCssOptions) {
    result.push(...checkFileExistAtLeastOnePath(folderItems, 'fonts.css', ['vendor', 'vendor/fonts']));
  }
  return result;
}

export { checkFontsCss }
