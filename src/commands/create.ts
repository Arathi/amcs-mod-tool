import { Command } from "commander";
import { ModLoaderType } from "@amcs/curseforge-api";
import { parseModLoaderType } from "./parsers";
import { input } from "@inquirer/prompts";
import { selectGameVersion, selectModLoader } from "./select";
import { modTool } from "../utils/mod-tool";
import Modpack from "../domains/modpack";
import { ModLoader } from "../domains/mod-loader";

interface Options {
  name?: string;
  version?: string;
  gameVersion?: string;
  modLoader?: ModLoader;
}

const command = new Command("create")
  .option("-n, --name <name>", "整合包名称")
  .option("-v, --version <version>", "整合包版本")
  .option("-g, --game-version <minecraft>", "Minecraft版本")
  .option("-l, --mod-loader <loader>", "模组加载器", (value) =>
    parseModLoaderType(value)
  )
  .action(action);

async function action(options: Options) {
  console.info("选项：", options);
  let { name, version, gameVersion, modLoader } = options;

  if (name === undefined) {
    name = await input({
      message: "请输入整合包名称",
      default: `modpack-${new Date().valueOf()}`,
    });
  }

  if (version === undefined) {
    version = await input({
      message: "请输入整合包版本：",
      default: "1.0.0",
    });
  }

  if (gameVersion === undefined) {
    gameVersion = await selectGameVersion("请选择Minecraft版本");
  }

  if (modLoader === undefined) {
    modLoader = await selectModLoader("请选择模组加载器");
  }

  const modpack: Modpack = {
    name,
    version,
    gameVersion,
    modLoader,
    mods: {},
  };
  modTool.saveModpack(modpack);
}

export default command;
