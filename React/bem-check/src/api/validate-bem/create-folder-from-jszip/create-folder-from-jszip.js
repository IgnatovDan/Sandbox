import { Folder } from "../folder-object";

function createFolderFromJSZip(zipContent) {
  if (!zipContent) { throw new Error('zipContent is null/undefined'); }
  
  const root = new Folder('.', Folder.NoParent);

  Object.getOwnPropertyNames(zipContent.files).forEach(
    (itemFullName) => {
      const fullNameAsArray = itemFullName.replace(/\/$/, '').split('/');
      const parentFolderFullNameAsArray = fullNameAsArray.slice(0, -1);
      const itemName = fullNameAsArray[fullNameAsArray.length - 1];

      const itemParentFolder = parentFolderFullNameAsArray.reduce(
        (parentFolder, folderName) => {
          let folder = parentFolder.folders[folderName];
          if (!folder) {
            folder = parentFolder.addFolder(folderName);
          }
          return folder;
        },
        root
      );

      if (zipContent.files[itemFullName].dir) {
        itemParentFolder.addFolder(itemName);
      } else {
        itemParentFolder.addFile(itemName);
      }
    }
  );
  return root;
};


export { createFolderFromJSZip }
