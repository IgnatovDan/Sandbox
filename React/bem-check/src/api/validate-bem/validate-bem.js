import { createFolderFromJSZip } from './create-folder-from-jszip/create-folder-from-jszip';
import { validateFontsCss } from './validate-fonts-css/validate-fonts-css';

function validateBem(folder, validators) {
  const actualValidators = validators ? validators : [validateFontsCss.default];
  return actualValidators.reduce(
    (accumulator, validator) => {
      return accumulator.concat(validator(folder));
    },
    []
  );
}

function validateBemJsZip(jsZip, validators) {
  return validateBem(createFolderFromJSZip(jsZip), validators);
}

export { validateBemJsZip }
