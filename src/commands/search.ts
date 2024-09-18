import { Command } from "commander";
import { parseSource } from "./parsers";
import { Source } from "../domains/source";
import curseforge from "../utils/curseforge-client";
import Mod, { CurseForgeMod } from "../domains/mod";
import { ModLoaderType } from "@amcs/curseforge-api";
import { ModLoader } from "../domains/mod-loader";
import { modTool } from "../utils/mod-tool";

interface Options {
  source?: Source;
  slug?: boolean;
}

const command = new Command("search")
  .argument("[keyword]", "关键字")
  .option("--source <source>", "模组来源", (value) => parseSource(value))
  .option("--slug", "使用slug")
  .action(action);

async function action(keyword: string | undefined, options: Options) {
  console.info("关键字：", keyword);
  console.info("选项：", options);
  const { source = Source.CurseForge, slug: useSlug = false } = options;
  switch (source) {
    case Source.File:
      searchFromFile();
      break;
    case Source.CurseForge:
      searchFromCurseForge(keyword);
      break;
    case Source.Modrinth:
      searchFromModrinth();
      break;
  }
}

async function searchFromFile() {
  console.warn("无法搜索File");
}

async function searchFromCurseForge(
  keyword: string | undefined,
  useSlug: boolean = false
): Promise<CurseForgeMod[]> {
  const modpack = await modTool.loadModpack();

  let searchFilter: string | undefined = undefined;
  let slug: string | undefined = undefined;
  if (useSlug) {
    slug = keyword;
  } else {
    searchFilter = keyword;
  }

  const gameVersion = modpack.gameVersion;
  let modLoaderType: ModLoaderType | undefined = undefined;
  switch (modpack.modLoader) {
    case ModLoader.Forge:
      modLoaderType = ModLoaderType.Forge;
      break;
    case ModLoader.Fabric:
      modLoaderType = ModLoaderType.Fabric;
      break;
    case ModLoader.Quilt:
      modLoaderType = ModLoaderType.Quilt;
      break;
    case ModLoader.NeoForge:
      modLoaderType = ModLoaderType.NeoForge;
      break;
  }

  const searchResp = await curseforge.searchMods({
    gameVersion,
    searchFilter,
    modLoaderType,
    slug,
  });

  const mods = searchResp.data.map((data) => {
    return {
      source: Source.CurseForge,
      id: data.id,
    } as CurseForgeMod;
  });

  return mods;
}

async function searchFromModrinth() {
  console.warn("无法搜索Modrinth");
}

export default command;
