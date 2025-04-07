import { fileExists, readFile, writeFile } from './file';
import path from 'path';

export const getCachePath = (id: string): string => {
  const pathName = `./build/cache/${id}.json`;

  return path.resolve(process.cwd(), pathName);
};

export const fetchWithCache = async (id: string, req: RequestInfo): Promise<any> => {
  const pathName = getCachePath(id);

  if (await fileExists(pathName)) {
    return await readFile(pathName);
  } else {
    let res = await fetch(req);
    let result = await res.json();

    await writeFile(pathName, result);

    return result;
  }
};

export const fetchGitHubUser = async (username: string): Promise<any> => {
  const url = `https://api.github.com/users/${username}`;

  return await fetchWithCache(`github-users/${username}`, url);
};