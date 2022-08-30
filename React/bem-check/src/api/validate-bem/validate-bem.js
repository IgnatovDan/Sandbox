import { createFolderFromJSZip } from './create-folder-from-jszip/create-folder-from-jszip';
import { validateFileExists } from './utils/validate-file-exists';

const validateFontsCss = (folder) => {
  return validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'validateFontsCss');
};
const validateNormalizeCss = (folder) => {
  return validateFileExists(folder, 'normalize.css', ['./vendor'], 'validateNormalizeCss');
};
const validateReadme = (folder) => {
  return validateFileExists(folder, 'readme.md', ['./'], 'validateReadme');
};

function validateBem(folder, validators) {
  const actualValidators = validators ? validators : [validateFontsCss, validateNormalizeCss, validateReadme];
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
