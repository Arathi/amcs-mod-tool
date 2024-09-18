import { readFile, writeFile, access, stat } from "node:fs/promises";
import Modpack from "../domains/modpack";
import { resolve } from "node:path";

const CWD = process.cwd();
const HOME = process.env.HOME || process.env.USERPROFILE;

class ModTool {
  get dataPath(): string {
    if (HOME === undefined) {
      throw new Error("无法获取到HOME目录");
    }
    return resolve(HOME, "data");
  }

  get modpackPath(): string {
    return resolve(CWD, "modpack.json");
  }

  async loadModpack(): Promise<Modpack> {
    return await this.load<Modpack>(this.modpackPath);
  }

  async saveModpack(modpack: Modpack) {
    const content = JSON.stringify(modpack, undefined, "  ");
    writeFile(this.modpackPath, content);
  }

  async load<T>(path: string): Promise<T> {
    try {
      console.info(`正在读取文件：`, path);
      const content = await readFile(path, { encoding: "utf-8" });
      const json = JSON.parse(content) as T;
      return json;
    } catch (ex) {
      throw new Error(`文件加载失败：${path}`);
    }
  }
}

export default ModTool;

const modTool = new ModTool();

export { modTool };
