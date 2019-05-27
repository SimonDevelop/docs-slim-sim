# Les Bases

## Routeur
Let's now attack the `router`, it's just [slim](https://www.slimframework.com/) `router`, it's in the `config/routes.php` file that are defined the routes of your application.

``` php
<?php

use App\Controllers\HomeController;

$app->get('/', HomeController::class. ':getHome')->setName('home');
// $app->post('/', HomeController::class. ':postHome');

// Example for RouterJS
$app->get('/hello/{name}', HomeController::class. ':getHome')->setName('hello');
```

Each route starts with `$app`, then call the method you want to use, `get`, `post`, `put`, `update` or `delete`, use `any` if you want to take into account all the http methods.

In first parameter you define the url, the parameters equipped with `{}` are values to recover in the url, we will speak a little more in the chapter of the controllers.

The second parameter is the method to use for this route, here you define the controller class with its method.
You can also define a name with the `setName()` method, it will be used in your twig views.

For more information about the router, I invite you to go to the [documentation of the slim router](https://www.slimframework.com/docs/v3/objects/router.html).

## Container
Now, the [slim](https://www.slimframework.com/) dependency manager, the `container`.
In the file `config/container.php` are inserted the dependencies/libraries used, example [monolog](https://github.com/Seldaek/monolog).
If you have dependencies to add to be able to use them in the controllers / middlewares, you just have to add this type of line:

``` php
<?php
$container['library'] = function () {
    // Call of the library, operation...
    return $libraryObject;
};
```

Do not hesitate to check out the documentation regarding the [slim container](https://www.slimframework.com/docs/v3/concepts/di.html) for more details.


## Controllers
WIP...

## Views
WIP...

## Middlewares
WIP...
