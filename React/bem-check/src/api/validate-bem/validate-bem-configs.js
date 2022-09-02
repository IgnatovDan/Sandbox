import {
  validateBlocksFolderExists,
  validateFontsCss,
  validateImagesFolderExists,
  validateNormalizeCssInStyles,
  validateNormalizeCssInVendor,
  validatePagesIndexCss,
  validateReadme,
  validateScriptsFileExists,
  validateStyleCssInStyles,
  validateVendorFolderExists
} from "./validators/validate-bem-validators";

const validateBemConfigs = {
  autoSelect: {
    caption: 'Auto select',
    validators: null
  },
  level1: {
    caption: 'Level1 (no `js/fonts/readme/`, has `styles/style.css + styles/normalize.css` + `images`)',
    validators: [
      validateStyleCssInStyles, validateNormalizeCssInStyles, validateImagesFolderExists
    ]
  },
  level2: {
    caption: 'Level2 (no `js/fonts`, has `readme/blocks/pages/vendor/images`)',
    validators: [
      validateReadme, validateBlocksFolderExists, validatePagesIndexCss, validateVendorFolderExists, validateImagesFolderExists,
      validateNormalizeCssInVendor
    ]
  },
  level3: {
    caption: 'Level3 (has `readme/blocks/pages/vendor/js/fonts/images`)',
    get validators() {
      return [...validateBemConfigs.level2.validators, validateScriptsFileExists, validateFontsCss];
    }
  }
}

export { validateBemConfigs }
