class Folder {
  files = {};
  folders = {};
  name = '';
  #fullNameAsArray = [];

  constructor(name, fullNameAsArray) {
    if (!name || name === '') { throw new Error('name is null/undefined'); }
    if (!fullNameAsArray) { throw new Error('fullNameAsArray is null/undefined'); }

    this.name = name;
    this.#fullNameAsArray = fullNameAsArray;
  }

  AddFile(fileName, fullNameAsArray) {
    if (!fileName) {
      throw new Error('fileName is null');
    }
    const result = new File(fileName, fullNameAsArray);
    this.files[fileName] = result;
    return result;
  }
  AddFolder(folderName, fullNameAsArray) {
    const result = new Folder(folderName, fullNameAsArray);
    this.folders[folderName] = result;
    return result;
  }
  getParentFolderFullName() { return this.#fullNameAsArray.slice(0, -1).join('/'); }
  getFullName() { return this.#fullNameAsArray.join('/'); }
  //get files() { return this.#files; } - properties are not supported in node (jest.toEqual({ code: 1 }) and console.log)
}

class File {
  name = '';
  #fullNameAsArray = [];

  constructor(name, fullNameAsArray) {
    if (!name || name === '') { throw new Error('name is null/undefined'); }

    this.name = name || '';
    this.#fullNameAsArray = fullNameAsArray || [];
  }

  getFullName() { return this.#fullNameAsArray.join('/'); }
  getParentFolderFullName() { return this.#fullNameAsArray.slice(0, -1).join('/'); }
  //get Name() { return this.#name; } - properties are not supported in node (jest.toEqual({ code: 1 }) and console.log)
}

export { Folder, File }
