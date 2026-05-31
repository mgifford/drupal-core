<?php

namespace Drupal\filter\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Template\Attribute;
use Drupal\filter\FilterFormatRepositoryInterface;

/**
 * Theme hooks for filter.
 */
class FilterThemeHooks {

  public function __construct(
    protected AccountInterface $currentUser,
    protected FilterFormatRepositoryInterface $formatRepository,
  ) {}

  /**
   * Implements hook_theme().
   */
  #[Hook('theme')]
  public function theme() : array {
    return [
      'filter_tips' => [
        'variables' => [
          'tips' => NULL,
          'long' => FALSE,
        ],
        'initial preprocess' => static::class . ':preprocessFilterTips',
      ],
      'text_format_wrapper' => [
        'variables' => [
          'children' => NULL,
          'description' => NULL,
          'attributes' => [],
        ],
        'initial preprocess' => static::class . ':preprocessTextFormatWrapper',
      ],
      'filter_guidelines' => [
        'variables' => [
          'format' => NULL,
        ],
        'initial preprocess' => static::class . ':preprocessFilterGuidelines',
      ],
      'filter_caption' => [
        'variables' => [
          'node' => NULL,
          'tag' => NULL,
          'caption' => NULL,
          'classes' => NULL,
        ],
      ],
    ];
  }

  /**
   * Prepares variables for filter tips templates.
   *
   * Default template: filter-tips.html.twig.
   *
   * @param array $variables
   *   An associative array containing:
   *   - tips: An associative array of filter tips keyed by text format label.
   *   - long: Whether the tips use the long explanatory format.
   */
  public function preprocessFilterTips(array &$variables): void {
    $tips = $variables['tips'] ?? [];
    $variables['multiple'] = count($tips) > 1;

    foreach ($tips as $name => $tip_list) {
      // Some callers or themes may already provide the normalized template
      // shape. Leave those values intact.
      if (isset($tip_list['list'])) {
        $variables['tips'][$name]['list'] = $this->normalizeFilterTipList($tip_list['list']);
        $variables['tips'][$name] += [
          'name' => $name,
          'attributes' => new Attribute(),
        ];
        continue;
      }

      $variables['tips'][$name] = [
        'name' => $name,
        'list' => $this->normalizeFilterTipList($tip_list),
        'attributes' => new Attribute(),
      ];
    }
  }

  /**
   * Ensures each filter tip item has template-safe attributes.
   */
  protected function normalizeFilterTipList(array $tip_list): array {
    foreach ($tip_list as &$item) {
      if (is_array($item)) {
        $item += ['attributes' => new Attribute()];
      }
    }
    unset($item);
    return $tip_list;
  }

  /**
   * Prepares variables for text format guideline templates.
   *
   * Default template: filter-guidelines.html.twig.
   *
   * @param array $variables
   *   An associative array containing:
   *   - format: An object representing a text format.
   */
  public function preprocessFilterGuidelines(array &$variables): void {
    $format = $variables['format'];
    $variables['tips'] = [
      '#theme' => 'filter_tips',
      '#tips' => $this->getFilterTips($format->id()),
    ];

    // Add format id for filter.js.
    $variables['attributes']['data-drupal-format-id'] = $format->id();
  }

  /**
   * Prepares variables for text format wrapper templates.
   *
   * Default template: text-format-wrapper.html.twig.
   *
   * @param array $variables
   *   An associative array containing:
   *   - attributes: An associative array containing properties of the element.
   */
  public function preprocessTextFormatWrapper(array &$variables): void {
    $variables['aria_description'] = FALSE;
    // Add element class and id for screen readers.
    if (isset($variables['attributes']['aria-describedby'])) {
      $variables['aria_description'] = TRUE;
      $variables['attributes']['id'] = $variables['attributes']['aria-describedby'];
      // Remove aria-describedby attribute as it shouldn't be visible here.
      unset($variables['attributes']['aria-describedby']);
    }
  }

  /**
   * Retrieves the filter tips.
   *
   * @param string|null $formatId
   *   (optional) The ID of the text format for which to retrieve tips. If
   *   omitted, will return tips for all formats accessible to the current user.
   *
   * @return array
   *   An associative array of filtering tips, keyed by the filter name. Each
   *   filtering tip is an associative array with elements:
   *   - tip: Tip text.
   *   - id: Filter ID.
   */
  protected function getFilterTips(?string $formatId = NULL): array {
    $formats = $this->formatRepository->getFormatsForAccount($this->currentUser);

    $tips = [];

    // If only listing one format, extract it from the $formats array.
    if ($formatId !== NULL) {
      $formats = [$formats[$formatId]];
    }

    foreach ($formats as $format) {
      foreach ($format->filters() as $name => $filter) {
        if ($filter->status) {
          $tip = $filter->tips();
          if (isset($tip)) {
            $tips[$format->label()][$name] = [
              'tip' => ['#markup' => $tip],
              'id' => $name,
            ];
          }
        }
      }
    }

    return $tips;
  }

}
