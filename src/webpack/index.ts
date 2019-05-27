import { buildConfig } from './config';
import { angularDependencies, wtDependencies } from './externals';

const env = process.env.NODE_ENV;
const isDev = !env || env === 'development';

module.exports = {
    env: env,
    isDev: isDev,
    isProd: env === 'production',
    isIndependence: env === 'independence',
    webpackExtraConfig: buildConfig({
        isDev: isDev
    }),
    angularDependencies,
    wtDependencies
};
