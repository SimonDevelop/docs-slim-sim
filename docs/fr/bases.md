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

N'hésitez pas à aller voir sur la documentation de [slim](https://www.slimframework.com/docs/) pour des choses plus avancées.


## Controllers
Maintenant que nous avons vu comment créer des routes, il reste plus qu'à faire la partie logique et vue de ces routes.
Commençons par les `controllers`, si vous vous rappelez dans la partie `routeur` du chapitre précédent, vous deviez déclarer un controller pour chaque route.
Il s'agit de la partie logique d'une vue, ou vous allez effectuer diverses opérations, des requêtes en base de données par exemple pour ensuite les envoyer à la vue `views`.

Dans un controller vous avez des `actions`, ou `fonctions` dans la logique du code, ces fonctions ont pour rôle de gérer la logique d'une route avant de retourner la vue.
Prenons exemple de cette route :
``` yaml
home:
  methode: get
  path: /home
  controller: App\Controllers\HomeController
  fonction: getHome
```
Ma route est `/home`, donc l'url correspond à `http://exemple.net/home`, pour cette url je désigne le controller `HomeController` avec comme action `getHome`.

Si on regarde cette `action` dans le controller `app/src/Controllers/HomeController.php` :
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
Ici je définis une variable `$title`, par la suite j'effectue une opération avec `monolog`, j'y ai accès car il est déclaré dans le `container`, puis j'envoie cette variable dans ma vue vers le fichier `pages/home.twig`.


## Views
Allons voir cette vue `app/src/Views/pages/home.twig` :
``` twig
{% extends "layout.twig" %}
{% block content %}
<h1>{{ title }}</h1>
{% endblock %}
```

Si vous connaissez un peu twig, vous aurez très vite compris que la première ligne sert à appeler la page parent de ma vue `layout.twig`.
Dans ma vue je souhaite simplement afficher la variable `$title` que le controller lui a envoyé, rien de bien compliqué.
Si vous connaissez à peine twig, je vous invite à aller voir la [documentation](https://twig.symfony.com/doc/2.x/) pour que vous puissiez l'utiliser, ici je guide surtout sur l'utilisation du template.


## Middlewares
On attaque maintenant les `middlewares` de [slim](https://www.slimframework.com/docs/).
Pour faire simple, il s'agit un peu comme des controllers, mais contrairement à effectuer des actions précises pour des routes, ils effectuent des opérations que vous allez définir à exécuter où et quand.

Par exemple, vous développez une application avec une interface administrateur sur la route `/admin`, vous avez d'autres routes avec cette url, `/admin/users`, `/admin/user/3` ect...

Vous devez sur chacune de ces vues vérifier les droits d'accès de l'utilisateur qui souhaite accéder à ces pages, en temps normal vous écrivez le code pour cette vérification sur chaque action dans vos controllers qui serait du copier/coller ce qui n'est pas bon.
Les `middlewares` vous permettent de faire ceci dans un seul endroit pour ensuite le faire exécuter sur les vues souhaitées et ce avant l'exécution de vos controllers.

C'est dans le fichier `config/middlewares.yml` que vous ajoutez la liste de tous vos middlewares que votre application utilisera :
``` yaml
alert:
  middleware: App\Middlewares\AlertMiddleware
  arguments: [container]

old:
  middleware: App\Middlewares\OldMiddleware
  arguments: [container]
  active: always

token:
  middleware: App\Middlewares\TokenMiddleware
  arguments: [container]
  active: always

csrf:
  middleware: App\Middlewares\CsrfMiddleware
  arguments: [container]
  active: always

csrfChecker:
  arguments: [container.csrf]
  active: always

tracy:
  middleware: RunTracy\Middlewares\TracyMiddleware
  arguments: [app]
  active: always
  env: dev
```

Un peu comme le principe des routes, vous avez des propriétés pour chaque middleware à définir.
### Les propriétes :
- `middleware`\*: Définir la `class` du middleware.
- `arguments`\*: Les arguments à lui passer (entre autre il s'agit principalement du container ou de l'app de slim).
- `active`: Mettre cette propriété à `always` pour lancer le middleware pour toute les routes.
- `env`: Défini les middleware à lancer en environnement de développement ou de production (lance sur tous les environnements par défaut).

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

    public function __construct($container)
    {
        $this->twig = $container->view->getEnvironment();
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
    if (!isset($_SESSION['alert'])) {
        $_SESSION['alert'] = [];
    }
    return $_SESSION['alert'][$type] = $message;
}
```
Le middleware `app/src/Middlewares/OldMiddleware.php` qui est utilisé pour garder en mémoire les informations saisies dans les formulaires, utiles en cas d'echec, fonctionne de la même manière que le middleware pour les messages flash.

Il envoie les informations des champs dans la vue sous forme de tableau nommé `old`, il n'y a pas de fonction pour celà, vous devez juste enregistrer sous forme de tableau vos champs dans la variable de session `old`.

Si vous souhaitez créer des middlewares et les exécuter pour des routes bien spécifiques, celà ce passe dans la partie `routes.yml`.
