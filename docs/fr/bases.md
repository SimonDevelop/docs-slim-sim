# Les Bases

## Routeur
Attaquons maintenant le `routeur`, il s'agit tout simplement du `routeur` de [slim](https://www.slimframework.com/), c'est dans le fichier `config/routes.php` que sont définies les routes de votre application.

``` php
<?php

use App\Controllers\HomeController;

$app->get('/', HomeController::class. ':getHome')->setName('home');
// $app->post('/', HomeController::class. ':postHome');

// Exemple pour le RouterJS
$app->get('/hello/{name}', HomeController::class. ':getHome')->setName('hello');
```

Chaque route commence par `$app`, appeler ensuite la méthode que vous souhaitez utiliser, `get`, `post`, `put`, `update` ou `delete`, utiliser `any` si vous souhaitez prendre en compte toute les méthodes http.

En premier paramètre vous définissez l'url, les paramètres munis de `{}` sont des valeurs récupérer dans l'url, nous en parleront un peu plus dans le chapitre des controllers.

Le second paramètre est la méthode à utiliser pour cette route, ici vous définissez la classe du controller avec sa méthode.
Vous pouvez aussi définir un nom avec la méthode `setName()`, elle sera utilisé dans vos vues twig.

Pour plus d'informations concernant le routeur, je vous invite à aller voir la [documentation du routeur de slim](https://www.slimframework.com/docs/v3/objects/router.html).

