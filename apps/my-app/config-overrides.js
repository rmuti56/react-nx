const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, context) => {
  nrwlConfig(config);// use default webpack from nrwl webpack

  return {
    ...config,
    plugins: [...config.plugins],
    module: {
      ...config.module,
      rules: [
        ...(config.module.rules || []),
        {
          test: /\.less$/,
          use: [
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                lessOptions: {
                  modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
  };
};
