# The basics

## Router
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
$container->set('library', function () {
    // Call of the library, operation...
    return $libraryObject;
});
```

Do not hesitate to check out the documentation regarding the [slim container](https://www.slimframework.com/docs/v3/concepts/di.html) for more details.


## Controllers
Now that we've seen how to create routes, it's more than just doing the logical part and seeing these routes.
Let's start with the `controllers`, if you remember in the `router` part, you had to declare a controller and a method for each route.
This is the logical part of a view, where you will perform various operations, such as database queries, and then send them to the view.

In a controller you have `actions`, `methods` in the logic of the code, these methods have the role of managing the logic of a route before returning the view.
Take this example :
``` php
<?php

use App\Controllers\HomeController;

$app->get('/', HomeController::class. ':getHome')->setName('home');
```
My route is `/home`, so the url is `http://example.net/home`, for this url I refer to the `HomeController` controller with `getHome` as the `method`.

If we look at this `method` in the controller `app/src/Controllers/HomeController.php` :
``` php
<?php

public function getHome(RequestInterface $request, ResponseInterface $response)
{
    $title = "Hello World!";

    if (isset($title) && $title === "Hello World!") {
        $this->logger->addInfo("Welcome message sent");
    } else {
        $title = "Nop";
    }

    $params = compact("title");
    $this->render($response, 'pages/home.twig', $params);
}
```
Here I define a variable `$title`, then I do an operation with `monolog`, I access it because it is declared in `container`, then I send this variable in my view by doing a `render()` from `$response` to the `pages/home.twig` file and the table of my `$params` data.


## Views
Let's go see this view `app/src/Views/pages/home.twig` :
``` twig
{% extends "layout.twig" %}
{% block content %}
<h1>{{ title }}</h1>
{% endblock %}
```

If you know a little twig, you will quickly understand that the first line is used to call the parent page of the view `layout.twig`.
In the view I just want to display the variable `$title` that the controller sent to him, nothing very complicated.
If you hardly know twig, I invite you to check out the [twig documentation](https://twig.symfony.com/doc/2.x/) so you can get started.


## Middlewares
We attack the part that makes slim very interesting, the `middlewares`.<br>
To put it simply, it's a little like controllers, but unlike them, their action is done at specific times in the router.

For example, you develop an application with an admin interface on the `/admin` route, you have other routes with this url, `/admin/users`, `/admin/user/3` ect...

You need on each of these views, check the access rights of the user who wants to access these pages, normally you write the code for this check on each action in your controllers that would be copy/paste, which is not good.<br>
Middlewares allow you to do this in one place and then run it on the desired views before executing your controllers.

It is in the file `config/middlewares.php` that you add at runtime the middlewares to execute before the controllers, and this for all the views:
``` php
<?php

use App\Middlewares;

// Middleware pour les message d'alert en session
$app->add(new Middlewares\AlertMiddleware($container));

// Middleware pour la sauvegarde des champs de saisie
$app->add(new Middlewares\OldMiddleware($container));

// Middleware pour la génération de token
$app->add(new Middlewares\TokenMiddleware($container));

// Middleware pour la vérification csrf
$app->add(new Middlewares\CsrfMiddleware($container));
$app->add('csrf');

```

Let's see for example the middleware `app/src/Middlewares/AlertMiddleware.php` :
``` php
<?php

namespace App\Middlewares;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class AlertMiddleware implements Middleware
{
    private $container;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        if (isset($_SESSION['alert'])) {
            unset($_SESSION['alert']);
        }
        if (isset($_SESSION['alert2'])) {
            $_SESSION['alert'] = $_SESSION['alert2'];
            unset($_SESSION['alert2']);
        }
        if (isset($_SESSION['alert'])) {
            $this->container->get("view")->getEnvironment()->addGlobal('alert', $_SESSION['alert']);
        }
        return $handler->handle($request);
    }
}
```
For starters, this is a middleware that can manage flash messages, for example in case of form error, access rights ect... we can send to our view twig variable `alert`, a painting with its type and message.

In the parent controller `app/src/Controllers/Controller.php` you have the function to create alert messages:
``` php
<?php
public function alert($message, $type = "success")
{
    if (!isset($_SESSION['alert2'])) {
        $_SESSION['alert2'] = [];
    }
    $_SESSION['alert2'][$type] = $message;
}
```
The middleware `app/src/Middlewares/OldMiddleware.php` which is used to keep in memory the information entered in the forms, useful in case of failure, works in the same way as the middleware for flash messages.

It sends the field information in the array view named `old`, there is no function for it, you just have to save as a table your fields in the `old` session variable.

If you want to create middlewares and run them for very specific routes, you should not declare them in `config/middlewares.php` but directly in `config/routes.php` like this:
``` php
<?php
$app->group('', function () {
  $this->get('/admin', AdminController::class. ':getHome')->setName('admin');
  $this->get('/admin/users', AdminController::class. ':getUsers')->setName('users');
})->add(new App\Middlewares\AlertMiddleware($container));
```

To understand the precise operation of slim middlewares, I invite you to go see the [documentation](https://www.slimframework.com/docs/v4/concepts/middleware.html).
