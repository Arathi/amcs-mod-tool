import { ModLoaderType } from "@amcs/curseforge-api";
import { select } from "@inquirer/prompts";
import { ModLoader } from "../domains/mod-loader";

const DEFAULT_VERSIONS = [
  "1.21.1",
  "1.21",
  "1.20.6",
  "1.20.1",
  "1.18.2",
  "1.16.5",
];
const DEFAULT_VERSION = "1.20.1";

const DEFAULT_MOD_LOADERS = [
  ModLoaderType.Forge,
  ModLoaderType.Fabric,
  ModLoaderType.Quilt,
  ModLoaderType.NeoForge,
];

interface Choice<T = string> {
  name: string;
  value: T | undefined;
}

async function selectGameVersion(
  message: string,
  versions: string[] = DEFAULT_VERSIONS
): Promise<string> {
  const choices: Choice[] = [];
  versions.forEach((version) => {
    choices.push({
      name: `Minecraft ${version}`,
      value: version,
    });
  });
  const answer = await select({ message, choices, default: DEFAULT_VERSION });
  return answer ?? DEFAULT_VERSION;
}

async function selectModLoader(message: string): Promise<ModLoader> {
  const choices: Choice<ModLoader>[] = [
    {
      name: "Forge",
      value: ModLoader.Forge,
    },
    {
      name: "Fabric",
      value: ModLoader.Fabric,
    },
    {
      name: "Quilt",
      value: ModLoader.Quilt,
    },
    {
      name: "NeoForge",
      value: ModLoader.NeoForge,
    },
  ];
  const answer = await select({ message, choices, default: ModLoader.Forge });
  return answer ?? ModLoader.Forge;
}

export { selectGameVersion, selectModLoader };
