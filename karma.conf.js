var webpack = require('webpack');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: false, //just run once by default
    autoWatch: true,
    frameworks: [ 'mocha', 'chai' ], //use the mocha test framework
    files: [
      'karma.tests.helper.js' //just load this file
    ],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'karma.tests.helper.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      mode: 'development',
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        rules: [
          {
            // "oneOf" will traverse all following loaders until one will
            // match the requirements. When no loader matches it will fall
            // back to the "file" loader at the end of the loader list.
            oneOf: [
              // "url" loader works like "file" loader except that it embeds assets
              // smaller than specified limit in bytes as data URLs to avoid requests.
              // A missing `test` is equivalent to a match.
              {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
              // Process application JS with Babel.
              // The preset includes JSX, Flow, and some ESnext features.
              {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: require.resolve('babel-loader'),
                options: {
                  customize: require.resolve(
                    'babel-preset-react-app/webpack-overrides'
                  ),
                  
                  plugins: [
                    [
                      require.resolve('babel-plugin-named-asset-import'),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                          },
                        },
                      },
                    ],
                  ],
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  // Don't waste time on Gzipping the cache
                  cacheCompression: false,
                },
              },
            ]
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // Chains the sass-loader with the css-loader and the style-loader
          // to immediately apply all styles to the DOM.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx|css)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};