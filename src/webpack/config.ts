import * as WebpackAssetsManifest from 'webpack-assets-manifest';

export const buildConfig = function(options: { isDev?: boolean } = {}) {
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
        devtool: options.isDev ? 'eval-source-map' : '',
        plugins: [new WebpackAssetsManifest()]
    };
    return webpackExtraConfig;
};
