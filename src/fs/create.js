import { writeFile } from 'fs/promises';
import { access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const create = async () => {
  const filePath = path.resolve('src/fs/files/fresh.txt');

  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch {
    // Файл не существует — создаём
    await writeFile(filePath, 'I am fresh and young', 'utf8');
  }
};

await create();
