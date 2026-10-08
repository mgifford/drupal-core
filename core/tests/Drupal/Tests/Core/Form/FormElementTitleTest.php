<?php

namespace Drupal\Tests\Core\Form;

use Drupal\Core\Form\FormElementTitle;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\Core\Form\FormElementTitle
 * @group form
 */
class FormElementTitleTest extends UnitTestCase {

  /**
   * @covers ::collectMissingTitles
   */
  public function testCollectsMissingTitles(): void {
    $form = [
      'name' => ['#type' => 'textfield', '#title' => 'Name'],
      'email' => ['#type' => 'email'],
      'submit' => ['#type' => 'submit', '#value' => 'Go'],
      'bad_button' => ['#type' => 'button'],
      'fs' => [
        '#type' => 'fieldset',
        'child' => ['#type' => 'checkbox', '#title' => 'C'],
      ],
      'hidden' => ['#type' => 'hidden'],
      'aria' => ['#type' => 'textfield', '#attributes' => ['aria-label' => 'Search']],
    ];

    $violations = FormElementTitle::collectMissingTitles($form, 'test_form');
    $keys = array_map(function ($v) {
      return $v['path'] . ':' . $v['type'];
    }, $violations);

    $this->assertEqualsCanonicalizing(
      ['email:email', 'bad_button:button', 'fs:fieldset'],
      $keys
    );
  }

  /**
   * @covers ::collectMissingTitles
   */
  public function testSkipsInaccessibleElements(): void {
    $form = [
      'secret' => ['#type' => 'textfield', '#access' => FALSE],
    ];
    $this->assertSame([], FormElementTitle::collectMissingTitles($form, 'test_form'));
  }

}
