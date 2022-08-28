import { runChecks } from './bem-checker';

function runFontPathChecks(folderItems) {
  return runChecks(folderItems, { 'fonts.css': { path: true } });
}

describe('Passed fonts checks', () => {
  test('pass if fonts.css in vendor', () => {
    const folderItems = {
      'vendor': {
        'fonts.css': ""
      }
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(0);
  });

  test('pass if fonts.css in vendor/fonts', () => {
    const folderItems = {
      'vendor': {
        'fonts': {
          'fonts.css': ""
        }
      }
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(0);
  });
});

describe('Failed fonts check', () => {
  const fontsCssFileWasNotFoundMessage = '`fonts.css` файл должен быть в одном из каталогов: `vendor`,`vendor/fonts`';

  test('fail if no fonts.css', () => {
    const folderItems = {
      'emptyFolder': {},
      'nonEmptyFolder': {
        'qwe.css': ""
      },
      'qwe.css': ""
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(fontsCssFileWasNotFoundMessage);
  });

  test('fail if fonts.css in root', () => {
    const folderItems = {
      'fonts.css': ""
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(fontsCssFileWasNotFoundMessage);
  });

  test('fail if fonts.css in otherFolder', () => {
    const folderItems = {
      'otherFolder': {
        'fonts.css': ""
      }
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(fontsCssFileWasNotFoundMessage);
  });

  test('fail if fonts.css in otherFolder/otherFolder2', () => {
    const folderItems = {
      'otherFolder': {
        'otherFolder2': {
          'fonts.css': ""
        }
      }
    };

    const results = runFontPathChecks(folderItems);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(fontsCssFileWasNotFoundMessage);
  });

  // test('fail if fonts.css in otherFolder and vendor/fonts', () => {
  //   const folderItems = {
  //     'vendor': {
  //       'fonts': {
  //         'fonts.css': ""
  //       }
  //     },
  //     'otherFolder': {
  //       'fonts.css': ""
  //     }
  //   };

  //   const results = runFontPathChecks(folderItems);
  //   expect(results.length).toBe(1);
  //   expect(results[0].message).toBe('`fonts.css` file is expected in folders `vendor`,`vendor/fonts` but was not found');
  // });
});
