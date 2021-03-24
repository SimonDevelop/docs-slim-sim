# ORM

## Doctrine

Doctrine is the ORM used, you have at your disposal the entities in the folder `app/src/Entity` and access to `EntityManager` from the controllers with `$this->em;`.

Here is the doctrine command that you will need to declare your entities in database (Make sure you have created your database beforehand):
> Linux and MacOs
``` bash
$ php vendor/bin/doctrine orm:schema-tool:update
```
> Windows
``` bash
$ php vendor/doctrine/orm/bin/doctrine.php orm:schema-tool:update
```

Beside your entities you have `repository`, these are the classes where you will write the doctrine queries using for example its [QueryBuilder](https://www.doctrine-project.org/projects/doctrine-orm/en/2.7/reference/query-builder.html#the-querybuilder).

For more info on the ORM, I invite you to go and see the [documentation officiel](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/).

## Fixtures

You can send predefined database data with [data-fixtures](https://github.com/doctrine/data-fixtures), create your fixtures in the `app/src/Entity/DataFixtures` folder, and run the command :

``` bash
$ php console data:fixtures
```

Attention, this command purges the database to then send all the fixtures of file `app/src/Entity/DataFixtures`, to send a specific fixture without hollowing the base, to launch the command :

``` bash
$ php console data:fixture <YourFixture>
```

## Migrations

You can generate and write migrations for managing updates to your database. Unlike the `php vendor/bin/doctrine orm:schema-tool:update` command, which executes the database change based on only the entities, the migrations can be used to manage file-by-file update levels for better security of your project updates.

You have available orders and examples of migrations since [official documentation](https://www.doctrine-project.org/projects/doctrine-migrations/en/3.0/reference/generating-migrations.html).
