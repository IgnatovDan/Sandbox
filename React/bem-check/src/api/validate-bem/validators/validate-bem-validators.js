import { validateFileExists } from "../utils/validate-file-exists/validate-file-exists";
import { validateFolderExists } from "../utils/validate-folder-exists/validate-folder-exists";

const validateFontsCss = (folder) => {
  return validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'validateFontsCss');
};

const validateNormalizeCssInVendor = (folder) => {
  return validateFileExists(folder, 'normalize.css', ['./vendor'], 'validateNormalizeCssInVendor');
};

const validateNormalizeCssInStyles = (folder) => {
  return validateFileExists(folder, 'normalize.css', ['./styles'], 'validateNormalizeCssInStyles');
};

const validateStyleCssInStyles = (folder) => {
  return validateFileExists(folder, 'style.css', ['./styles'], 'validateStyleCssInStyles');
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

const validateVendorFolderExists = (folder) => {
  return validateFolderExists(folder, 'vendor', ['./'], 'validateVendorFolderExists');
};

const validateScriptsFileExists = (folder) => {
  return validateFileExists(folder, 'index.js', ['./scripts'], 'validateScriptsFileExists');
};

export {
  validateFontsCss,
  validateNormalizeCssInVendor,
  validateNormalizeCssInStyles,
  validateStyleCssInStyles,
  validateReadme,
  validateScriptIndexJs,
  validatePagesIndexCss,
  validateBlocksFolderExists,
  validateImagesFolderExists,
  validateVendorFolderExists,
  validateScriptsFileExists
}
