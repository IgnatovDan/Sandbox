const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./stylelint-plugins/validate-import-css-path.js'] });

const { ruleName } = require('./validate-import-css-path.js');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../page/page.css)' },
    { code: '@import url(../page.css)' },
  ],
  reject: [
  ],
});
