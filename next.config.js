const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    assetPrefix: "./",
    env: {
        STATIC_PREFIX: isProduction ? "./static" : "/static",
        baseApiUrl: "https://api.qa.gaimz.com",
    },
    exportPathMap: async (
        defaultPathMap,
        {dev, dir, outDir, distDir, buildId}
    ) => {
        return !dev
            ? {
                "/panel": {page: "/panel.html"},
                "/live_config": {page: "/live_config.html"},
                "/config": {page: "/config.html"},
            }
            : defaultPathMap;
    },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        svgoConfig: {
                            plugins: {
                                removeViewBox: false
                            }
                        }
                    }
                }
            ],

        });

        config.optimization.minimize = false;
        return config;
    },
    images: {
        loader: "imgix",
        path: "",
    },
};
