import { rename, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const renameFile = async () => {
  const oldPath = path.resolve('files/wrongFilename.txt');
  const newPath = path.resolve('files/properFilename.md');

  try {
    await access(oldPath, constants.F_OK);
    await access(newPath, constants.F_OK);
    // оба файла существуют — ошибка
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await rename(oldPath, newPath);
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await renameFile();