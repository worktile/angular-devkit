import * as WebpackAssetsManifest from 'webpack-assets-manifest';
import { dependencies } from './externals';

export const buildConfig = function(options: { isDev?: boolean } = {}) {
    const webpackExtraConfig = {
        optimization: {
            runtimeChunk: false
        },
        externals: dependencies,
        devtool: options.isDev ? 'eval-source-map' : '',
        plugins: [new WebpackAssetsManifest()]
    };
    return webpackExtraConfig;
};
