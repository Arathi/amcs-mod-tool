import Mod from "./mod";
import { ModLoader } from "./mod-loader";

export default interface Modpack {
  name: string;
  version: string;
  gameVersion: string;
  modLoader: ModLoader;
  mods: Record<string, Mod>;
}