## Container
Maintenant, le gestionnaire de dépendances de [slim](https://www.slimframework.com/), le `container`.
Dans le fichier `config/container.php` sont insérées les dépendances/librairies utilisées, exemple [monolog](https://github.com/Seldaek/monolog).
Si vous avez des dépendances à rajouter pour pouvoir les utiliser dans les controllers/middlewares, il vous suffit d'ajouter ce type de ligne :

``` php
<?php
$container['librairie'] = function () {
    // Appel de la librairie, opération...
    return $librairieObjet;
};
```

N'hésitez pas à aller voir sur la documentation concernant le [container de slim](https://www.slimframework.com/docs/v3/concepts/di.html) pour plus de détails.


## Controllers
Maintenant que nous avons vu comment créer des routes, il reste plus qu'à faire la partie logique et vue de ces routes.
Commençons par les `controllers`, si vous vous rappelez dans la partie `routeur`, vous deviez déclarer un controller et une méthode pour chaque route.
Il s'agit de la partie logique d'une vue, ou vous allez effectuer diverses opérations, des requêtes en base de données par exemple pour ensuite les envoyer à la vue `views`.

Dans un controller vous avez des `actions`, ou `méthodes` dans la logique du code, ces méthodes ont pour rôle de gérer la logique d'une route avant de retourner la vue.
Prenons exemple de cette route :
``` php
<?php

use App\Controllers\HomeController;

$app->get('/', HomeController::class. ':getHome')->setName('home');
```
Ma route est `/home`, donc l'url correspond à `http://exemple.net/home`, pour cette url je désigne le controller `HomeController` avec comme action `getHome` qui est la `méthode`.

Si on regarde cette `méthode` dans le controller `app/src/Controllers/HomeController.php` :
``` php
<?php

public function getHome(RequestInterface $request, ResponseInterface $response)
{
    $title = "Hello World!";

    if (isset($title) && $title === "Hello World!") {
        $this->logger->addInfo("Message de bienvenue envoyé");
    } else {
        $title = "Nop";
    }

    $params = compact("title");
    $this->render($response, 'pages/home.twig', $params);
}
```
Ici je définis une variable `$title`, par la suite j'effectue une opération avec `monolog`, j'y ai accès car il est déclaré dans le `container`, puis j'envoie cette variable dans ma vue en effectuant un `render()` de `$response` vers le fichier `pages/home.twig` et le tableau de mes données `$params`.


## Views
Allons voir cette vue `app/src/Views/pages/home.twig` :
```twig
{% extends "layout.twig" %}
{% block content %}
<h1>{{ title }}</h1>
{% endblock %}
```
Si vous connaissez un peu twig, vous aurez très vite compris que la première ligne sert à appeler la page parent de la vue `layout.twig`.<br>
Dans la vue je souhaite simplement afficher la variable `$title` que le controller lui a envoyé, rien de bien compliqué.<br>
Si vous connaissez à peine twig, je vous invite à aller voir la [documentation de twig](https://twig.symfony.com/doc/2.x/) pour vous y familiariser.


## Middlewares
On attaque la partie qui rend slim très intéressant, les `middlewares`.<br>
Pour faire simple, il s'agit un peu comme des controllers, mais contrairement à ces derniers, leur action sont effectué à des moments précis dans le routeur.

Par exemple, vous développez une application avec une interface administrateur sur la route `/admin`, vous avez d'autres routes avec cette url, `/admin/users`, `/admin/user/3` ect...

Vous devez sur chacune de ces vues, vérifier les droits d'accès de l'utilisateur qui souhaite accéder à ces pages, en temps normal vous écrivez le code pour cette vérification sur chaque action dans vos controllers qui serait du copier/coller, ce qui n'est pas bon.<br>
Les `middlewares` vous permettent de faire ceci dans un seul endroit pour ensuite le faire exécuter sur les vues souhaitées et ce avant l'exécution de vos controllers.

C'est dans le fichier `config/middlewares.php` que vous ajoutez à l'exécution les middlewares à exécuter avant les controllers, et ce pour toutes les vues :
``` php
<?php

use App\Middlewares;

// Middleware pour les message d'alert en session
$app->add(new Middlewares\AlertMiddleware($container->view->getEnvironment()));

// Middleware pour la sauvegarde des champs de saisi
$app->add(new Middlewares\OldMiddleware($container->view->getEnvironment()));

// Middleware pour la génération de token
$app->add(new Middlewares\TokenMiddleware($container->view->getEnvironment()));

// Middleware pour la vérification csrf
$app->add(new Middlewares\CsrfMiddleware($container->view->getEnvironment(), $container->csrf));
$app->add($container->csrf);
```

Allons voir par exemple le middleware `app/src/Middlewares/AlertMiddleware.php` :
``` php
<?php
namespace App\Middlewares;

use Slim\Http\Request;
use Slim\Http\Response;

class AlertMiddleware
{
    private $twig;
    private $container;

    public function __construct(\Twig_Environment $twig, $container)
    {
        $this->twig = $twig;
        $this->container = $container;
    }

    public function __invoke(Request $request, Response $response, $next)
    {
        $this->twig->addGlobal(
            'alert',
            $this->container->session->has('alert') ? $this->container->session->get('alert') : []
        );
        if ($this->container->session->has('alert')) {
            $this->container->session->delete('alert');
        }
        return $next($request, $response);
    }
}
```
Pour commencer, il s'agit d'un middleware qui permet de gérer les messages flash, par exemple en cas d'erreur de formulaire, de droits d'accès ect... on peux envoyer à notre vue twig la variable `alert`, un tableau comportant son type et son message.

Dans le controller parent `app/src/Controllers/Controller.php` vous avez la fonction permettant de créer des messages d'alerte :
``` php
<?php
public function alert($message, $type = "success")
{
    if (!$this->session->has('alert')) {
        $this->session->set('alert', []);
    }
    return $this->session->add([
        'alert' => [$type => $message]
    ]);
}
```
Le middleware `app/src/Middlewares/OldMiddleware.php` qui est utilisé pour garder en mémoire les informations saisies dans les formulaires, utiles en cas d'echec, fonctionne de la même manière que le middleware pour les messages flash.

Il envoie les informations des champs dans la vue sous forme de tableau nommé `old`, il n'y a pas de fonction pour celà, vous devez juste enregistrer sous forme de tableau vos champs dans la variable de session `$_SESSION['old']`.

Si vous souhaitez créer des middlewares et les exécuter pour des routes bien spécifiques, vous ne devez pas les déclarer dans `config/middlewares.php` mais directement dans `config/routes.php` comme ceci :
``` php
<?php
$app->group('', function () {
  $this->get('/admin', AdminController::class. ':getHome')->setName('admin');
  $this->get('/admin/users', AdminController::class. ':getUsers')->setName('users');
})->add(new App\Middlewares\AlertMiddleware($container->view->getEnvironment(), $container));
```

Pour comprendre le fonctionnement précis des middlewares de slim, je vous invite à aller voir la [documentation](https://www.slimframework.com/docs/concepts/middleware.html).
