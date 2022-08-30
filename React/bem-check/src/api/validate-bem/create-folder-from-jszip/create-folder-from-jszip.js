import { Folder } from "../folder-object";

function createFolderFromJSZip(zipContent) {
  const root = new Folder('.');

  Object.getOwnPropertyNames(zipContent.files).forEach(
    (itemFullName) => {
      const fullNameAsArray = itemFullName.replace(/\/$/, '').split('/');
      const parentFolderFullNameAsArray = fullNameAsArray.slice(0, -1);
      const itemName = fullNameAsArray[fullNameAsArray.length - 1];

      const itemParentFolder = parentFolderFullNameAsArray.reduce(
        (parentFolder, folderName) => {
          let folder = parentFolder.folders[folderName];
          if (!folder) {
            folder = parentFolder.AddFolder(folderName);
          }
          return folder;
        },
        root
      );

      if (zipContent.files[itemFullName].dir) {
        itemParentFolder.AddFolder(itemName, fullNameAsArray);
      } else {
        itemParentFolder.AddFile(itemName, fullNameAsArray);
      }
    }
  );
  return root;
};


export { createFolderFromJSZip }
