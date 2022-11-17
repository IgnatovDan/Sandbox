const postcss = require('postcss');
const plugin = require('../index.js');
const { texts } = require('../lib/texts.js');

async function getWarnings(css) {
  let result = await postcss([plugin({})]).process(css, { from: 'pages/index.css' })
  return result.warnings().map(w => ({ text: w.text }));
}

test('./pages/index.css with @import url(../blocks/header/header.css);', async () => {
  const css = '@import url(../blocks/header/header.css);';

  const warnings = await getWarnings(css);
  expect(warnings).toHaveLength(0);
});

test('./pages/index.css with @import url(../header/header.css);', async () => {
  const css = '@import url(../header/header.css);';

  const warnings = await getWarnings(css);
  expect(warnings).toEqual([{ text: texts.placeBlocksIntoBlocksFolder }]);
});
