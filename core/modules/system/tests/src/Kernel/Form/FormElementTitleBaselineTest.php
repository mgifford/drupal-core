<?php

namespace Drupal\Tests\system\Kernel\Form;

use Drupal\Core\Form\FormElementTitle;
use Drupal\KernelTests\KernelTestBase;

/**
 * Regression guard: core may not introduce new form elements without a name.
 *
 * This test builds a curated set of core forms, collects elements that are
 * missing an accessible name (via FormElementTitle), and compares them to a
 * committed baseline. The baseline is a RATCHET: a violation may only appear
 * in it if it was already known. The test fails when:
 *  - a violation is observed that is NOT in the baseline (new regression); or
 *  - a baseline entry is no longer observed (stale exemption).
 *
 * To (re)generate the baseline after an intentional change, run with
 * FORM_TITLE_BASELINE_SEED=1; the current violations are written to the
 * fixture and the test is skipped.
 *
 * @group form
 */
class FormElementTitleBaselineTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['system', 'user'];

  /**
   * Path to the committed baseline fixture.
   */
  private const BASELINE = DRUPAL_ROOT . '/core/modules/system/tests/fixtures/form_element_title_baseline.txt';

  /**
   * Form IDs => form arguments to build and inspect.
   */
  private function forms(): array {
    return [
      'system_site_information_settings' => \Drupal\system\Form\SiteInformationForm::class,
      'user_login_form' => \Drupal\user\Form\UserLoginForm::class,
      'user_pass' => \Drupal\user\Form\UserPasswordForm::class,
    ];
  }

  /**
   * Tests that no new missing-#title violations are introduced.
   */
  public function testBaseline(): void {
    /** @var \Drupal\Core\Form\FormBuilderInterface $form_builder */
    $form_builder = \Drupal::service('form_builder');

    $violations = [];
    foreach ($this->forms() as $form_id => $form_arg) {
      $form = $form_builder->getForm($form_arg);
      foreach (FormElementTitle::collectMissingTitles($form, $form_id) as $violation) {
        $violations[] = $violation;
      }
    }

    if (getenv('FORM_TITLE_BASELINE_SEED')) {
      $this->seedBaseline($violations);
      $this->markTestSkipped(sprintf('Baseline seeded with %d violations. Re-run without FORM_TITLE_BASELINE_SEED.', count($violations)));
    }

    $baseline = $this->loadBaseline();
    $observed_keys = $this->keys($violations);
    $baseline_keys = $this->keys($baseline);

    $new = array_diff($observed_keys, $baseline_keys);
    $stale = array_diff($baseline_keys, $observed_keys);

    $this->assertEmpty($new, "New missing-#title violations introduced:\n" . implode("\n", $new));
    $this->assertEmpty($stale, "Stale baseline entries (element now has a name):\n" . implode("\n", $stale));
  }

  /**
   * Maps violations to stable "form_id|path|type" keys.
   */
  private function keys(array $violations): array {
    return array_map(function (array $v) {
      return $v['form_id'] . '|' . $v['path'] . '|' . $v['type'];
    }, $violations);
  }

  /**
   * Reads the baseline fixture, ignoring comments and blank lines.
   */
  private function loadBaseline(): array {
    $lines = file_exists(self::BASELINE) ? file(self::BASELINE, FILE_IGNORE_NEW_LINES) : [];
    $violations = [];
    foreach ($lines as $line) {
      $line = trim($line);
      if ($line === '' || str_starts_with($line, '#')) {
        continue;
      }
      [$form_id, $path, $type] = array_map('trim', explode('|', $line));
      $violations[] = ['form_id' => $form_id, 'path' => $path, 'type' => $type];
    }
    return $violations;
  }

  /**
   * Writes the current violations to the baseline fixture.
   */
  private function seedBaseline(array $violations): void {
    $out = [
      '# form_id | element_path | element_type',
      '# element_path is #array_parents joined by "][".',
      '# Non-growing baseline: existing violations may only decrease.',
      '',
    ];
    $keys = $this->keys($violations);
    sort($keys);
    foreach ($keys as $key) {
      $out[] = $key;
    }
    file_put_contents(self::BASELINE, implode("\n", $out) . "\n");
  }

}
