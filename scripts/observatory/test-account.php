<?php

/**
 * @file
 * Creates or updates the Observatory's dedicated test account.
 *
 * Run it from the Drupal root of a disposable installation, with the password
 * on standard input so that it never appears in a process list or a log:
 *
 *   php .observatory/test-account.php <username> < password
 *
 * The account is active and has the administrator role. It is never user 1.
 * Only the account's uid is printed. See docs/testing/RUN.md.
 */

declare(strict_types=1);

use Drupal\Core\DrupalKernel;
use Drupal\Core\Site\Settings;
use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;
use Symfony\Component\HttpFoundation\Request;

if (PHP_SAPI !== 'cli') {
  exit(1);
}

$name = $argv[1] ?? '';
if (!preg_match('/^[a-z0-9][a-z0-9_.-]{2,59}$/', $name)) {
  fwrite(STDERR, "Usage: php test-account.php <username> < password\n");
  exit(2);
}
$password = rtrim((string) stream_get_contents(STDIN), "\r\n");
if (strlen($password) < 16) {
  fwrite(STDERR, "test-account: expected a password of at least 16 characters on standard input\n");
  exit(2);
}

$autoloader = require getcwd() . '/autoload.php';
DrupalKernel::bootEnvironment();
$kernel = new DrupalKernel('prod', $autoloader);
$kernel->setSitePath('sites/default');
Settings::initialize($kernel->getAppRoot(), $kernel->getSitePath(), $autoloader);
$kernel->boot();
$kernel->preHandle(Request::create('http://localhost/'));

if (!Role::load('administrator')) {
  fwrite(STDERR, "test-account: the site has no administrator role\n");
  exit(1);
}

$accounts = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['name' => $name]);
$account = $accounts ? reset($accounts) : User::create(['name' => $name, 'mail' => $name . '@example.com']);
if ((int) $account->id() === 1) {
  fwrite(STDERR, "test-account: refusing to use user 1\n");
  exit(2);
}
$created = $account->isNew();
$account->setPassword($password);
$account->activate();
$account->addRole('administrator');
$account->save();
printf("%s test account uid %d\n", $created ? 'created' : 'updated', $account->id());
