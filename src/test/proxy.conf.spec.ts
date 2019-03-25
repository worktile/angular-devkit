import { AssertionError, notEqual, equal, deepEqual } from 'assert';

const proxy = require('../proxy');

const expectedDomainAtConfig = {
    'http://at.worktile.local:10000/app-past/static': {
        target: 'http://at.worktile.local:8000',
        pathRewrite: { '^/app-past/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/i18n': {
        target: 'http://at.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/image': {
        target: 'http://at.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/fonts': {
        target: 'http://at.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/agile/static': {
        target: 'http://at.worktile.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api/agile': {
        target: 'http://at.worktile.local:11001',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/pipeline/static': {
        target: 'http://at.worktile.local:12000',
        pathRewrite: { '^/pipeline/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api/pipeline': {
        target: 'http://at.worktile.local:12001',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/testcase/static': {
        target: 'http://at.worktile.local:13000',
        pathRewrite: { '^/testcase/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api/testcase': {
        target: 'http://at.worktile.local:13001',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/bugtrace/static': {
        target: 'http://at.worktile.local:14000',
        pathRewrite: { '^/bugtrace/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api/bugtrace': {
        target: 'http://at.worktile.local:14001',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api/account': {
        target: 'http://at.worktile.local:7000',
        secure: false,
        changeOrigin: false
    },
    'http://at.worktile.local:10000/api': {
        target: 'http://at.worktile.local:8100',
        secure: false,
        changeOrigin: false
    }
};

const expectedDomainAt1Config = {
    'http://at1.worktile.local:10000/app-past/static': {
        target: 'http://at1.worktile.local:8000',
        pathRewrite: { '^/app-past/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/i18n': {
        target: 'http://at1.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/image': {
        target: 'http://at1.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/fonts': {
        target: 'http://at1.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/agile/static': {
        target: 'http://at1.worktile.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api/agile': {
        target: 'http://at1.worktile.local:11001',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/pipeline/static': {
        target: 'http://at1.worktile.local:12000',
        pathRewrite: { '^/pipeline/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api/pipeline': {
        target: 'http://at1.worktile.local:12001',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/testcase/static': {
        target: 'http://at1.worktile.local:13000',
        pathRewrite: { '^/testcase/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api/testcase': {
        target: 'http://at1.worktile.local:13001',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/bugtrace/static': {
        target: 'http://at1.worktile.local:14000',
        pathRewrite: { '^/bugtrace/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api/bugtrace': {
        target: 'http://at1.worktile.local:14001',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api/account': {
        target: 'http://at1.worktile.local:7000',
        secure: false,
        changeOrigin: false
    },
    'http://at1.worktile.local:10000/api': {
        target: 'http://at1.worktile.local:8100',
        secure: false,
        changeOrigin: false
    }
};

const expectedDomainYCTechProxyConfig = {
    'http://yctech.worktile.local:10000/app-past/static': {
        target: 'http://yctech.worktile.local:8000',
        pathRewrite: { '^/app-past/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/i18n': {
        target: 'http://yctech.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/image': {
        target: 'http://yctech.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/fonts': {
        target: 'http://yctech.worktile.local:8000',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/agile/static': {
        target: 'http://yctech.worktile.local:11000',
        pathRewrite: { '^/agile/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api/agile': {
        target: 'http://yctech.worktile.local:11001',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/pipeline/static': {
        target: 'http://yctech.worktile.local:12000',
        pathRewrite: { '^/pipeline/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api/pipeline': {
        target: 'http://yctech.worktile.local:12001',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/testcase/static': {
        target: 'http://yctech.worktile.local:13000',
        pathRewrite: { '^/testcase/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api/testcase': {
        target: 'http://yctech.worktile.local:13001',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/bugtrace/static': {
        target: 'http://yctech.worktile.local:14000',
        pathRewrite: { '^/bugtrace/static': '' },
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api/bugtrace': {
        target: 'http://yctech.worktile.local:14001',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api/account': {
        target: 'http://yctech.worktile.local:7000',
        secure: false,
        changeOrigin: false
    },
    'http://yctech.worktile.local:10000/api': {
        target: 'http://yctech.worktile.local:8100',
        secure: false,
        changeOrigin: false
    }
};

const expectedProxyConfig = Object.assign({}, expectedDomainAtConfig, expectedDomainYCTechProxyConfig);

describe('proxy config', () => {
    it('should get config without options', () => {
        const config = proxy.buildProxyConfig();
        notEqual(config, null);

        deepEqual(config, expectedProxyConfig);
    });

    it('should get config with domains [at1]', () => {
        const config = proxy.buildProxyConfig({
            secondaryDomains: ['at1']
        });
        notEqual(config, null);
        deepEqual(config, expectedDomainAt1Config);
    });

    it('should get config with domains and domain iteratee', () => {
        const config = proxy.buildProxyConfig({
            secondaryDomains: ['at1'],
            domainIteratee: (domain: string, config: any) => {
                config[`http//${domain}.worktile.local:0000/static`] = {
                    target: `http//${domain}.worktile.local:0001/static`
                };
            }
        });
        notEqual(config, null);
        deepEqual(
            config,
            Object.assign({}, expectedDomainAt1Config, {
                [`http//at1.worktile.local:0000/static`]: {
                    target: `http//at1.worktile.local:0001/static`
                }
            })
        );
    });

    
});
