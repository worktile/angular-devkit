import { deepStrictEqual, doesNotThrow, notStrictEqual, throws } from 'assert';

const proxy = require('../proxy');

const apps = { ...proxy.apps };

describe('build proxy config', () => {
    afterEach(() => {
        proxy.apps = apps;
    });

    it('should get config without options', () => {
        const config = proxy.buildProxyConfig();
        notStrictEqual(config, null);
        deepStrictEqual(config, {
            'http://at.pingcode.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.pingcode.local',
            },
            'http://at.pingcode.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
            'http://at.worktile.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.worktile.local',
            },
            'http://at.worktile.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
        });
    });

    it('should get config with secondary domains is [at1], rootDomain is [test.local]', () => {
        const config = proxy.buildProxyConfig({
            secondaryDomains: ['at1'],
            rootDomains: ['test.local'],
            targetDomain: 'test.live',
        });

        deepStrictEqual(config, {
            'http://at1.test.local:10000/api': {
                target: 'http://at1.test.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at1.test.local',
            },
            'http://at1.test.local:10000/static': {
                target: 'http://at1.test.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
        });
    });

    it('should get config with localStaticApps is [`agile`], localApiServerApps is [`agile`,`typhon`]', () => {
        const config = proxy.buildProxyConfig({
            localStaticApps: ['agile'],
            localApiServerApps: ['agile', 'typhon'],
        });

        deepStrictEqual(config, {
            'http://at.pingcode.local:10000/static/agile': {
                target: 'http://at.pingcode.local:11000',
                pathRewrite: { '^/static/agile': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api/agile': {
                target: 'http://at.pingcode.local:11001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api/typhon': {
                target: 'http://at.pingcode.local:10010',
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.pingcode.local',
            },
            'http://at.pingcode.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
            'http://at.worktile.local:10000/static/agile': {
                target: 'http://at.worktile.local:11000',
                pathRewrite: { '^/static/agile': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api/agile': {
                target: 'http://at.worktile.local:11001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api/typhon': {
                target: 'http://at.worktile.local:10010',
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.worktile.local',
            },
            'http://at.worktile.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
        });
    });

    it('should get config with localStaticApps or localApiServerApps when app not found ', () => {
        doesNotThrow(() => proxy.buildProxyConfig({ localStaticApps: ['agile'] }), Error);
        throws(() => proxy.buildProxyConfig({ localStaticApps: ['agile1'] }), Error);
        doesNotThrow(() => proxy.buildProxyConfig({ localApiServerApps: ['typhon'] }), Error);
        throws(() => proxy.buildProxyConfig({ localApiServerApps: ['typhon1'] }), Error);
    });

    it('should set apps and get custom apps config', () => {
        const apps = {
            app1: {
                port: 9000,
                apiPort: 9001,
            },
        };
        proxy.setApps(apps, true);
        deepStrictEqual(proxy.apps, {
            ...proxy.apps,
            ...apps,
        });
        proxy.setApps(apps);
        deepStrictEqual(proxy.apps, apps);
        const config = proxy.buildProxyConfig({
            localStaticApps: ['app1'],
            localApiServerApps: ['app1'],
        });
        deepStrictEqual(config, {
            'http://at.pingcode.local:10000/static/app1': {
                target: 'http://at.pingcode.local:9000',
                pathRewrite: { '^/static/app1': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api/app1': {
                target: 'http://at.pingcode.local:9001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.pingcode.local',
            },
            'http://at.pingcode.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
            'http://at.worktile.local:10000/static/app1': {
                target: 'http://at.worktile.local:9000',
                pathRewrite: { '^/static/app1': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api/app1': {
                target: 'http://at.worktile.local:9001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.worktile.local',
            },
            'http://at.worktile.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
        });
    });
});

describe('build app proxy config', () => {
    it('should get app config', () => {
        const config = proxy.buildAppProxyConfig('app1', {
            port: 9000,
            apiPort: 9001,
            apiServer: 'local',
        });
        deepStrictEqual(config, {
            'http://at.pingcode.local:10000/static/app1': {
                target: 'http://at.pingcode.local:9000',
                pathRewrite: { '^/static/app1': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api/app1': {
                target: 'http://at.pingcode.local:9001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.pingcode.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.pingcode.local',
            },
            'http://at.pingcode.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
            'http://at.worktile.local:10000/static/app1': {
                target: 'http://at.worktile.local:9000',
                pathRewrite: { '^/static/app1': '' },
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api/app1': {
                target: 'http://at.worktile.local:9001',
                secure: false,
                changeOrigin: false,
            },
            'http://at.worktile.local:10000/api': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' },
                cookieDomainRewrite: 'at.worktile.local',
            },
            'http://at.worktile.local:10000/static': {
                target: 'http://at.pingcode.live',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' },
            },
        });
    });
});
