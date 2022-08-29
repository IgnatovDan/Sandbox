import JSZip from 'jszip';
import { convertFromJSZipContent } from './convert-from-jszip-files';

test('convert empty', () => {
  const zip = new JSZip();

  const actual = convertFromJSZipContent({ files: zip.files });

  // expect(actual.files).toEqual([]);
  // expect(actual.folders).toEqual([]);
  expect(Object.getOwnPropertyNames(actual)).toEqual([]);
});

test('convert file1.txt', () => {
  const zip = new JSZip();
  zip.file('file1.txt', '');

  const actual = convertFromJSZipContent({ files: zip.files });

  expect(Object.getOwnPropertyNames(actual)).toEqual(['file1.txt']);
  expect(actual['file1.txt']).not.toBeUndefined();
});

test('convert [file1.txt, file2.txt]', () => {
  const zip = new JSZip();
  zip.file('file1.txt', '');
  zip.file('file2.txt', '');
  
  const actual = convertFromJSZipContent({ files: zip.files });

  expect(Object.getOwnPropertyNames(actual)).toEqual(['file1.txt', 'file2.txt']);
  expect(actual['file1.txt']).not.toBeUndefined();
  expect(actual['file2.txt']).not.toBeUndefined();
});

test('convert folder1', () => {
  const zip = new JSZip();
  zip.folder('folder1');
  
  const actual = convertFromJSZipContent({ files: zip.files });

  expect(Object.getOwnPropertyNames(actual)).toEqual(['folder1']);
  expect(actual['folder1']).not.toBeUndefined();
});

test('convert folder1/file1.txt', () => {
  const zip = new JSZip();
  zip.folder('folder1').file('file1.txt', '');
  
  const actual = convertFromJSZipContent({ files: zip.files });

  expect(Object.getOwnPropertyNames(actual)).toEqual(['folder1']);
  expect(actual['folder1']).not.toBeUndefined();

  expect(Object.getOwnPropertyNames(actual['folder1'])).toEqual(['file1.txt']);
  expect(actual['folder1']['file1.txt']).not.toBeUndefined();
});

test('convert folder1/[file1.txt, file2.txt]', () => {
  const zip = new JSZip();
  zip.folder('folder1').file('file1.txt', '');
  zip.folder('folder1').file('file2.txt', '');
  
  const actual = convertFromJSZipContent({ files: zip.files });

  expect(Object.getOwnPropertyNames(actual)).toEqual(['folder1']);

  expect(actual['folder1']).not.toBeUndefined();
  expect(Object.getOwnPropertyNames(actual['folder1'])).toEqual(['file1.txt', 'file2.txt']);

  expect(actual['folder1']['file1.txt']).not.toBeUndefined();
  expect(actual['folder1']['file2.txt']).not.toBeUndefined();
});
