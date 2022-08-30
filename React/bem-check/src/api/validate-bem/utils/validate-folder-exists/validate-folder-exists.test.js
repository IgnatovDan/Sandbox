import JSZip from 'jszip';
import { validateBemJsZip } from '../../validate-bem';
import { validateFolderExists } from './validate-folder-exists';

describe('Passed file checks', () => {
  test('check ./fonts', () => {
    const zip = new JSZip();
    zip.folder('fonts');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['./'], 'validator1')]
    );

    expect(results).toEqual([]);
  });

  test('check ./folder1/fonts', () => {
    const zip = new JSZip();
    zip.folder('folder1').folder('fonts');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['./folder1'], 'validator1')]
    );

    expect(results).toEqual([]);
  });

  test('check ./folder1/folder2/fonts', () => {
    const zip = new JSZip();
    zip.folder('folder1').folder('folder2').folder('fonts');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['./folder1/folder2'], 'validator1')]
    );

    expect(results).toEqual([]);
  });

});

describe('Failed folder checks', () => {
  test('check fonts expected in ./ but zip is empty', () => {
    const zip = new JSZip();

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['./'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-NotFound',
      text: 'Нет каталога `fonts`, он должен быть в каталоге `./`'
    }]);
  });

  test('check fonts expected in ./folder1 but zip is empty', () => {
    const zip = new JSZip();

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-NotFound',
      text: 'Нет каталога `fonts`, он должен быть в каталоге `folder1`'
    }]);
  });

  test('check fonts expected in ./folder1 but there are other folders', () => {
    const zip = new JSZip();
    zip.folder('folder1').folder('folder1_1');
    zip.folder('folder2').folder('folder2_1');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-NotFound',
      text: 'Нет каталога `fonts`, он должен быть в каталоге `folder1`'
    }]);
  });

  test('check fonts expected in ./ but there is folder1/fonts', () => {
    const zip = new JSZip();
    zip.folder('folder1').folder('fonts');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['./'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-IncorrectPath',
      text: 'Каталог `fonts` расположен в `folder1`, а должен быть в каталоге `./`'
    }]);
  });

  test('check fonts expected in ./folder1 but there is folder2/fonts', () => {
    const zip = new JSZip();
    zip.folder('folder2').folder('fonts');

    const results = validateBemJsZip(zip,
      [(folder) => validateFolderExists(folder, 'fonts', ['folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-IncorrectPath',
      text: 'Каталог `fonts` расположен в `folder2`, а должен быть в каталоге `folder1`'
    }]);
  });
});
