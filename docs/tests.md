# Tests

To guarantee the quality of the project, skeleton has unit tests. Since the code base can change over time, the tests must ensure that there is no regression due to these new changes.

## PHPUnit
The tests test the various routes of your application.
they are available :
- In the `tests/` directory
- Execute the tests via the `phpunit` command

## PHPCS
PHPCS allows to check if there are no violations with the standard conventions imposed.
You can run the `phpcs` command to make sure your changes respect conventions.

It is possible to execute both commands in one via the composer script command: `composer test`
