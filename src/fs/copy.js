import { cp, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const copy = async () => {
  const src = path.resolve('files');
  const dest = path.resolve('files_copy');

  try {
    await access(src, constants.F_OK);
    await access(dest, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await cp(src, dest, { recursive: true });
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await copy();
