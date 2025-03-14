module.exports = {
  webpack: {
    configure: {
      optimization: {
        minimize: true,
        minimizer: [
          (compiler) => {
            const TerserPlugin = require("terser-webpack-plugin");
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }).apply(compiler);
          },
        ],
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const htmlWebpackPlugin = webpackConfig.plugins.find(
            (plugin) => plugin.constructor.name === "HtmlWebpackPlugin"
          );
          if (htmlWebpackPlugin) {
            htmlWebpackPlugin.options.minify = false;
          }
          return webpackConfig;
        },
      },
    },
  ],
};
