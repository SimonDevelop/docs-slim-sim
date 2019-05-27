# Commandes CLI

Grâce à la librairie [console](https://github.com/symfony/console), SIM vous offre des commandes pour la création rapide de `Controller`, `Middleware` ,`Entity`, `fixture` mais aussi de vider le cache twig et mettre à jour votre base de données.

C'est le fichier `console` qui vous permet d'utiliser les commandes suivantes :

Pour voir la liste des commandes disponibles :
``` bash
$ php console list
```

Pour vider le cache de twig
``` bash
$ php console cache:clear
```

## Générer des fichiers

Pour générer un controller, middleware, entité ou fixture :
``` bash
$ php console generate:controller TestController
```
`app/src/Controllers/TestController.php`

``` bash
$ php console generate:middleware TestMiddleware
```
`app/src/Middlewares/TestMiddleware.php`

``` bash
$ php console generate:entity Test
```
`app/src/Entity/Test.php`

``` bash
$ php console generate:fixture TestFixture
```
`app/src/Entity/DataFixtures/TestFixture.php`

## Menu CLI

Vous pouvez installer la librairie [cli-menu](https://github.com/php-school/cli-menu) avec un `composer require php-school/cli-menu` et vous serez disposer d'un menu via la console pour exécuter les divers commandes cités plus haut, pratique en cas d'oubli !

::: warning Important
[cli-menu](https://github.com/php-school/cli-menu) utilise l'extension php posix qui n'est pas supporté sur windows, cette partie est donc utile pour les développeurs Linux et Mac OS seulement.
:::

Pour accèder au menu, lancer juste :
``` bash
$ php console
```

Pour la génération des `Controllers` ,`Middlewares`, `Entity` et `fixture`, leur nom vous sera demandé par la suite.
