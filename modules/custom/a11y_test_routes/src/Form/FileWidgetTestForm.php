<?php

namespace Drupal\a11y_test_routes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form with a file field that exposes the "display" checkbox (patch 001).
 */
class FileWidgetTestForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'a11y_test_routes_file_widget';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['imagefile_file'] = [
      '#type' => 'managed_file',
      '#title' => 'Image file',
      '#upload_location' => 'public://',
      '#display_field' => TRUE,
      '#display_field_label' => 'Display',
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => 'Save',
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
