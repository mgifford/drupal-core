<?php

namespace Drupal\form_style\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\TypedConfigManagerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure FormStyle settings for this site.
 */
class FormStyleSettingsForm extends ConfigFormBase {

  public function __construct(
    ConfigFactoryInterface $config_factory,
    TypedConfigManagerInterface $typed_config_manager,
  ) {
    parent::__construct($config_factory, $typed_config_manager);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('config.typed'),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'form_style_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['form_style.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('form_style.settings');

    $form['disable_inline_form_errors'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Disable Inline Form Errors'),
      '#default_value' => $config->get('disable_inline_form_errors'),
      '#description' => $this->t('Do not show inline form errors for the FormStyle form.'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('form_style.settings')
      ->set('disable_inline_form_errors', $form_state->getValue('disable_inline_form_errors'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
