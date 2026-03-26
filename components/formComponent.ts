import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { RESET_BUTTON_COLOR, SEARCH_BUTTON_FONT_COLOR } from '../utils/constants/constant';
import { FormDataFields } from '../types/FormTypes';

export class FormComponent extends BasePage {
  readonly form: Locator;
  protected resetButton: Locator;
  protected searchButton: Locator;

  constructor(page: Page, formSelector: string = '.oxd-form') {
    super(page); // BasePage constructor
    this.form = page.locator(formSelector);
    this.resetButton = this.form.getByRole('button', { name: 'Reset' });
    this.searchButton = this.form.getByRole('button', { name: 'Search' });
  }

  /**
   * Reuses BasePage.assertTextVisibleInContainer
   */
  async verifyLabels(labels: string[]) {
    await this.verifyTextExistsInContainer(this.form, labels);
  }

  async verifyButtons() {
    await this.expectElementToHaveCSS(this.resetButton, 'color', RESET_BUTTON_COLOR); // Example CSS check
    await this.expectElementToHaveCSS(this.searchButton, 'color', SEARCH_BUTTON_FONT_COLOR);
  }


  async fillForm(data: FormDataFields) {
  /**
   * Fill an entire form dynamically.
   *
   * @param data - object with keys as labels and values to fill
   */

  const fields: Locator = this.page.locator(".oxd-input-group");
  const count = await fields.count();

  for (let i = 0; i < count; i++) {
    const field = fields.nth(i);

    // Get label
    const labelLocator = field.locator(".oxd-input-group__label-wrapper");
    const labelCount = await labelLocator.count();
    if (labelCount === 0) continue;

    const label = (await labelLocator.innerText()).trim();

    // Skip fields not in data
    if (!(label in data)) continue;

    const value = data[label];

    // Detect input
    const inputEl = field.locator("input.oxd-input:visible");
    if ((await inputEl.count()) > 0) {
      await inputEl.fill(value);
      continue;
    }

    // Detect select
    const selectEl = field.locator(".oxd-select-text-input:visible");
    if ((await selectEl.count()) > 0) {
      await selectEl.click();

      // Correct filter syntax with exact match
      const options = this.page.locator("div[role='option']").filter({
        hasText: new RegExp(`^${value}$`), // exact match
      });

      const optionCount = await options.count();
      if (optionCount === 0) {
        throw new Error(`Option '${value}' not found`);
      }

      await options.first().click(); 

    }
  }
 }
}