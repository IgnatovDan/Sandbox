const validateImportFonts = require('./validate-import-fonts.js');
const validateImportNormalize = require('./validate-import-normalize.js');
const validateFontFaceDeclarationInFontsFileOnly = require('./validate-font-face-declaration-in-fonts-file-only.js');

const plugins = [
  validateImportFonts,
  validateImportNormalize,
  validateFontFaceDeclarationInFontsFileOnly
];

module.exports = plugins;
