import { checkSingleFileExistsAtOneOfPaths } from './check-fonts-css/check-file-exist-at-paths';

function checkFontsCss(folderItems, fontCssOptions) {
  const result = [];
  if (fontCssOptions?.path) {
    //result.push(...checkFileExistAtLeastOnePath(folderItems, 'fonts.css', ['vendor', 'vendor/fonts']));
    result.push(...checkSingleFileExistsAtOneOfPaths(folderItems, 'fonts.css', ['./vendor', './vendor/fonts']));
    
  }
  return result;
}

export { checkFontsCss }
