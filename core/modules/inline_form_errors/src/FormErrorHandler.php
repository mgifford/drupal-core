<?php

namespace Drupal\inline_form_errors;

use Drupal\Core\Form\FormElementHelper;
use Drupal\Core\Form\FormErrorHandler as CoreFormErrorHandler;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Render\Element;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\StringTranslation\TranslationInterface;
use Drupal\Core\Url;

/**
 * Produces inline form errors.
 */
class FormErrorHandler extends CoreFormErrorHandler {

  use StringTranslationTrait;

  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The messenger.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * Constructs a new FormErrorHandler.
   *
   * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
   *   The string translation service.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer service.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger.
   */
  public function __construct(TranslationInterface $string_translation, RendererInterface $renderer, MessengerInterface $messenger) {
    $this->stringTranslation = $string_translation;
    $this->renderer = $renderer;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public function handleFormErrors(array &$form, FormStateInterface $form_state): static {
    parent::handleFormErrors($form, $form_state);

    if (!empty($form_state->getErrors()) && empty($form['#disable_inline_form_errors'])) {
      $this->setTableElementInlineErrors($form);
    }
    return $this;
  }

  /**
   * Sets inline errors on table and tableselect elements.
   *
   * The parent FormErrorHandler does not set inline errors on table and
   * tableselect elements because they are compound elements. This method
   * ensures they display inline errors via aria-describedby.
   *
   * @param array $elements
   *   An associative array of form elements.
   */
  protected function setTableElementInlineErrors(array &$elements): void {
    foreach ($elements as $key => &$element) {
      if (!is_array($element)) {
        continue;
      }

      if (in_array($element['#type'] ?? NULL, ['table', 'tableselect'], TRUE)
        && !empty($element['#errors'])
        && empty($element['#error_no_message'])
      ) {
        $error_id = ($element['#id'] ?? ('inline-form-errors-table-' . $key)) . '--error';
        $existing_prefix = (string) ($element['#prefix'] ?? '');

        $error_markup = '<div id="' . $error_id . '" class="form-item--error-message">' . $element['#errors'] . '</div>';
        $element['#prefix'] = $error_markup . $existing_prefix;

        if (empty($element['#attributes']['aria-describedby'])) {
          $element['#attributes']['aria-describedby'] = $error_id;
        }
        else {
          $element['#attributes']['aria-describedby'] .= ' ' . $error_id;
        }
      }
      else {
        $this->setTableElementInlineErrors($element);
      }
    }
  }

  /**
   * Loops through and displays all form errors.
   *
   * To disable inline form errors for an entire form set the
   * #disable_inline_form_errors property to TRUE on the top level of the $form
   * array:
   * @code
   * $form['#disable_inline_form_errors'] = TRUE;
   * @endcode
   * This should only be done when another appropriate accessibility strategy is
   * in place.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  protected function displayErrorMessages(array $form, FormStateInterface $form_state) {
    // Skip generating inline form errors when opted out.
    if (!empty($form['#disable_inline_form_errors'])) {
      parent::displayErrorMessages($form, $form_state);
      return;
    }

    $error_links = [];
    $errors = $form_state->getErrors();
    // Loop through all form errors and check if we need to display a link.
    foreach ($errors as $name => $error) {
      $form_element = FormElementHelper::getElementByName($name, $form);
      $title = FormElementHelper::getElementTitle($form_element);

      // Only show links to erroneous elements that are visible.
      $is_visible_element = Element::isVisibleElement($form_element);
      // Only show links for elements that have a title themselves or have
      // children with a title.
      $has_title = !empty($title);
      // Only show links for elements with an ID.
      $has_id = !empty($form_element['#id']);

      // Do not show links to elements with suppressed messages. Most often
      // their parent element is used for inline errors.
      if (!empty($form_element['#error_no_message'])) {
        unset($errors[$name]);
      }
      elseif ($is_visible_element && $has_title && $has_id) {
        $url = Url::fromRoute('<none>', [], ['fragment' => $form_element['#id'], 'external' => TRUE]);
        $error_links[] = Link::fromTextAndUrl($title, $url)->toRenderable();
        unset($errors[$name]);
      }
    }

    // Set normal error messages for all remaining errors.
    foreach ($errors as $error) {
      $this->messenger->addError($error);
    }

    if (!empty($error_links)) {
      $render_array = [
        [
          '#markup' => $this->formatPlural(count($error_links), '1 error has been found: ', '@count errors have been found: '),
        ],
        [
          '#theme' => 'item_list',
          '#items' => $error_links,
          '#context' => ['list_style' => 'comma-list'],
        ],
      ];
      $message = $this->renderer->renderInIsolation($render_array);
      $this->messenger->addError($message);
    }
  }

}
