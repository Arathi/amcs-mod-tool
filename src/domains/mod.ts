import { Source } from "./source";

export interface FileMod {
  source: Source.File;
  id: string;
}

export interface CurseForgeMod {
  source: Source.CurseForge;
  id: number;
  version?: number;
}

export interface ModrinthMod {
  source: Source.Modrinth;
  id: string;
  version?: string;
}

type Mod = FileMod | CurseForgeMod | ModrinthMod;

export default Mod;
