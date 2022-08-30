import JSZip from 'jszip';
import { convertFromJSZip } from './convert-from-jszip';

describe('convertFromJSZip tests', () => {
  test('convert empty', () => {
    const zip = new JSZip();

    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual([]);
    expect(Object.keys(actual.folders)).toEqual([]);
  });

  test('convert file1.txt', () => {
    const zip = new JSZip();
    zip.file('file1.txt', '');

    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual(['file1.txt']);
    expect(actual.files['file1.txt'].name).toBe('file1.txt');

    expect(Object.keys(actual.folders)).toEqual([]);
  });

  test('convert [file1.txt, file2.txt]', () => {
    const zip = new JSZip();
    zip.file('file1.txt', '');
    zip.file('file2.txt', '');
  
    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual(['file1.txt', 'file2.txt']);
    expect(actual.files['file1.txt'].name).toBe('file1.txt');
    expect(actual.files['file2.txt'].name).toBe('file2.txt');

    expect(Object.keys(actual.folders)).toEqual([]);
  });

  test('convert folder1', () => {
    const zip = new JSZip();
    zip.folder('folder1');
  
    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual([]);

    expect(Object.keys(actual.folders)).toEqual(['folder1']);
    expect(actual.folders['folder1'].name).toBe('folder1');
  });

  test('convert folder1/file1.txt', () => {
    const zip = new JSZip();
    zip.folder('folder1').file('file1.txt', '');
  
    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual([]);
    expect(Object.keys(actual.folders)).toEqual(['folder1']);

    expect(Object.keys(actual.folders['folder1'].files)).toEqual(['file1.txt']);
    expect(actual.folders['folder1'].files['file1.txt'].name).toBe('file1.txt');
  });

  test('convert folder1/[file1.txt, file2.txt]', () => {
    const zip = new JSZip();
    zip.folder('folder1').file('file1.txt', '');
    zip.folder('folder1').file('file2.txt', '');
  
    const actual = convertFromJSZip({ files: zip.files });

    expect(Object.keys(actual.files)).toEqual([]);
    expect(Object.keys(actual.folders)).toEqual(['folder1']);

    expect(Object.keys(actual.folders['folder1'].folders)).toEqual([]);
    expect(Object.keys(actual.folders['folder1'].files)).toEqual(['file1.txt', 'file2.txt']);
    expect(actual.folders['folder1'].files['file1.txt']).toEqual({ name: 'file1.txt' });
    expect(actual.folders['folder1'].files['file2.txt'].name).toBe('file2.txt');
  });
});
