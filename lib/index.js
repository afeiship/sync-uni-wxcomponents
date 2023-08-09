import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import findUp from 'find-up';
import fu from '@jswork/fileutils';

import { version } from '../package.json';
import '@jswork/next-rw-json';

const cwd = process.cwd();
const program = new Command();
const RC_NAME = '.suwxrc';
const SAMPLE_RC = nx.RwJson.read(path.join(cwd, '.suwxrc'));
const APP_MSGS = {
  config_exists: '🤡 config file exists, skip init.',
  config_not_found: '😜 config file not found, please use -i to init.'
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
    if (fs.existsSync(configPath)) return console.log(APP_MSGS.config_exists);
    return fs.writeFileSync(RC_NAME, JSON.stringify(SAMPLE_RC, null, 2));
  }

  // main
  if (!configPath) return console.log(config_not_found);
  const config = nx.RwJson.read(configPath);
  const pageJSON = nx.RwJson.read(nx.get(config, 'app.page'));
  const wxcmps = nx.get(config, 'app.wxcomponents');
  const usingComponents = nx.get(pageJSON, 'globalStyle.usingComponents', {});
  const packages = nx.get(config, 'packages', []);

  // rm src/wxcomponents
  fu.mkdir_p(wxcmps);

  // copy packages to wxcomponents:
  packages.forEach((item) => {
    nx.forIn(usingComponents, (_, value) => {
      // m-button: "/wxcomponents/mindui/button/index" --> [wxcomponents,mindui,button]
      // a7-tag: "/wxcomponents/antui/lib/tag/index" --> [wxcomponents,antui/lib,tag]
      const parts = value.split('/').filter(Boolean);
      const [wxcomponents, scope, ...cmpPaths] = parts;
      const component = cmpPaths.slice(0, -1).join('/');
      const srcDir = path.join('node_modules', item.name, item.dist, component);
      const targetDir = path.join('src', wxcomponents, scope, component);

      // mkdir for target
      fu.mkdir_p(targetDir);

      // force copy src to targetDir
      fu.cp_r(srcDir, targetDir, { forceClean: true });
    });
  });
}
