const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./stylelint-plugins/validate-import-css-path.js'] });

const { ruleName } = require('./validate-import-css-path.js');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import "../vendor/normalize.css";' },
    { code: '@import url("../vendor/normalize.css");' },
    { code: '@import url(../vendor/normalize.css)' },
  ],
  reject: [
    {
      code: '@import "";',
      message: `Cannot parse uri from import rule: "undefined" (${ruleName})`,
    },
  ],
});
