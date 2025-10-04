import fs from 'node:fs';

export const extractCodeFromFilePath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return fileContent;
};
