interface BuildProxyConfigOptions {
    secondaryDomains?: string[];
    domainIteratee?: (domain: string, proxyConfig: { [key: string]: any }) => void;
}

const DEFAULT_BUILD_PROXY_CONFIG_OPTIONS: BuildProxyConfigOptions = {
    secondaryDomains: ['at', 'yctech'],
    domainIteratee: () => {}
};

interface ProxySubApplicationOptions {
    port: number;
    apiPort: number;
}

class ProxyConfigBuilder {
    private apps: { [key: string]: ProxySubApplicationOptions };

    constructor() {
        this.apps = {
            agile: {
                port: 11000,
                apiPort: 11001
            },
            pipeline: {
                port: 12000,
                apiPort: 12001
            },
            testcase: {
                port: 13000,
                apiPort: 13001
            },
            bugtrace: {
                port: 14000,
                apiPort: 14001
            }
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
        options = Object.assign(DEFAULT_BUILD_PROXY_CONFIG_OPTIONS, options);
        const secondaryDomains = options.secondaryDomains ? options.secondaryDomains : ['at', 'yctech'];

        const PROXY_CONFIG = {};

        secondaryDomains.forEach(domain => {
            const localOriginWithoutPort = `http://${domain}.worktile.local`;
            const portalOrigin = `${localOriginWithoutPort}:10000`;

            // past app
            PROXY_CONFIG[`${portalOrigin}/app-past/static`] = {
                target: `${localOriginWithoutPort}:8000`,
                pathRewrite: { '^/app-past/static': '' },
                secure: false,
                changeOrigin: false
            };

            PROXY_CONFIG[`http://${domain}.worktile.local:10000/i18n`] = {
                target: `http://${domain}.worktile.local:8000`,
                secure: false,
                changeOrigin: false
            };

            PROXY_CONFIG[`http://${domain}.worktile.local:10000/image`] = {
                target: `http://${domain}.worktile.local:8000`,
                secure: false,
                changeOrigin: false
            };

            PROXY_CONFIG[`http://${domain}.worktile.local:10000/fonts`] = {
                target: `http://${domain}.worktile.local:8000`,
                secure: false,
                changeOrigin: false
            };

            for (const appName in this.apps) {
                if (this.apps.hasOwnProperty(appName)) {
                    const { port, apiPort } = this.apps[appName];

                    // sky static
                    PROXY_CONFIG[`${portalOrigin}/${appName}/static`] = {
                        target: `${localOriginWithoutPort}:${port}`,
                        pathRewrite: { [`^/${appName}/static`]: '' },
                        secure: false,
                        changeOrigin: false
                    };

                    // api
                    PROXY_CONFIG[`${portalOrigin}/api/${appName}`] = {
                        target: `${localOriginWithoutPort}:${apiPort}`,
                        secure: false,
                        changeOrigin: false
                    };
                }
            }

            // account api
            PROXY_CONFIG[`${portalOrigin}/api/account`] = {
                target: `${localOriginWithoutPort}:7000`,
                secure: false,
                changeOrigin: false
            };

            options.domainIteratee(domain, PROXY_CONFIG);

            // past api
            PROXY_CONFIG[`${portalOrigin}/api`] = {
                target: `${localOriginWithoutPort}:8100`,
                secure: false,
                changeOrigin: false
            };

            // wt-charm-sky signin
            // PROXY_CONFIG[`${portalOrigin}/signin/*`] = {
            //     // host: `${domain}.worktile.local:10000`,
            //     target: `${localOriginWithoutPort}:7999`,
            //     secure: true,
            //     changeOrigin: true,
            //     bypass: function(req, res, proxyOptions) {
            //         console.log(req.url);
            //         console.log(req.host);
            //         console.log(req.host);
            //     }
            // };
        });
        return PROXY_CONFIG;
    }
}

const proxyBuilder = new ProxyConfigBuilder();

export default proxyBuilder;

module.exports = proxyBuilder;
