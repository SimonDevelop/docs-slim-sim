# Introduction

![](https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png)

Slim Sim is a skeleton based on PHP micro framework [Slim](https://www.slimframework.com/), adopting a simple and effective MVC architecture, it will allow you to develop your sites and web applications in a clean and organized structure.
The underlying architecture is built using well-established and up-to-date technologies.

**Some of these key technologies :**
- [twig-view](https://github.com/slimphp/Twig-View) for the views.
- [doctrine](https://github.com/doctrine/doctrine2) for the database.
- [data-fixtures](https://github.com/doctrine/data-fixtures) for the data fixture.
- [migrations](https://github.com/doctrine/migrations) for the migrations of the database.
- [validation](https://github.com/Respect/Validation) to validate the data.
- [csrf](https://github.com/slimphp/Slim-Csrf) for form security.
- [php-ref](https://github.com/digitalnature/php-ref) for an improved var_dump function.
- [phpdotenv](https://github.com/vlucas/phpdotenv) for the configuration of the environment.
- [console](https://github.com/symfony/console) for terminal commands.
- [monolog](https://github.com/Seldaek/monolog) to manage logs.
- [translation](https://github.com/symfony/translation) for the multilingual system.
- [webpack](https://github.com/webpack/webpack) for compilation and minification of files scss/sass/css/js.
- [cli-menu](https://github.com/php-school/cli-menu) for execute commands from a menu in your terminal.

#### NOTE
[cli-menu](https://github.com/php-school/cli-menu) use php posix extension which is not supported on windows, remember to delete this line in composer.json if you are under windows :
```
"php-school/cli-menu": "^3.2"
```

## Prerequisites

- **[Php](https://secure.php.net/) >= 7.1**
> Slim Sim relies on dependencies that require a recent php version.
- **MySQL/PostgreSQL/SQLite**
> Using [Doctrine](https://github.com/doctrine/orm) ORM, you must have a database available.
- **[Node.js](https://nodejs.org/) >= 10**
> The framework has webpack 4 for the front-end part and needs a newer nodejs version as possible.
- **OS supporté: Linux, MacOS et Windows**
> Linux and MacOS are however recommended.


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
$ git pull https://github.com/SimonDevelop/slim-sim.git <projet_name>
$ cd <projet_name>
$ composer install
$ npm install
```

Check that the `.env` file has been created, this is the configuration file of your environment or you define the connection to the database, the environment` dev` or `prod` and the activation of the twig cache.

If the file has not been created, do it manually by duplicating the `.env.example` file.

Be sure to check that your database environment configuration matches well and allow the `storage` folder to write, example `chmod 774`.

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
You have at your disposal a `docker-compose.yml` file at the root of the project, adapt the configuration files including the docker files in the` docker` folder and then run the command:
``` bash
$ docker-compose up -d
```

## Tree

- `app/src/` folder of the application
	- `Controllers/` folder of controllers
    - `Entity/` folder of doctrine entity
    - `Middlewares/` folder of middlewares
    - `Views/` folder of twig views
- `assets/` folder of front-end files (css/js...)
- `config/` application configuration files folder
    - `commands` terminal command configuration folder
    - `translations` folder of translation files used in twig views
    - `cli-config.php` cli file for doctrine commands
    - `container.php` the container of dependencies
    - `functions.php` functions accessible anywhere in the code
    - `middlewares.php` middlewares call file
    - `routes.php` route file
- `public/` public folder of the application
- `storage`
	- `cache/` twig cache of the application
	- `logs/` the logs of monolog
- `tests/` unit tests file
- `.env` database environment file
- `console` php file of cli commands
- `webpack.config.js` webpack configuration file
