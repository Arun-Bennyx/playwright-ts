import * as fs from "fs";
import path from "path";

const cache = new Map<string, unknown>();

export function loadTestData<T>(fileName: string): T {
  const env = process.env.ENV;
  const cacheKey = `${fileName}:${env || "default"}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T;
  }

  const dataDir = path.join(process.cwd(), "test-data");

  if (env) {
    const envFilePath = path.join(dataDir, `${fileName}.${env}.json`);
    if (fs.existsSync(envFilePath)) {
      const data = JSON.parse(fs.readFileSync(envFilePath, "utf-8"));
      cache.set(cacheKey, data);
      return data;
    }
  }

  const defaultFilePath = path.join(dataDir, `${fileName}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(defaultFilePath, "utf-8"));
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(`Failed to load test data: ${defaultFilePath}\n${error}`);
  }
}
