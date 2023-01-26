module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "babel-plugin-module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        locale: "./src/locale",
                        config: "./src/config",
                        images: "./src/asset/image",
                        icons: "./src/module/common/icons",
                        "ckb-peersyst-sdk": "./src/module/sdk",
                        module: "./src/module",
                        utils: "./src/utils",
                        "stack-navigator": "./src/Stack.ts",
                        "query-utils": "./src/query/react-query-overrides.ts",
                        "test-mocks": "./test/__mocks__"
                    },
                },
            ],
            ["@babel/plugin-proposal-async-generator-functions"],
        ],
    };
};
