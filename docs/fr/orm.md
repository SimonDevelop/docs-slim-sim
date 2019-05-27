# ORM

## Doctrine

Doctrine est l'ORM utilisé, vous avez à votre disposition les entités dans le dossier `app/src/Entity` et accès à l'`EntityManager` depuis les controllers avec `$this->em;`.

Voici la commande doctrine que vous aurez besoin pour déclarer vos entités en base (Vérifiez avoir bien créé votre base de données au préalable):
> Linux et MacOs
``` bash
$ php vendor/bin/doctrine orm:schema-tool:update
```
> Windows
``` bash
$ php vendor/doctrine/orm/bin/doctrine.php orm:schema-tool:update
```

A coté de vos entités vous avez les `repository`, il s'agit des classes ou vous allez écrire les requêtes doctrine en utilisant son [QueryBuilder](https://www.doctrine-project.org/projects/doctrine-orm/en/2.7/reference/query-builder.html#the-querybuilder) par exemple.

Pour plus d'infos sur l'ORM, je vous invite à aller voir la [documentation officiel](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/).

## Fixtures

Vous pouvez envoyer des données prédéfini en base de données avec [data-fixtures](https://github.com/doctrine/data-fixtures), créez vos fixtures dans le dossier `app/src/Entity/DataFixtures` puis lancez la commande :

``` bash
$ php console data:fixtures
```

Attention, cette commande purge la base de données pour ensuite envoyer toutes les fixtures de dossier `app/src/Entity/DataFixtures`, pour envoyer une fixture spécifique sans pruger la base, lancer la commande :

``` bash
$ php console data:fixture <VotreFixture>
```
