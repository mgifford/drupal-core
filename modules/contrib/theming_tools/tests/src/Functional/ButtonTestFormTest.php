<?php

declare(strict_types=1);

namespace Drupal\Tests\theming_tools\Functional;

use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests button fixture markup.
 *
 * @group theming_tools
 */
#[RunTestsInSeparateProcesses]
class ButtonTestFormTest extends BrowserTestBase {

  /**
   * Modules to enable.
   *
   * @var string[]
   */
  public static $modules = ['button'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->drupalLogin($this->drupalCreateUser(['access content']));
  }

  /**
   * Tests that button fixture controls use the natural tab order.
   */
  public function testButtonFixturesUseNaturalTabOrder() {
    foreach (['/buttons', '/buttons/disabled'] as $path) {
      $this->drupalGet($path);
      $this->assertSession()->statusCodeEquals(200);
      $this->assertSession()->elementNotExists('css', '#button-test-form [tabindex]');
    }
  }

}
