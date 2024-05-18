import fs from "fs";
import path from "path";


export function listFilesSync(pathToFolder: string): Array<string> {
  return  fs.readdirSync(path.join(__dirname, "../../", pathToFolder));
}

export function readFileSync(pathToFile: string): Buffer {
  return fs.readFileSync(path.join(__dirname, "../../", pathToFile));
}

export function bufferToJson(buffer: Buffer): JSON {
  return JSON.parse(buffer.toString());
}