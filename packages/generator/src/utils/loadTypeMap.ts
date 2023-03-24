import { readFile } from 'fs/promises';

export async function loadTypeMap(
  fileName: string,
): Promise<Record<string, string>> {
  const content = await readFile(fileName, { encoding: 'utf8' });
  const data = JSON.parse(content);

  if (!isRecordStringString(data)) {
    throw new Error('Invalid type map');
  }

  return data;
}

function isRecordStringString(value: unknown): value is Record<string, string> {
  if (typeof value !== 'object' || !value) {
    return false;
  }

  for (const [key, v] of Object.entries(value)) {
    if (typeof key !== 'string' || typeof v !== 'string') {
      return false;
    }
  }

  return true;
}
