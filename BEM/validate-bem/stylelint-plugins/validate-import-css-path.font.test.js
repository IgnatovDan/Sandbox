const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./stylelint-plugins/validate-import-css-path.js'] });

const { ruleName } = require('./validate-import-css-path.js');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../vendor/font.css)' },
    { code: '@import url(../vendor/inter.css)' },
    { code: '@import url(../vendor/font/font.css)' },
    { code: '@import url(../vendor/font/inter.css)' },
    { code: '@import url(../font/font.css)' },
    { code: '@import url(../font/inter.css)' },
    { code: '@import url(../fonts/fonts.css)' },
    { code: '@import url(../fonts/inter.css)' },
  ],
  reject: [
    // { todo
    //   code: '@import url(../font.css)',
    //   message: `Expected fonts to be located out of the 'blocks' folder: "../blocks/font.css" (${ruleName})`,
    // },
    {
      code: '@import url(../blocks/font.css)',
      message: `Expected fonts to be located out of the 'blocks' folder: "../blocks/font.css" (${ruleName})`,
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../font/font.css);`,
      message: `Expected "../font/font.css" to be included before 'blocks' files (${ruleName})`,
    },
  ],
});
