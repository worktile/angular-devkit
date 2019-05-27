# Angular Devkit for Worktile

## Installation
```
npm i @worktile/angular-devkit --save
```

## Webpack

1. Add webpack-extra.config file;
2. change build's "builder" to "@angular-builders/custom-webpack:browser"
```
      "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack-extra.config.js",
              "mergeStrategies": { "module.rules": "prepend" },
              "replaceDuplicatePlugins": true
            },
            "vendorChunk": false
            ...
        }
```
3. change serve's "builder" to "@angular-builders/dev-server:generic
```
       "builder": "@angular-builders/dev-server:generic",
          "options": {
            "browserTarget": "demo:build-webpack"
        },
```

## gulp theme
