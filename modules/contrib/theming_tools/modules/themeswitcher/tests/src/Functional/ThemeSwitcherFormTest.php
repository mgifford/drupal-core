<?php

declare(strict_types=1);

namespace Drupal\Tests\themeswitcher\Functional;

use Drupal\Core\Url;
use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests the theme switcher form output.
 */
#[Group('themeswitcher')]
#[Group('theming_tools')]
#[RunTestsInSeparateProcesses]
class ThemeSwitcherFormTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'themeswitcher',
  ];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Tests that the fixed page-bottom form has an accessible landmark name.
   */
  public function testThemeSwitcherFormHasAccessibleLandmarkName(): void {
    $this->drupalLogin($this->drupalCreateUser([
      'choose preferred theme',
    ]));

    $this->drupalGet(Url::fromRoute('<front>'));

    $assert_session = $this->assertSession();
    $form = $assert_session->elementExists('css', 'form.themeswitcher-form');
    $this->assertSame('Theme switcher', $form->getAttribute('aria-label'));
    $assert_session->elementExists('css', 'select[name="preferred_theme"]', $form);
  }

}
