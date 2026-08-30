import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONSTANTS = {
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
  ALLOWED_FIELDS: [
    'model',
    'brand',
    'productionYear',
    'ramSize',
    'processor',
    'screenDiagonal',
    'hasNfc',
    'color',
  ],
};
