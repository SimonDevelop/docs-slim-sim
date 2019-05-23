# Multilingue

Vous pouvez faire du multilingue avec twig, vous avez peut-être remarquer les fichiers `en.yml` et `fr.yml` dans `config/translations/`.

Il s'agit des fichiers de traduction, dans la vue d'exemple `Views/pages/home.twig` on utilise le filtre twig `trans`, dans l'exemple :
```twig
{{ {{ "title"|trans }} }}
```
Le filtre recherche la clef `title` dans les fichers `fr.yml` et `en.yml`, pour ensuite retourner la valeur selon la langue utilisée :
```yaml
<?php
// config/translations/fr.yml
title: 'Bonjour le monde !'
```
```yaml
<?php
// config/translations/en.yml
title: 'Hello world!'
```

Pour modifier la langue par défaut, rendez-vous dans le container `config/container.php`, cherchez et modifier la valeur de la variable `$defaultLang`:
Dans notre cas, remplacez `en` par `fr`, assurez-vous d'avoir les fichiers de vos langues dans `config/translations/`.
Vous pouvez changer la langue via la session comme ceci `$session->set('lang', 'fr')` dans vos `controllers` et `middlewares` si besoin.


::: warning Note
Vous pouvez supprimer le système multilingue si vous en avez pas besoin avec la commande `composer remove symfony/translation`
:::
