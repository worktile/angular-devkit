interface AppConfig {
    port: number;
    apiPort?: number;
    apiName?: string;
}

interface AppServeConfig {
    apiPort?: number;
    apiName?: string;
}

interface BuildProxyConfigBaseOptions {
    targetDomain?: string;
    rootDomains?: string[];
    secondaryDomains?: string[];
}

interface BuildProxyConfigOptions extends BuildProxyConfigBaseOptions {
    localStaticApps?: string[];
    localApiServerApps?: string[];
}
interface BuildAppProxyConfigOptions extends AppConfig, BuildProxyConfigBaseOptions {
    apiServer: 'local' | 'live';
}

const defaultBuildProxyConfigOptions: BuildProxyConfigOptions = {
    targetDomain: 'pingcode.live',
    rootDomains: ['pingcode.local', 'worktile.local'],
    secondaryDomains: ['at'],
    localStaticApps: [],
    localApiServerApps: [],
};

const apps = {
    agile: {
        port: 11000,
        apiPort: 11001,
    },
    pipe: {
        port: 12000,
        apiPort: 12001,
        apiName: 'pipeline',
    },
    testhub: {
        port: 13000,
        apiPort: 13001,
    },
    trace: {
        port: 14000,
        apiPort: 14001,
        apiName: 'tracking',
    },
    wiki: {
        port: 15000,
        apiPort: 15001,
    },
    plan: {
        port: 16000,
        apiPort: 16001,
    },
    goals: {
        port: 17000,
        apiPort: 17001,
    },
    flow: {
        port: 18000,
        apiPort: 18001,
    },
    admin: {
        port: 10001,
    },
};

const servers = {
    typhon: {
        apiPort: 10010,
    },
    ladon: {
        apiPort: 10030,
    },
    marketplace: {
        apiPort: 10021,
    },
    'open/admin': {
        apiPort: 30001,
    },
};

class ProxyConfigBuilder {
    private apps: { [key: string]: AppConfig };
    private servers: { [key: string]: AppServeConfig };

    constructor() {
        this.apps = apps;
        this.servers = servers;
    }

    setApps(apps: { [key: string]: AppConfig }, shouldMerge?: boolean): void {
        if (shouldMerge) {
            Object.assign(this.apps, apps);
        } else {
            this.apps = apps;
        }
    }

    buildProxyConfig(options: BuildProxyConfigOptions = {}): any {
        options = Object.assign({}, defaultBuildProxyConfigOptions, options);
        const rootDomains = options.rootDomains;
        const secondaryDomains = options.secondaryDomains;
        const portalPort = 10000;
        const PROXY_CONFIG = {};

        rootDomains.forEach((rootDomain) => {
            secondaryDomains.forEach((domain) => {
                const localOriginWithoutPort = `http://${domain}.${rootDomain}`;
                const portalOrigin = `${localOriginWithoutPort}:${portalPort}`;
                (options.localStaticApps || []).forEach((name) => {
                    const app = this.apps[name];
                    if (app) {
                        PROXY_CONFIG[`${portalOrigin}/static/${name}`] = {
                            target: `${localOriginWithoutPort}:${app.port}`,
                            pathRewrite: { [`^/static/${name}`]: '' },
                            secure: false,
                            changeOrigin: false,
                        };
                    } else {
                        throw new Error(
                            `${name} not found, please select the configured apps [${Object.keys(this.apps).join(',')}]`
                        );
                    }
                });
                (options.localApiServerApps || []).forEach((name) => {
                    const app = this.apps[name] || this.servers[name];
                    if (app && app.apiPort) {
                        PROXY_CONFIG[`${portalOrigin}/api/${app.apiName || name}`] = {
                            target: `${localOriginWithoutPort}:${app.apiPort}`,
                            secure: false,
                            changeOrigin: false,
                        };
                    } else {
                        const appsStr = Object.keys({ ...this.apps, ...this.servers }).join(',');
                        throw new Error(`${name} not found, please select the configured apps [${appsStr}]`);
                    }
                });

                PROXY_CONFIG[`${portalOrigin}/api`] = {
                    target: `http://${domain}.${options.targetDomain}`,
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api',
                    },
                    cookieDomainRewrite: `${domain}.${rootDomain}`,
                };

                PROXY_CONFIG[`${portalOrigin}/static`] = {
                    target: `http://${domain}.${options.targetDomain}`,
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/static': '/static',
                    }
                };
            });
        });
        return PROXY_CONFIG;
    }

    buildAppProxyConfig(appName: string, options: BuildAppProxyConfigOptions) {
        this.setApps({
            [appName]: {
                port: options.port,
                apiPort: options.apiPort,
                apiName: options.apiName,
            },
        });

        return this.buildProxyConfig({
            targetDomain: options.targetDomain || defaultBuildProxyConfigOptions.targetDomain,
            rootDomains: options.rootDomains || defaultBuildProxyConfigOptions.rootDomains,
            secondaryDomains: options.secondaryDomains || defaultBuildProxyConfigOptions.secondaryDomains,
            localStaticApps: [appName],
            localApiServerApps: options.apiServer === 'local' ? [appName] : [],
        });
    }
}

const proxyBuilder = new ProxyConfigBuilder();

export default proxyBuilder;

module.exports = proxyBuilder;
