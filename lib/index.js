import { Command } from 'commander';
import { version } from '../package.json';

const program = new Command();
program.version(version);

program
  .option('-c, --config <string>', 'config file path.', '.suwxrc')
  .parse(process.argv);

export function cli() {
  const opts = program.opts();
  console.log('hello cli: ', opts);
}
