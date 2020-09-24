interface BuildProxyConfigOptions {
    portalPort?: number;
    rootDomains?: string[];
    secondaryDomains?: string[];
    domainIteratee?: (domain: string, proxyConfig: { [key: string]: any }) => void;
}

const defaultBuildProxyConfigOptions: BuildProxyConfigOptions = {
    portalPort: 10000,
    rootDomains: ['pingcode.local', 'worktile.local'],
    secondaryDomains: ['at', 'yctech'],
    domainIteratee: () => {},
};

interface ProxySubApplicationOptions {
    port: number;
    apiPort: number;
    apiName?: string;
}

class ProxyConfigBuilder {
    private apps: { [key: string]: ProxySubApplicationOptions };

    constructor() {
        this.apps = {
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
            okr: {
                port: 17000,
                apiPort: 17001,
            },
        };
    }

    setProxySubApps(apps: { [key: string]: ProxySubApplicationOptions }, shouldMerge?: boolean): void {
        if (shouldMerge) {
            Object.assign(this.apps, apps);
        } else {
            this.apps = apps;
        }
    }

    buildProxyConfig(options: BuildProxyConfigOptions = {}): any {
        options = Object.assign({}, defaultBuildProxyConfigOptions, options);

        const rootDomains = options.rootDomains ? options.rootDomains : ['pingcode.local', 'worktile.local'];
        const secondaryDomains = options.secondaryDomains ? options.secondaryDomains : ['at', 'yctech'];
        const portalPort = options.portalPort ? options.portalPort : 10000;

        const PROXY_CONFIG = {};

        rootDomains.forEach((rootDomain) => {
            secondaryDomains.forEach((domain) => {
                const localOriginWithoutPort = `http://${domain}.${rootDomain}`;
                const portalOrigin = `${localOriginWithoutPort}:${portalPort}`;

                PROXY_CONFIG[`${portalOrigin}/static/portal`] = {
                    target: `${portalOrigin}`,
                    pathRewrite: { [`^/static/portal`]: '' },
                    secure: false,
                    changeOrigin: false,
                };

                // admin static
                PROXY_CONFIG[`${portalOrigin}/static/admin`] = {
                    target: `${localOriginWithoutPort}:10001`,
                    pathRewrite: { [`^/static/admin`]: '' },
                    secure: false,
                    changeOrigin: false,
                };

                // typhon api
                PROXY_CONFIG[`${portalOrigin}/api/typhon`] = {
                    target: `${localOriginWithoutPort}:10010`,
                    secure: false,
                    changeOrigin: false,
                };

                // ladon api
                PROXY_CONFIG[`${portalOrigin}/api/ladon`] = {
                    target: `${localOriginWithoutPort}:10030`,
                    secure: false,
                    changeOrigin: false,
                };

                // marketplace api
                PROXY_CONFIG[`${portalOrigin}/api/marketplace`] = {
                    target: `${localOriginWithoutPort}:10021`,
                    secure: false,
                    changeOrigin: false,
                };

                // open admin api
                PROXY_CONFIG[`${portalOrigin}/api/open/admin`] = {
                    target: `${localOriginWithoutPort}:30001`,
                    secure: false,
                    changeOrigin: false,
                };

                for (const appName in this.apps) {
                    if (this.apps.hasOwnProperty(appName)) {
                        const { port, apiPort, apiName } = this.apps[appName];

                        // sky static
                        PROXY_CONFIG[`${portalOrigin}/static/${appName}`] = {
                            target: `${localOriginWithoutPort}:${port}`,
                            pathRewrite: { [`^/static/${appName}`]: '' },
                            secure: false,
                            changeOrigin: false,
                        };

                        // api
                        PROXY_CONFIG[`${portalOrigin}/api/${apiName || appName}`] = {
                            target: `${localOriginWithoutPort}:${apiPort}`,
                            secure: false,
                            changeOrigin: false,
                        };
                    }
                }

                options.domainIteratee(domain, PROXY_CONFIG);
            });
        });
        return PROXY_CONFIG;
    }

    buildAppProxyConfig(
        appName: string,
        appOption: ProxySubApplicationOptions,
        options: BuildProxyConfigOptions = {}
    ): any {
        this.setProxySubApps({
            [appName]: appOption,
        });

        return this.buildProxyConfig({
            ...options,
            portalPort: appOption.port,
        });
    }
}

const proxyBuilder = new ProxyConfigBuilder();

export default proxyBuilder;

module.exports = proxyBuilder;
