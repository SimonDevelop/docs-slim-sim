# Debug

## Debug bar
The framework has debugger bar `tracy`, it allows you to see at a glance various information about your views of your application, the doctrine queries made, the loading of twig, redirections ect...

At the first launch, `tracy` only displays milliseconds and system info, to display all the information you need click on the icon next to the small cross for a window with a list of checkboxes displayed. Click `Toggle All` and then press the `Set` button.

Note that the `Console Panel` option does not work, and you do not need to check the `Eloquent ORM Panel` and `Idiorm Panel` options as we use doctrine as orm.

![tracy](/assets/img/tracy.png)

## Debug
To debug during the development of your application, in your `controllers/middlewares` I recommend using the `r()` function which is a `var_dump` improved, but if you want to debug directly on twig you have the function `dump()` which is enabled when you are in `dev` development environment.
