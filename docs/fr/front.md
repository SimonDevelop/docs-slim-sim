# Webpack & Front-End

## Webpack
Webpack permet de fusionner et minifier vos fichiers `js` mais aussi `sass`, `scss` et `css`.

Dans le dossier `assets`, sont disposez des dossiers dédiés au développement front-end javascript, mais aussi pour la partie style avec du `sass`, `scss` et `css` sans oublier le dossier `img` pour stocker nos images, ces derniers seront optimisées si ils sont lourd.

Pour que vos fichiers `js`, `sass`, `scss` et `css` souhaitent être compilés, vous devez les ajouter dans la partie `entry` de votre fichier `webpack.config.js`.

La configuration de webpack fait en sorte que votre code `javascript` est compatible avec le maximum de navigateurs via `babel`, à vous d'adapter votre configuration dans les fichiers `.babelrc`.

Pour pouvoir utiliser webpack, il vous faut au préalable avoir nodejs 6.11.5 au minimum d'installé puis lancer les commandes :
``` bash
$ npm install
```

Pour pouvoir fusionner et minifier vos fichiers dans le dossier `public` de votre application, vous avez ces commandes :
``` bash
# Compiler en mode développement avec l'option watch (version linux/mac)
$ npm run webpackdev
# Compiler en mode production (version linux/mac)
$ npm run webpack
# Compiler en mode développement avec l'option watch (version windows)
$ npm run webpack:win
# Compiler en mode production (version windows)
$ npm run webpackdev:win
```

::: warning Note
Vous pouvez très bien supprimer webpack pour le remplacer par un autre outil ou et gérer vos fichier css/js directement dans le dossier public.
:::
