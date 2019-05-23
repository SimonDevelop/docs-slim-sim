# Introduction

![](https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png)

Slim Sim est un skeleton basé sur micro framework php [Slim](https://www.slimframework.com/), adoptant une architecture MVC simple et efficace, il vous permettera de développer vos sites et applications web dans une structure propre et organisé.
L’architecture sous-jacente est construite à l’aide de technologies bien établies et à jour.

**Certaines de ces technologies clés :**
- [twig-view](https://github.com/slimphp/Twig-View) pour vos pages.
- [doctrine](https://github.com/doctrine/doctrine2) en ORM pour votre base de données.
- [data-fixtures](https://github.com/doctrine/data-fixtures) pour les données fictives en base de données.
- [validation](https://github.com/Respect/Validation) permet d'utiliser des filtres de validation.
- [csrf](https://github.com/slimphp/Slim-Csrf) pour la sécurité des sessions.
- [php-ref](https://github.com/digitalnature/php-ref) une fonction var_dump amélioré.
- [phpdotenv](https://github.com/vlucas/phpdotenv) pour configurer vos environnements de développement et de production.
- [console](https://github.com/symfony/console) pour des commandes console propre au framework.
- [monolog](https://github.com/Seldaek/monolog) pour gérer vos logs.
- [runtracy](https://github.com/runcmf/runtracy) la barre de débogage.
- [slim-secure-session-middleware](https://github.com/adbario/slim-secure-session-middleware) un helper pour la gestion des sessions.
- [translation](https://github.com/symfony/translation) le système multilingue.
- [webpack](https://github.com/webpack/webpack) pouvoir compiler, fusion et minification de vos fichiers scss, sass, css et js.
- [slim-router-js](https://github.com/llvdl/slim-router-js) pour générer les urls des routes directement dans vos vues twig.
- [cli-menu](https://github.com/php-school/cli-menu) pour éxécuter les commands via un menu dans votre terminal.

#### NOTE
[cli-menu](https://github.com/php-school/cli-menu) utilise l'extension php posix qui n'est pas supporter sur windows, pensez à retirer la ligne suivante dans votre compose.json si vous êtes sur windows :
```
"php-school/cli-menu": "^3.0"
```

## Prérequis

- **[Php](https://secure.php.net/) >= 7.1.3**
> Slim Sim se base sur des dépendances demandant une version php récente.
- **MySQL/PostgreSQL/SQLite**
> Utilisant l'ORM [Doctrine](https://github.com/doctrine/orm), vous devez avoir à disposition une base de données.
- **[Node.js](https://nodejs.org/) >= 6.11.5**
> Le framework dispose de webpack 4 pour la partie front-end et a besoin d'une version nodejs la plus récente que possible.
- **OS supporté: Linux, MacOS et Windows**
> Linux et MacOS sont toute fois recommandé.


## Installation

### Composer
``` bash
$ composer create-project simondevelop/slim-sim <projet_name>
$ cd <projet_name>
$ composer install
$ npm install
```

### Git
``` bash
$ git pull https://github.com/simondevelop/slim-sim.git <projet_name>
$ cd <projet_name>
$ composer install
$ npm install
```

Vérifiez que le fichier `.env` a bien été créé, il s'agit du fichier de configuration de votre environnement ou vous définissez la connexion à la base de données, l'environnement `dev` ou `prod` et l'activation du cache de twig.
Si jamais le fichier n'a pas été créé, vous pouvez le faire manuellement en dupliquant le fichier `.env.example`.

N'oubliez pas de vérifier que votre configuration d'environnement de votre base de données corresponde bien et d'autoriser le dossier `storage` à l'écriture `chmod 774` par exemple.

### Configuration
#### Apache2
``` apacheconf
<VirtualHost *:8080>
    ServerName 127.0.0.1:8080
    DocumentRoot "/path/to/project/slim-sim/public/"
    <Directory "/path/to/project/slim-sim/public/">
        Options -Indexes +FollowSymLinks
        AllowOverride all
        Order allow,deny
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
```

#### Nginx
``` nginx
server {
    listen 8080;
    server_name localhost;
    index index.php;
    root /path/to/project/slim-sim/public;

    error_log /path/to/example.error.log;
    access_log /path/to/example.access.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/.+\.php(/|$) {
        try_files $uri /index.php = 404;
	    fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### Docker
Vous avez à votre disposition un fichier `docker-compose.yml` à la racine du projet, adapter les fichiers de configuration de y compris ceux de docker dans le dossier `docker` puis lancer la commande :
``` bash
$ docker-compose up -d
```

## Arborescence

- `app/src/` dossier de l'application
	- `Controllers/` dossier des controllers
    - `Entity/` dossier des entités doctrine
    - `Middlewares/` dossier des middlewares
    - `Views/` dossier des vues twig
- `assets/` dossier pour le développement front-end
- `config/` dossier comportant des fichiers de configuration de l'application
    - `commands` dossier comportant la configuration des commandes terminal
    - `translations` dossier comportant les traductions utilisés pour twig
    - `cli-config.php` fichier cli pour les commandes doctrine
    - `container.php` le container des dépendences
    - `error_pages.php` les vues en cas d'erreur
    - `functions.php` les fonctions accessible partout dans le code
    - `middlewares.yml` fichier d'appel des middlewares
    - `routes.yml` fichier des routes
    - `tracy.php` fichier de configuration de tracy (debugbar)
- `public/` dossier public de l'application
- `storage`
	- `cache/` cache twig de l'application
	- `logs/` les logs de monolog
- `tests/` dossier des tests unitaires
- `.env` fichier de configuration d'environnement base de données
- `console` fichier php des commandes cli
- `webpack.config.js` fichier de configuration de webpack
