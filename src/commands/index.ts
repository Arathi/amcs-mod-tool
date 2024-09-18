import { Command } from "commander";
import { version } from "../../package.json";
import create from "./create";
import search from "./search";
import add from "./add";
import update from "./update";
import remove from "./remove";

const command = new Command("mod-tool")
  .description("Avalon Mod Tool")
  .version(version);

command.addCommand(create);
command.addCommand(search);
command.addCommand(add);
command.addCommand(update);
command.addCommand(remove);

export default command;
