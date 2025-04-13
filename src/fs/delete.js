import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const remove = async () => {
  const filePath = path.resolve('files/fileToRemove.txt');

  try {
    await access(filePath, constants.F_OK);
    await unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();
