import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import cpdir from 'copy-dir';
import findUp from 'find-up';
import { version } from '../package.json';

import '@jswork/next-rw-json';

const program = new Command();
const RC_NAME = '.suwxrc';
const SAMPLE_RC = {
  packages: [
    {
      name: 'mind-ui-weapp',
      dist: 'miniprogram_dist',
      scope: 'mindui'
    }
  ]
};

program.version(version);

program
  .option('-c, --config <string>', 'config file path.', RC_NAME)
  .option('-i, --init', 'init config file.')
  .parse(process.argv);

export function cli() {
  const opts = program.opts();
  const configPath = findUp.sync(opts.config);

  // init
  if (opts.init) {
    if (fs.existsSync(configPath)) return console.log('🤡 config file exists, skip init.');
    return fs.writeFileSync(RC_NAME, JSON.stringify(SAMPLE_RC, null, 2));
  }

  // main
  if (!configPath) return console.log('😜 config file not found, please use -i to init.');
  const config = nx.RwJson.read(configPath);
  const pageJSON = nx.RwJson.read('src/pages.json');
  const usingComponents = nx.get(pageJSON, 'globalStyle.usingComponents', {});
  const packages = nx.get(config, 'packages', []);

  // rm src/wxcomponents
  if (fs.existsSync('src/wxcomponents')) {
    fs.rmSync('src/wxcomponents', { recursive: true, force: true });
  }

  // copy packages to wxcomponents:
  packages.forEach((item) => {
    nx.forIn(usingComponents, (key, value) => {
      // m-button: "/wxcomponents/mindui/button/index"
      const parts = value.split('/').filter(Boolean);
      const [wxcomponents, scope, component, index] = parts;
      const srcDir = path.join('node_modules', item.name, item.dist, component);
      const targetDir = path.join('src', wxcomponents, scope, component);

      // mkdir for target
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

      // force copy src to targetDir
      cpdir.sync(srcDir, targetDir, { cover: true });
    });
  });
}
