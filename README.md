# NgcliIndexLocation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Build 

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.
This will output the following stucture:
```
|_ dist
    |_ index.html
    |_ favicon.ico
    |_ app/
        |_ main.js
        |_ styles.js
        |_ ...
```

## Serve development mode

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Serve production mode

Run `npm run serve:prod` for checking production build locally. Navigate to `http://localhost:4200/`.

## Key steps

* `npm i -D @angular-builders/custom-webpack`
* angular.json > projects > your-project-name > architect > build > replace `builder` value by:
  * `"builder": "@angular-builders/custom-webpack:browser"`
* angular.json > projects > your-project-name > architect > build > options > outputPath:
  * Prepend location with your subfolder, i.e. `"outputPath": "dist/app"`
* angular.json > projects > your-project-name > architect > build > options, add:
  ```
  "customWebpackConfig": { 
      "path": "./extra-webpack.config.js", 
      "replaceDuplicatePlugins": true 
  }`
  ```
* angular.json > projects > your-project-name > architect > build > configurations, add:
  ```
  "deployUrl": "app/",
  "baseHref": "",
  ```
* Create `extra-webpack.config.js` file at project root with the content below:
    ```
    const fs = require('fs');
    module.exports = (config, options) => {
        config.plugins.push({
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('MyAfterEmitPlugin', (compilation) => {
                    // Replace 'app' path below with your subfolder path
                    fs.renameSync('./dist/app/index.html', './dist/index.html');
                    fs.renameSync('./dist/app/favicon.ico', './dist/favicon.ico');
                });
            }
        });
        return config;
    };
  ```

