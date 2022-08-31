function comparePaths(path1, path2) {

  if (!path1 && path1 !== '') { throw new Error('path1 is null/undefined'); }
  if (!path2 && path1 !== '') { throw new Error('path2 is null/undefined'); }

  // remove leading './' and trailing '/'
  const path1_ = path1.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  const path2_ = path2.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  return (path1_ === path2_);
}

function findFilesInFolder(folder, fileName) {
  if (!folder) { throw new Error('folder is null/undefined'); }
  if (!fileName) { throw new Error('fileName is null/undefined'); }

  const result = [];
  const propertyName = Object.getOwnPropertyNames(folder.files).find(
    propertyName => propertyName.toUpperCase() === fileName.toUpperCase()
  );
  if (propertyName) {
    result.push(folder.files[propertyName]);
  }
  return result;
}

function findFilesRecursive(folder, fileName) {
  if (!folder) { throw new Error('folder is null'); }
  if (!fileName || (fileName === '')) { throw new Error('fileName is null or empty'); }

  const childFiles = findFilesInFolder(folder, fileName);

  const childFoldersResult = Object.values(folder.folders).reduce(
    (aggregator, folder) => {
      return aggregator.concat(findFilesRecursive(folder, fileName));
    },
    []
  );

  return [...childFiles, ...childFoldersResult];
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

export { comparePaths, findFilesRecursive, findFoldersRecursive }
