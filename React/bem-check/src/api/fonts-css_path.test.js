import { runChecksFromJsZip } from './bem-checker';
import JSZip from 'jszip';
import { errorCodes } from './bem-checker/error-codes';

function runFontPathChecks(zip) {
  return runChecksFromJsZip(zip, { 'fonts.css': { path: true } });
}

describe('Passed fonts checks', () => {
  test('pass if fonts.css in vendor', () => {
    const zip = new JSZip();
    zip.folder('vendor').file('fonts.css', '');

    const results = runFontPathChecks(zip);
    expect(results).toEqual([]);
  });

  test('pass if fonts.css in vendor/fonts', () => {
    const zip = new JSZip();
    zip.folder('vendor').folder('fonts').file('fonts.css', '');

    const results = runFontPathChecks(zip);
    expect(results).toEqual([]);
  });
});

describe('Failed fonts check', () => {
  test('fail if no fonts.css in empty jszip', () => {
    const zip = new JSZip();

    const results = runFontPathChecks(zip);
    expect(results.length).toBe(1);
    expect(results[0]).toEqual({
      code: errorCodes.FontsCssFile_NotFound,
      message: 'Нет файла `fonts.css`, он должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    });
  });

  test('fail if no fonts.css in jszip with folder/files', () => {
    const zip = new JSZip();
    zip.folder('emptyFolder')
    zip.folder('nonEmptyFolder').file('qwe1.css', '');
    zip.file('qwe2.css', '');

    const results = runFontPathChecks(zip);
    expect(results.length).toBe(1);
    expect(results[0]).toEqual({
      code: errorCodes.FontsCssFile_NotFound,
      message: 'Нет файла `fonts.css`, он должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    });
  });

  test('fail if fonts.css in root', () => {
    const zip = new JSZip();
    zip.file('fonts.css', '');

    const results = runFontPathChecks(zip);

    expect(results).toEqual([{
      code: errorCodes.FontsCssFile_IncorrectPath,
      message: 'Файл `fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in otherFolder', () => {
    const zip = new JSZip();
    zip.folder('otherFolder').file('fonts.css', '');

    const results = runFontPathChecks(zip);
    expect(results).toEqual([{
      code: errorCodes.FontsCssFile_IncorrectPath,
      message: 'Файл `otherFolder/fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in otherFolder/otherFolder2', () => {
    const zip = new JSZip();
    zip.folder('otherFolder').folder('otherFolder2').file('fonts.css', '');

    const results = runFontPathChecks(zip);
    expect(results).toEqual([{
      code: errorCodes.FontsCssFile_IncorrectPath,
      message: 'Файл `otherFolder/otherFolder2/fonts.css` должен быть в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });

  test('fail if fonts.css in otherFolder and vendor/fonts', () => {
    const zip = new JSZip();
    zip.folder('vendor').folder('fonts').file('fonts.css', '');
    zip.folder('otherFolder').file('fonts.css', '');

    const results = runFontPathChecks(zip);
    expect(results).toEqual([{
      code: errorCodes.FontsCssFile_SeveralFiles,
      message: 'Есть несколько `fonts.css` файлов: `vendor/fonts/fonts.css`,`otherFolder/fonts.css`. Файл `fonts.css` должен быть один в одном из каталогов: `./vendor`,`./vendor/fonts`'
    }]);
  });
});
