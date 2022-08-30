import JSZip from 'jszip';
import { validateBemJsZip } from '../../validate-bem';
import { validateFileExists } from './validate-file-exists';

function validateZipTestHelper(zip) {
  return validateBemJsZip(zip,
    [(folder) => validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'test')]
  );
  // return validateBemJsZip(zip, []);
  //return validateFontsCss(createFolderFromJSZip(zip), 'fonts.css', ['./vendor', './vendor/fonts']);
}

describe('Passed file checks', () => {
  test('check fonts.css in vendor', () => {
    const zip = new JSZip();
    zip.folder('vendor').file('fonts.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([]);
  });

  test('check fonts.css in vendor/fonts', () => {
    const zip = new JSZip();
    zip.folder('vendor').folder('fonts').file('fonts.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([]);
  });

  test('check file1.css expected in ./', () => {
    const zip = new JSZip();
    zip.file('file1.css', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./'], 'validator1')]
    );

    expect(results).toEqual([]);
  });

  test('check README.md expected in ./', () => {
    const zip = new JSZip();
    zip.file('README.md', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'readme.md', ['./'], 'validator1', true)]
    );

    expect(results).toEqual([]);
  });
});

describe('Failed file checks', () => {
  test('check file1.css expected in ./ but there is no file', () => {
    const zip = new JSZip();

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-NotFound',
      text: 'Нет файла `file1.css`, он должен быть в каталоге `./`'
    }]);
  });

  test('check file1.css expected in ./ but file in folder', () => {
    const zip = new JSZip();
    zip.folder('folder1').file('file1.css', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-IncorrectPath',
      text: 'Файл `folder1/file1.css` должен быть в каталоге `./`'
    }]);
  });

  test('check NotFound message for one folder', () => {
    const zip = new JSZip();

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-NotFound',
      text: 'Нет файла `file1.css`, он должен быть в каталоге `./folder1`'
    }]);
  });

  test('check IncorrectPath message for one folder', () => {
    const zip = new JSZip();
    zip.file('file1.css', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-IncorrectPath',
      text: 'Файл `file1.css` должен быть в каталоге `./folder1`'
    }]);
  });

  test('check SeveralFiles message for one folder', () => {
    const zip = new JSZip();
    zip.folder('folder1').file('file1.css', '');
    zip.folder('folder2').file('file1.css', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'file1.css', ['./folder2'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-SeveralFiles',
      text: 'Есть несколько `file1.css` файлов: `folder1/file1.css`,`folder2/file1.css`. ' +
        'Файл `file1.css` должен быть один в каталоге `./folder2`'
    }]);
  });

  test('fail if no fonts.css in empty jszip', () => {
    const zip = new JSZip();

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([{
      code: "test-NotFound",
      text: 'Нет файла `fonts.css`, он должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if no fonts.css in jszip with folder/files', () => {
    const zip = new JSZip();
    zip.folder('emptyFolder')
    zip.folder('nonEmptyFolder').file('qwe1.css', '');
    zip.file('qwe2.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([{
      code: "test-NotFound",
      text: 'Нет файла `fonts.css`, он должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in root', () => {
    const zip = new JSZip();
    zip.file('fonts.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([{
      code: "test-IncorrectPath",
      text: 'Файл `fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if FoNtS.cSs exists but fonts.css expected', () => {
    const zip = new JSZip();
    zip.folder('folder1').file('FoNtS.cSs', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'fonts.css', ['folder1'], 'validator1')]
    );

    expect(results).toEqual([{
      code: 'validator1-IncorrectCaseInFileName',
      text: 'Файл `folder1/FoNtS.cSs` должен иметь название `fonts.css`'
    }]);
  });

  test('fail if fonts.css in otherFolder', () => {
    const zip = new JSZip();
    zip.folder('otherFolder').file('fonts.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([{
      code: "test-IncorrectPath",
      text: 'Файл `otherFolder/fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in otherFolder/otherFolder2', () => {
    const zip = new JSZip();
    zip.folder('otherFolder').folder('otherFolder2').file('fonts.css', '');

    const results = validateBemJsZip(zip,
      [(folder) => validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'test')]
    );

    expect(results).toEqual([{
      code: "test-IncorrectPath",
      text: 'Файл `otherFolder/otherFolder2/fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in otherFolder and vendor/fonts', () => {
    const zip = new JSZip();
    zip.folder('vendor').folder('fonts').file('fonts.css', '');
    zip.folder('otherFolder').file('fonts.css', '');

    const results = validateZipTestHelper(zip);

    expect(results).toEqual([{
      code: "test-SeveralFiles",
      text: 'Есть несколько `fonts.css` файлов: `vendor/fonts/fonts.css`,`otherFolder/fonts.css`. Файл `fonts.css` должен быть один в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });
});
