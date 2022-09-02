import { createFolderFromJSZip } from './create-folder-from-jszip/create-folder-from-jszip';
import { autoSelectValidators } from './auto-select-validators/auto-select-validators';

function validateBem(folder, validators) {
  debugger;
  if (!validators) {
    throw new Error('validators is null');
  }

  return validators.reduce(
    (accumulator, validator) => {
      return accumulator.concat(validator(folder));
    },
    []
  );
}

function defaultIsRootFolderCallback(folder) {
  return (folder.findFiles('index.html').length > 0);
}

function validateBemJsZip(jsZip, validators, isRootFolderCallback) {
  const targetFolder = createFolderFromJSZip(jsZip);
  const actualIsRootFolderCallback = isRootFolderCallback || defaultIsRootFolderCallback;
  const targetRootFolder = (targetFolder.findChildFolderByCallback(actualIsRootFolderCallback) || targetFolder).cloneRecursive();
  const actualValidators = validators ? validators : autoSelectValidators(targetRootFolder);
  return validateBem(targetRootFolder, actualValidators);
}

export { validateBemJsZip }
