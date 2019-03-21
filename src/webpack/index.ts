import * as WebpackAssetsManifest from 'webpack-assets-manifest';

const env = process.env.NODE_ENV;
const isDev = !env || env === 'development';

const webpackExtraConfig = {
    optimization: {
        runtimeChunk: false
    },
    externals: {
        jquery: 'jQuery',
        moment: 'moment',
        lodash: '_',
        angular: 'angular',
        rxjs: 'rxjs',
        'rxjs/operators': 'rxjs.operators'
    },
    devtool: isDev ? 'eval-source-map' : '',
    plugins: [new WebpackAssetsManifest()]
};

module.exports = {
    env: env,
    isDev: isDev,
    isProd: env === 'production',
    isIndependence: env === 'independence',
    webpackExtraConfig: webpackExtraConfig
};
