console.log('> Run webpack extra config');

const fs = require('fs');

// Using push form instead of the static webpack config (should be resolved with Angular 8)  
// see: https://github.com/meltedspark/angular-builders/issues/235
module.exports = (config, options) => {
  config.plugins.push({
    apply: (compiler) => {
      console.debug("> Relocate index.html and favicon.ico");
      compiler.hooks.afterEmit.tap('MyAfterEmitPlugin', (compilation) => {
        console.debug('Execute afterEmit hook');
        fs.renameSync('./dist/app/index.html', './dist/index.html');
        fs.renameSync('./dist/app/favicon.ico', './dist/favicon.ico');
      });
    }
  });
  return config;
};
