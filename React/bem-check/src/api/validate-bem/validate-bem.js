import { createFolderFromJSZip } from './create-folder-from-jszip/create-folder-from-jszip';
import { validateFileExists } from './utils/validate-file-exists/validate-file-exists';
import { validateFolderExists } from './utils/validate-folder-exists/validate-folder-exists';

const validateFontsCss = (folder) => {
  return validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'validateFontsCss');
};
const validateNormalizeCss = (folder) => {
  return validateFileExists(folder, 'normalize.css', ['./vendor'], 'validateNormalizeCss');
};
const validateReadme = (folder) => {
  return validateFileExists(folder, 'readme.md', ['./'], 'validateReadme', true);
};

const validateScriptIndexJs = (folder) => {
  return validateFileExists(folder, 'index.js', ['./scripts'], 'validateScriptJs');
};

const validatePagesIndexCss = (folder) => {
  return validateFileExists(folder, 'index.css', ['./pages'], 'validatePagesIndexCss');
};

const validateBlocksFolderExists = (folder) => {
  return validateFolderExists(folder, 'blocks', ['./'], 'validateBlocksFolderExists');
};

const validateImagesFolderExists = (folder) => {
  return validateFolderExists(folder, 'images', ['./'], 'validateImagesFolderExists');
};

function validateBem(folder, validators) {
  const activeValidators = validators ?
    validators
    :
    [
      validateFontsCss, validateNormalizeCss, validateReadme, validateBlocksFolderExists, validateScriptIndexJs,
      validatePagesIndexCss, validateImagesFolderExists
    ];

  return activeValidators.reduce(
    (accumulator, validator) => {
      return accumulator.concat(validator(folder));
    },
    []
  );
}

function validateBemJsZip(jsZip, validators, isRootFolderCallback) {
  const targetFolder = createFolderFromJSZip(jsZip);
  const targetRootFolder = (targetFolder.findChildFolderByCallback(isRootFolderCallback) || targetFolder).cloneRecursive();
  return validateBem(targetRootFolder, validators);
}

export { validateBemJsZip }
