import { checkFontsCss } from './bem-checker/check-fonts-css';
import { convertFromJSZip } from './bem-checker/utils/convert-from-jszip';

function runChecks(folder, options) {
  return checkFontsCss(folder, options['fonts.css']);
}

function runChecksFromJsZip(jsZip, options) {
  return runChecks(convertFromJSZip(jsZip), options);
}

export { runChecksFromJsZip }
