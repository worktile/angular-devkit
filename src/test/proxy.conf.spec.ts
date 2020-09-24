import { notStrictEqual, deepStrictEqual, strictEqual } from 'assert';
import { isEqual } from 'lodash';

const proxy = require('../proxy');

const expectedAtPingCodeConfig = {
    'http://at.pingcode.local:10000/static/admin': {
        target: 'http://at.pingcode.local:10001',
        pathRewrite: { '^/static/admin': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/typhon': {
        target: 'http://at.pingcode.local:10010',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/ladon': {
        target: 'http://at.pingcode.local:10030',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/marketplace': {
        target: 'http://at.pingcode.local:10021',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/open/admin': {
        target: 'http://at.pingcode.local:30001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/agile/static': {
        target: 'http://at.pingcode.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/agile': {
        target: 'http://at.pingcode.local:11001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/pipe/static': {
        target: 'http://at.pingcode.local:12000',
        pathRewrite: { '^/pipe/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/pipe': {
        target: 'http://at.pingcode.local:12001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/testhub/static': {
        target: 'http://at.pingcode.local:13000',
        pathRewrite: { '^/testhub/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/testhub': {
        target: 'http://at.pingcode.local:13001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/trace/static': {
        target: 'http://at.pingcode.local:14000',
        pathRewrite: { '^/trace/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/trace': {
        target: 'http://at.pingcode.local:14001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/wiki/static': {
        target: 'http://at.pingcode.local:15000',
        pathRewrite: { '^/wiki/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/wiki': {
        target: 'http://at.pingcode.local:15001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/plan/static': {
        target: 'http://at.pingcode.local:16000',
        pathRewrite: { '^/plan/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/plan': {
        target: 'http://at.pingcode.local:16001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/okr/static': {
        target: 'http://at.pingcode.local:17000',
        pathRewrite: { '^/okr/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.pingcode.local:10000/api/okr': {
        target: 'http://at.pingcode.local:17001',
        secure: false,
        changeOrigin: false,
    },
};

const expectedYCTechPingCodeConfig = {
    'http://yctech.pingcode.local:10000/static/admin': {
        target: 'http://yctech.pingcode.local:10001',
        pathRewrite: { '^/static/admin': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/typhon': {
        target: 'http://yctech.pingcode.local:10010',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/ladon': {
        target: 'http://yctech.pingcode.local:10030',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/marketplace': {
        target: 'http://yctech.pingcode.local:10021',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/open/admin': {
        target: 'http://yctech.pingcode.local:30001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/agile/static': {
        target: 'http://yctech.pingcode.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/agile': {
        target: 'http://yctech.pingcode.local:11001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/pipe/static': {
        target: 'http://yctech.pingcode.local:12000',
        pathRewrite: { '^/pipe/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/pipe': {
        target: 'http://yctech.pingcode.local:12001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/testhub/static': {
        target: 'http://yctech.pingcode.local:13000',
        pathRewrite: { '^/testhub/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/testhub': {
        target: 'http://yctech.pingcode.local:13001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/trace/static': {
        target: 'http://yctech.pingcode.local:14000',
        pathRewrite: { '^/trace/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/trace': {
        target: 'http://yctech.pingcode.local:14001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/wiki/static': {
        target: 'http://yctech.pingcode.local:15000',
        pathRewrite: { '^/wiki/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/wiki': {
        target: 'http://yctech.pingcode.local:15001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/plan/static': {
        target: 'http://yctech.pingcode.local:16000',
        pathRewrite: { '^/plan/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/plan': {
        target: 'http://yctech.pingcode.local:16001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/okr/static': {
        target: 'http://yctech.pingcode.local:17000',
        pathRewrite: { '^/okr/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.pingcode.local:10000/api/okr': {
        target: 'http://yctech.pingcode.local:17001',
        secure: false,
        changeOrigin: false,
    },
};

const expectedAtWorktileConfig = {
    'http://at.worktile.local:10000/static/admin': {
        target: 'http://at.worktile.local:10001',
        pathRewrite: { '^/static/admin': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/typhon': {
        target: 'http://at.worktile.local:10010',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/ladon': {
        target: 'http://at.worktile.local:10030',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/marketplace': {
        target: 'http://at.worktile.local:10021',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/open/admin': {
        target: 'http://at.worktile.local:30001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/agile/static': {
        target: 'http://at.worktile.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/agile': {
        target: 'http://at.worktile.local:11001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/pipe/static': {
        target: 'http://at.worktile.local:12000',
        pathRewrite: { '^/pipe/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/pipe': {
        target: 'http://at.worktile.local:12001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/testhub/static': {
        target: 'http://at.worktile.local:13000',
        pathRewrite: { '^/testhub/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/testhub': {
        target: 'http://at.worktile.local:13001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/trace/static': {
        target: 'http://at.worktile.local:14000',
        pathRewrite: { '^/trace/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/trace': {
        target: 'http://at.worktile.local:14001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/wiki/static': {
        target: 'http://at.worktile.local:15000',
        pathRewrite: { '^/wiki/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/wiki': {
        target: 'http://at.worktile.local:15001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/plan/static': {
        target: 'http://at.worktile.local:16000',
        pathRewrite: { '^/plan/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/plan': {
        target: 'http://at.worktile.local:16001',
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/okr/static': {
        target: 'http://at.worktile.local:17000',
        pathRewrite: { '^/okr/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at.worktile.local:10000/api/okr': {
        target: 'http://at.worktile.local:17001',
        secure: false,
        changeOrigin: false,
    },
};

const expectedYCTechWorktileConfig = {
    'http://yctech.worktile.local:10000/static/admin': {
        target: 'http://yctech.worktile.local:10001',
        pathRewrite: { '^/static/admin': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/typhon': {
        target: 'http://yctech.worktile.local:10010',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/ladon': {
        target: 'http://yctech.worktile.local:10030',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/marketplace': {
        target: 'http://yctech.worktile.local:10021',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/open/admin': {
        target: 'http://yctech.worktile.local:30001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/agile/static': {
        target: 'http://yctech.worktile.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/agile': {
        target: 'http://yctech.worktile.local:11001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/pipe/static': {
        target: 'http://yctech.worktile.local:12000',
        pathRewrite: { '^/pipe/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/pipe': {
        target: 'http://yctech.worktile.local:12001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/testhub/static': {
        target: 'http://yctech.worktile.local:13000',
        pathRewrite: { '^/testhub/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/testhub': {
        target: 'http://yctech.worktile.local:13001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/trace/static': {
        target: 'http://yctech.worktile.local:14000',
        pathRewrite: { '^/trace/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/trace': {
        target: 'http://yctech.worktile.local:14001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/wiki/static': {
        target: 'http://yctech.worktile.local:15000',
        pathRewrite: { '^/wiki/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/wiki': {
        target: 'http://yctech.worktile.local:15001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/plan/static': {
        target: 'http://yctech.worktile.local:16000',
        pathRewrite: { '^/plan/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/plan': {
        target: 'http://yctech.worktile.local:16001',
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/okr/static': {
        target: 'http://yctech.worktile.local:17000',
        pathRewrite: { '^/okr/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://yctech.worktile.local:10000/api/okr': {
        target: 'http://yctech.worktile.local:17001',
        secure: false,
        changeOrigin: false,
    },
};

// at1.test.local

const expectedAt1TestLocalPortalConfig = {
    'http://at1.test.local:20000/static/admin': {
        target: 'http://at1.test.local:10001',
        pathRewrite: { '^/static/admin': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/typhon': {
        target: 'http://at1.test.local:10010',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/ladon': {
        target: 'http://at1.test.local:10030',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/marketplace': {
        target: 'http://at1.test.local:10021',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/open/admin': {
        target: 'http://at1.test.local:30001',
        secure: false,
        changeOrigin: false,
    },
};
const expectedAt1TestLocalConfig = Object.assign({}, expectedAt1TestLocalPortalConfig, {
    'http://at1.test.local:20000/agile/static': {
        target: 'http://at1.test.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/agile': {
        target: 'http://at1.test.local:11001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/pipe/static': {
        target: 'http://at1.test.local:12000',
        pathRewrite: { '^/pipe/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/pipe': {
        target: 'http://at1.test.local:12001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/testhub/static': {
        target: 'http://at1.test.local:13000',
        pathRewrite: { '^/testhub/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/testhub': {
        target: 'http://at1.test.local:13001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/trace/static': {
        target: 'http://at1.test.local:14000',
        pathRewrite: { '^/trace/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/trace': {
        target: 'http://at1.test.local:14001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/wiki/static': {
        target: 'http://at1.test.local:15000',
        pathRewrite: { '^/wiki/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/wiki': {
        target: 'http://at1.test.local:15001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/plan/static': {
        target: 'http://at1.test.local:16000',
        pathRewrite: { '^/plan/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/plan': {
        target: 'http://at1.test.local:16001',
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/okr/static': {
        target: 'http://at1.test.local:17000',
        pathRewrite: { '^/okr/static': '' },
        secure: false,
        changeOrigin: false,
    },
    'http://at1.test.local:20000/api/okr': {
        target: 'http://at1.test.local:17001',
        secure: false,
        changeOrigin: false,
    },
});

const expectedProxyConfig = Object.assign(
    {},
    expectedAtPingCodeConfig,
    expectedYCTechPingCodeConfig,
    expectedAtWorktileConfig,
    expectedYCTechWorktileConfig
);

const apps = {
    flow: {
        port: 20000,
        apiPort: 20001,
        apiName: 'flow',
    },
};

const originApps = { ...proxy.apps };

describe('build proxy config', () => {
    afterEach(() => {
        proxy.apps = originApps;
    });

    it('should get config without options', () => {
        const config = proxy.buildProxyConfig();
        notStrictEqual(config, null);
        deepStrictEqual(config, expectedProxyConfig);
    });

    it('should get config with secondary domains is [at1], rootDomain is [test.local]', () => {
        const config = proxy.buildProxyConfig({
            portalPort: 20000,
            rootDomains: ['test.local'],
            secondaryDomains: ['at1'],
        });
        notStrictEqual(config, null);
        deepStrictEqual(config, expectedAt1TestLocalConfig);
    });

    it('should get config with domains and domain iteratee', () => {
        const config = proxy.buildProxyConfig({
            portalPort: 20000,
            rootDomains: ['test.local'],
            secondaryDomains: ['at1'],
            domainIteratee: (domain: string, config: any) => {
                config[`http//${domain}.test.local:0000/static`] = {
                    target: `http//${domain}.test.local:0001/static`,
                };
            },
        });
        notStrictEqual(config, null);
        deepStrictEqual(
            config,
            Object.assign({}, expectedAt1TestLocalConfig, {
                [`http//at1.test.local:0000/static`]: {
                    target: `http//at1.test.local:0001/static`,
                },
            })
        );
    });

    it('should set sub apps', () => {
        proxy.setProxySubApps(apps, true);
        isEqual(proxy.apps, { ...originApps, ...apps });
        proxy.setProxySubApps(apps, false);
        isEqual(proxy.apps, apps);
    });

    it('should build at1.test.local config  with custom sub apps', () => {
        proxy.setProxySubApps(apps);
        const config = proxy.buildProxyConfig({
            portalPort: 20000,
            rootDomains: ['test.local'],
            secondaryDomains: ['at1'],
        });
        deepStrictEqual(
            config,
            Object.assign({}, expectedAt1TestLocalPortalConfig, {
                'http://at1.test.local:20000/flow/static': {
                    target: 'http://at1.test.local:20000',
                    pathRewrite: { '^/flow/static': '' },
                    secure: false,
                    changeOrigin: false,
                },
                'http://at1.test.local:20000/api/flow': {
                    target: 'http://at1.test.local:20001',
                    secure: false,
                    changeOrigin: false,
                },
            })
        );
    });
});

describe('build app proxy config', () => {
    it('should get app config ', () => {
        const config = proxy.buildAppProxyConfig(
            'flow',
            {
                port: 20000,
                apiPort: 20001,
                apiName: 'flow',
            },
            {
                rootDomains: ['test.local'],
                secondaryDomains: ['at1'],
            }
        );
        notStrictEqual(config, null);
        deepStrictEqual(
            config,
            Object.assign({}, expectedAt1TestLocalPortalConfig, {
                'http://at1.test.local:20000/flow/static': {
                    target: 'http://at1.test.local:20000',
                    pathRewrite: { '^/flow/static': '' },
                    secure: false,
                    changeOrigin: false,
                },
                'http://at1.test.local:20000/api/flow': {
                    target: 'http://at1.test.local:20001',
                    secure: false,
                    changeOrigin: false,
                },
            })
        );
    });
});
