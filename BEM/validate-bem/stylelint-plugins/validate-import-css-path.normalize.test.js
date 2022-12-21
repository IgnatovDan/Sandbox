const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./stylelint-plugins/validate-import-css-path.js'] });

const { ruleName } = require('./validate-import-css-path.js');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    {
      code: '@import url(../vendor/normalize.css)',
    },
    {
      code: `
        @import url(../vendor/normalize.css);
        @import url(../blocks/page/page.css);`,
    },
  ],
  reject: [
    {
      code: '@import url(../normalize.css)',
      message: `Expected "../normalize.css" to be "../vendor/normalize.css" (${ruleName})`,
    },
    {
      code: '@import url(../styles/normalize.css)',
      message: `Expected "../styles/normalize.css" to be "../vendor/normalize.css" (${ruleName})`,
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../vendor/normalize.css);`,
      message: `Expected "../vendor/normalize.css" to be included before 'blocks' files (${ruleName})`,
    },
  ],
});
