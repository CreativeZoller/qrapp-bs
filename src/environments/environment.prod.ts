declare var require: any;

export const environment = {
  production: true,
  animal: '🐔',
  appName: require('./../../package.json').title,
  appCode: require('./../../package.json').name,
  appVersion: require('./../../package.json').version
};
