<?php

namespace Drupal\a11y_test_routes\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Test pages that reproduce the UI states targeted by accessibility patches.
 */
class A11yTestRoutesController extends ControllerBase {

  /**
   * Action-link / language-switcher page (patches 002, 005).
   */
  public function actionLink() {
    return [
      '#markup' => '
        <form method="post" action="#" class="a11y-action-form">
          <input type="submit" id="edit-submit" class="button button--primary" value="Save configuration" />
          <a class="button--action" href="#">Add content</a>
          <a hreflang="he" href="#">עברית</a>
          <a role="link" hreflang="en" href="#">English</a>
          <a role="link" hreflang="fr" href="#">Français</a>
        </form>
      ',
    ];
  }

  /**
   * Buttons with explicit tabindex (patch 004).
   */
  public function buttons() {
    return [
      '#markup' => '
        <form method="post" action="#" class="a11y-buttons-form">
          <button tabindex="1" type="button">First</button>
          <button tabindex="2" type="button">Second</button>
          <button type="submit">Submit</button>
        </form>
      ',
    ];
  }

  /**
   * Table with an empty header cell (patch 008).
   */
  public function emptyHeaders() {
    return [
      '#markup' => '
        <table class="a11y-empty-headers">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alpha</td>
              <td>Beta</td>
            </tr>
          </tbody>
        </table>
      ',
    ];
  }

}
