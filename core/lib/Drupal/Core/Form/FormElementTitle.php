<?php

namespace Drupal\Core\Form;

use Drupal\Core\Render\Element;

/**
 * Helpers for verifying that form elements have an accessible name.
 *
 * This is the detection half of the "no new missing #title" ratchet
 * (see the issue series tracked by drupal.org/node/933004). It does not
 * enforce anything on its own; tests compare its output against a
 * committed baseline so that existing violations may only decrease.
 *
 * @internal
 *   This API is experimental and may change in any minor version.
 */
class FormElementTitle {

  /**
   * Element types that do not require an accessible name.
   */
  const TYPES_WITHOUT_NAME = [
    'hidden',
    'token',
    'value',
    'item',
    'table',
    'tableselect',
    'field_ui_table',
    'datelist',
    'password_confirm',
  ];

  /**
   * Collects form elements that are missing an accessible name.
   *
   * An element "has an accessible name" if it has a non-empty #title (or, for
   * buttons, a non-empty #value), or if it carries an aria-label / aria-labelledby
   * attribute. Fieldsets require a non-empty #title (their legend).
   *
   * @param array $form
   *   A built form array.
   * @param string $form_id
   *   The form ID, used to build a stable identifier.
   *
   * @return array
   *   List of violations. Each item is an array with the keys:
   *   - form_id: the form ID passed in.
   *   - path: the element's #array_parents joined by "][".
   *   - type: the element #type (or "fieldset").
   */
  public static function collectMissingTitles(array $form, string $form_id): array {
    $violations = [];
    self::walk($form, $form_id, [], $violations);
    return $violations;
  }

  /**
   * Recursively walks a form subtree collecting violations.
   *
   * @param array $element
   *   The element (or form) to inspect.
   * @param string $form_id
   *   The form ID.
   * @param array $parents
   *   The #array_parents path to $element.
   * @param array $violations
   *   Violations collected so far (modified by reference).
   */
  private static function walk(array $element, string $form_id, array $parents, array &$violations): void {
    if (isset($element['#access']) && $element['#access'] === FALSE) {
      return;
    }

    if (isset($element['#type'])) {
      $type = $element['#type'];
      if (!in_array($type, self::TYPES_WITHOUT_NAME, TRUE) && self::isNamedElement($element, $type)) {
        if (!self::hasAccessibleName($element, $type)) {
          $violations[] = [
            'form_id' => $form_id,
            'path' => implode('][', $parents),
            'type' => $type,
          ];
        }
      }
    }

    foreach (Element::children($element) as $key) {
      $child_parents = $parents;
      $child_parents[] = $key;
      self::walk($element[$key], $form_id, $child_parents, $violations);
    }
  }

  /**
   * Whether an element of the given type is expected to have a name.
   */
  private static function isNamedElement(array $element, string $type): bool {
    if ($type === 'fieldset') {
      return TRUE;
    }
    return !empty($element['#input']);
  }

  /**
   * Determines whether an element has an accessible name.
   */
  private static function hasAccessibleName(array $element, string $type): bool {
    $attributes = $element['#attributes'] ?? [];
    if (isset($attributes['aria-label']) && trim((string) $attributes['aria-label']) !== '') {
      return TRUE;
    }
    if (isset($attributes['aria-labelledby']) && trim((string) $attributes['aria-labelledby']) !== '') {
      return TRUE;
    }

    if ($type === 'button' || $type === 'submit') {
      return isset($element['#value']) && trim((string) $element['#value']) !== '';
    }

    return isset($element['#title']) && trim((string) $element['#title']) !== '';
  }

}
