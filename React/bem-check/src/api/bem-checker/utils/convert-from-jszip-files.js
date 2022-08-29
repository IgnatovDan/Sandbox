function convertFromJSZipContent(zipContent) {
  const root = {};
  Object.getOwnPropertyNames(zipContent.files).forEach(filePath => {
    filePath.replace(/\/$/, '').split('/').reduce(
      (prevResult, filePathPart) => {
        if (!prevResult[filePathPart]) {
          prevResult[filePathPart] = {};
        }
        return prevResult[filePathPart];
      },
      root
    );
  });

  return root;
}

export { convertFromJSZipContent }
