# Multilingue

You can multilingual with twig, you may have noticed the `en.yml` and `fr.yml` files in `config/translations/`.

These are the translation files, in the example view `Views/pages/home.twig` we use the `trans` twig filter, in the example :
```twig
{{ {{ "title"|trans }} }}
```
The filter looks for the `title` key in the `fr.yml` and `en.yml` files, and then returns the value according to the language used :
```yaml
# config/translations/fr.yml
title: 'Bonjour le monde !'
```
```yaml
# config/translations/en.yml
title: 'Hello world!'
```

To modify the default language, go to the `config/container.php` container, find and modify the value of the `$defaultLang` variable:
In our case, replace `en` with `fr`, make sure you have your language files in `config/translations/`.
You can change the language via the session like this `$session->set('lang', 'fr')` in your `controllers` and `middlewares` if necessary.
