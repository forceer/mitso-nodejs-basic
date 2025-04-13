
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// эмуляция __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath);
  stream.pipe(process.stdout);
};

await read();
