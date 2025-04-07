import fs from 'fs';
import path from 'path';

interface WriteFileData {
    [key: string]: any;
}

export const writeFile = async (pathName: string, data: WriteFileData): Promise<void> => {
    const dataToWrite = JSON.stringify(data);

    await fs.mkdir(
        path.dirname(pathName),
        { recursive: true },
        async function (err: NodeJS.ErrnoException | null) {
            await fs.writeFile(pathName, dataToWrite, (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    );
};

export const fileExists = (pathName: string): boolean => {
    return fs.existsSync(pathName);
};

interface ReadFileData {
    [key: string]: any;
}

export const readFile = async (pathName: string): Promise<ReadFileData> => {
  return new Promise<ReadFileData>((resolve, reject) => {
    fs.readFile(pathName, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(data));
    });
  });
};