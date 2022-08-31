class Folder {
  static NoParent = {};

  files = {};
  folders = {};
  name = '';
  #parentFolder = null;

  constructor(name, parentFolder) {
    if (!name || name === '') { throw new Error('name is null/undefined'); }
    if (!parentFolder) { throw new Error('parentFolder is null/undefined'); }

    this.name = name;
    this.#parentFolder = (parentFolder === Folder.NoParent) ? null : parentFolder;
  }

  addFile(fileName) {
    if (!fileName) {
      throw new Error('fileName is null');
    }
    const result = new File(fileName, this);
    this.files[fileName] = result;
    return result;
  }

  addFolder(folderName) {
    const result = new Folder(folderName, this);
    this.folders[folderName] = result;
    return result;
  }

  containsFolder(targetFolderName) {
    return Object.getOwnPropertyNames(this.folders).some(name => name === targetFolderName);
  }

  getParentFolderFullName() {
    return this.getFullNameAsArray().slice(0, -1).join('/');
  }

  getFullName() {
    return this.getFullNameAsArray().join('/');
  }

  getFullNameAsArray() {
    const result = [this.name];
    let parentFolder = this.#parentFolder;
    while (parentFolder) {
      result.push(parentFolder.name);
      parentFolder = parentFolder.getParentFolder();
    }
    return result.reverse();
  }

  getParentFolder() {
    return this.#parentFolder;
  }

  cloneRecursive() {
    function copyRecursive(sourceFolder, targetFolder) {
      Object.getOwnPropertyNames(sourceFolder.files).forEach(
        name => targetFolder.addFile(name)
      );
      Object.getOwnPropertyNames(sourceFolder.folders).forEach(
        name => {
          const childFolderClone = targetFolder.addFolder(name);
          copyRecursive(sourceFolder.folders[name], childFolderClone)
        }
      );
    }
    const result = new Folder('.', Folder.NoParent);
    copyRecursive(this, result);
    return result;
  }

  findChildFolderByCallback(callback) {
    function findRecursiveMaxDeep(folder, callback, level) {
      if (level === 0 || !callback || !folder) {
        return null;
      }
      const childFolderNames = Object.getOwnPropertyNames(folder.folders);
      if (Object.getOwnPropertyNames(folder.files).length === 0 && childFolderNames.length === 1) {
        const childFolder1 = folder.folders[childFolderNames[0]];
        if (callback(childFolder1)) {
          return childFolder1;
        }
        return findRecursiveMaxDeep(childFolder1, callback, level--);
      }
      return null;
    }

    if (!callback || callback(this)) {
      return this;
    }

    return findRecursiveMaxDeep(this, callback, 2);
  }
  //get files() { return this.#files; } - properties are not supported in node (jest.toEqual({ code: 1 }) and console.log)
}

class File {
  name = '';
  #parentFolder = null;

  constructor(name, parentFolder) {
    if (!name || name === '') { throw new Error('name is null'); }
    if (!parentFolder) { throw new Error('parentFolder is null'); }

    this.name = name || '';
    this.#parentFolder = parentFolder;
  }

  getFullName() { return this.getFullNameAsArray().join('/'); }
  getParentFolderFullName() { return this.getFullNameAsArray().slice(0, -1).join('/'); }
  getFullNameAsArray() {
    const result = [this.name];
    let parentFolder = this.#parentFolder;
    while (parentFolder) {
      result.push(parentFolder.name);
      parentFolder = parentFolder.getParentFolder();
    }
    return result.reverse();
  }
  //get Name() { return this.#name; } - properties are not supported in node (jest.toEqual({ code: 1 }) and console.log)
}

export { Folder, File }
