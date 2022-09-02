import JSZip from 'jszip';
import { createFolderFromJSZip } from '../create-folder-from-jszip/create-folder-from-jszip';
import { validateBemConfigs } from '../validate-bem-configs';
import { autoSelectValidators } from './auto-select-validators';

describe('autoGetValidators', () => {
  test('return level1 for [styles/style.css, no blocks/vendor]', () => {
    const zip = new JSZip();
    zip.folder('styles').file('style.css', '');
    
    const validators = autoSelectValidators(createFolderFromJSZip(zip));

    expect(validators).toEqual(validateBemConfigs.level1.validators);
  });

  test('return level2 for [there is blocks]', () => {
    const zip = new JSZip();
    zip.folder('blocks')
    
    const validators = autoSelectValidators(createFolderFromJSZip(zip));

    expect(validators).toEqual(validateBemConfigs.level2.validators);
  });

  test('return level2 for [there is vendor]', () => {
    const zip = new JSZip();
    zip.folder('vendor');
    
    const validators = autoSelectValidators(createFolderFromJSZip(zip));

    expect(validators).toEqual(validateBemConfigs.level2.validators);
  });

  test('return level2 for [there is pages]', () => {
    const zip = new JSZip();
    zip.folder('pages');
    
    const validators = autoSelectValidators(createFolderFromJSZip(zip));

    expect(validators).toEqual(validateBemConfigs.level2.validators);
  });

  test('return level3 for [there is scripts]', () => {
    const zip = new JSZip();
    zip.folder('scripts');
    
    const validators = autoSelectValidators(createFolderFromJSZip(zip));

    expect(validators).toEqual(validateBemConfigs.level3.validators);
  });
});
