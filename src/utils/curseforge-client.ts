import { CurseForgeClient } from "@amcs/curseforge-api";

const apiKey = process.env.CURSE_FORGE_API_KEY ?? "";

const client = new CurseForgeClient(apiKey);

export default client;
