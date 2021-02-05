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

3. change serve's "builder" to "@angular-builders/custom-webpack:dev-server"

```
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "browserTarget": "demo:build-webpack"
        },
```

## Proxy

#### Build proxy config for portal

```
const proxy = require('@worktile/angular-devkit/proxy');
const config = proxy.buildProxyConfig({
    localApiServeApps: [], // 设置指定App使用本地API服务，默认使用live环境服务
    localStaticApps: [] // 设置指定App使用本地静态资源，默认使用live环境资源
});
module.exports = config;

```

#### Build proxy config for sub app

```
const proxy = require('@worktile/angular-devkit/proxy');
const config = proxy.buildAppProxyConfig('agile',{
  port: 11000,
  apiPort:11001,
  apiServer: 'local'  // 配置apiServer环境,可选 'local' | 'live'
});
module.exports = config;

```

<!-- ## gulp theme -->
