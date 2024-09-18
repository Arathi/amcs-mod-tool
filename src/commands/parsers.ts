import { ModLoaderType } from "@amcs/curseforge-api";
import { Source } from "../domains/source";

export function parseModLoaderType(
  name?: string,
  defaultValue: ModLoaderType | undefined = undefined
): ModLoaderType | undefined {
  if (name === undefined) return defaultValue;
  const lower = name.toLowerCase();
  switch (lower) {
    case "forge":
      return ModLoaderType.Forge;
    case "fabric":
      return ModLoaderType.Fabric;
    case "quilt":
      return ModLoaderType.Quilt;
    case "neoforge":
    case "neo-forge":
      return ModLoaderType.NeoForge;
  }
  return defaultValue;
}

export function parseNumber(
  str?: string,
  defaultValue?: number
): number | undefined {
  if (str === undefined) return defaultValue;
  const trimmed = str.trim().replace(",", "").replace("_", "");
  if (trimmed.length === 0) return defaultValue;
  const value = parseInt(trimmed);
  if (isNaN(value)) return defaultValue;
  return value;
}

export function parseSource(
  name?: string,
  defaultValue: Source | undefined = undefined
): Source | undefined {
  if (name === undefined) return defaultValue;
  const lower = name.toLowerCase();
  switch (lower) {
    case "file":
      return Source.File;
    case "curseforge":
      return Source.CurseForge;
    case "modrinth":
      return Source.Modrinth;
  }
  return defaultValue;
}
