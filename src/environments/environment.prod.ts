declare let require: any;
const { version: appVersion, commit: commit } = require('../../package.json');

export const environment = {
  appVersion,
  commit,
  configPath: 'assets/config/config.json',
  production: true,
};
