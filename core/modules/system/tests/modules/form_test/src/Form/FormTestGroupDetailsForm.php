<?php

declare(strict_types=1);

namespace Drupal\form_test\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Builds a simple form to test the #group property on #type 'details'.
 *
 * @internal
 */
class FormTestGroupDetailsForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'form_test_group_details';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $required = FALSE) {
    $form['details'] = [
      '#type' => 'details',
      '#title' => 'Root element',
      '#open' => TRUE,
      '#required' => !empty($required),
    ];
    $form['meta'] = [
      '#type' => 'details',
      '#title' => 'Group element',
      '#open' => TRUE,
      '#group' => 'details',
    ];
    $form['meta']['element'] = [
      '#type' => 'textfield',
      '#title' => 'Nest in details element',
    ];
    $form['summary_attributes'] = [
      '#type' => 'details',
      '#title' => 'Details element with summary attributes',
      '#summary_attributes' => [
        'data-summary-attribute' => 'test',
      ],
    ];
    $form['description_attributes'] = [
      '#type' => 'details',
      '#title' => 'Details element with description',
      '#description' => 'I am a details description',
    ];
    $form['description_before'] = [
      '#type' => 'details',
      '#title' => 'Details element with description before',
      '#description' => 'I am a before description',
      '#description_display' => 'before',
    ];
    $form['description_before']['child'] = [
      '#type' => 'textfield',
      '#title' => 'Before child',
    ];
    $form['description_after'] = [
      '#type' => 'details',
      '#title' => 'Details element with description after',
      '#description' => 'I am an after description',
      '#description_display' => 'after',
    ];
    $form['description_after']['child'] = [
      '#type' => 'textfield',
      '#title' => 'After child',
    ];
    $form['description_invisible'] = [
      '#type' => 'details',
      '#title' => 'Details element with invisible description',
      '#description' => 'I am an invisible description',
      '#description_display' => 'invisible',
    ];
    $form['default_title'] = [
      '#type' => 'details',
    ];
    $form['default_title']['child'] = [
      '#type' => 'textfield',
      '#title' => 'Default title child',
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
