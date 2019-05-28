# Tests

Pour garantir la qualité du projet, le skeleton dispose de tests unitaires. Étant donné que la base du code peux changer au cours du temps, les tests doivent garantir qu'il n'y a pas de régression en raison de ces nouvelles modifications.

## PHPUnit
Les tests permet de tester les divers routes de votre application.
ils sont disponibles :
- Dans le répertoire `tests/`
- Executer les tests via la commande `phpunit`

## PHPCS
PHPCS permet de vérifier si il n'y a pas de violations avec les conventions standards imposés.
Vous pouvez executer la commande `phpcs` pour vérifier que vos changements respectes bien les conventions.

Il est possible d'executer les deux commandes en une seule via la commande script composer : `composer test`
