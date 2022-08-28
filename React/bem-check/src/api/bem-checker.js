import { checkFontsCss } from './bem-checker/check-fonts-css';

function runChecks(folderItems, options) {
  const result = [];
  result.push(...checkFontsCss(folderItems, options['fonts.css']));
  return result;
}

export { runChecks }
