import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { RESET_BUTTON_COLOR, SEARCH_BUTTON_FONT_COLOR } from '../utils/constants/constant';
import { FormField } from '../types/FormTypes';


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

 // Inside your FormComponent class
  async fillForm(fields: FormField[]) {
    for (const field of fields) {
        // 1. Find the container for this specific form group
        const group = this.page.locator('.oxd-input-group').filter({ hasText: field.label });
        const input = group.locator('input');

        switch (field.type) {
            case 'autocomplete':
                // Click and Type to trigger the search
                await this.findElementAndClick(input);
                await input.fill(''); 
                await input.pressSequentially(field.value, { delay: 150 });

                // Find the result in the dropdown that matches the text
                // We use a broader selector for the dropdown list to work across pages
                const listbox = this.page.locator('[role="listbox"], .oxd-autocomplete-dropdown');
                await this.waitForElement(listbox);

                const result = listbox.locator('div, [role="option"]')
                    .filter({ hasText: field.value })
                    .first();

                await this.waitForElement(result)
                await this.findElementAndClick(result);
                break;

            case 'dropdown':
                // Standard OrangeHRM dropdown logic
                await group.locator('.oxd-select-text').click();
                const option = this.page.getByRole('option', { name: field.value, exact: true });
                await this.waitForElement(option)
                await this.findElementAndClick(option);
                break;

            default:
                // Default 'input' behavior
                await this.fillInput(input, field.value);
                break;
        }
    }
  }

  async clickSearch() {
    await this.findElementAndClick(this.searchButton)
  }

  async searchForUser(fields: FormField[]) {
    await this.fillForm(fields);
    await this.clickSearch();
  }

}