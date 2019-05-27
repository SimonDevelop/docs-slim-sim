# CLI commands

Thanks to the [console](https://github.com/symfony/console) library, SIM offers you commands for the fast creation of `Controller`, `Middleware`, `Entity`, `fixture` as well as to empty the twig cache and update your database.

This is the `console` file that allows you to use the following commands :

To see the list of available orders :
``` bash
$ php console list
```

To empty the twig cache
``` bash
$ php console cache:clear
```

## Generate files

To generate a controller, middleware, entity or fixture :
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

## CLI menu

You can install the library [cli-menu](https://github.com/php-school/cli-menu) with a `composer require php-school/cli-menu` and you will have a menu via the console to perform the various commands mentioned above, convenient in case of forgetfulness!

::: warning Important
[cli-menu](https://github.com/php-school/cli-menu) uses php posix extension which is not supported on windows, this part is useful for Linux and Mac OS developers only.
:::

To access the menu, just launch :
``` bash
$ php console
```

For the generation of `Controllers`, `Middlewares`, `Entity` and `fixture`, you will be asked for their name later.
