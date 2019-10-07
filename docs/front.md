# Webpack & Front-End

## Webpack
Webpack allows you to merge and minify your `js` files but also `sass`, `scss` and `css`.

In the `assets` folder, there are folders dedicated to front-end javascript development, but also for the style part with `sass`, `scss` and `css` without forgetting the `img` folder to store our images, these will be optimized if they are heavy.

In order for your `js`, `sass`, `scss` and `css` files to be compiled, you must add them to the `entry` part of your `webpack.config.js` file.

The webpack configuration makes sure that your `javascript` code is compatible with the maximum number of browsers via `babel`, for you to adapt your configuration in `.babelrc` files.

To be able to use webpack, you must first have at least 10 nodejs installed and then run the commands :
``` bash
$ npm install
```

To be able to merge and minify your files in the `public` folder of your application, you have these commands :
``` bash
# Compile in development mode with the watch option (linux/mac version)
$ npm run webpackdev
# Compile in production mode (linux/mac version)
$ npm run webpack
# Compile in development mode with the watch option (windows version)
$ npm run webpack:win
# Compile in production mode (windows version)
$ npm run webpackdev:win
```

::: warning Note
You can easily remove webpack to replace it with another tool or and manage your css/js files directly in the public folder.
:::
