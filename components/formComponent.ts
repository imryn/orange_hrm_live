import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { RESET_BUTTON_COLOR, SEARCH_BUTTON_FONT_COLOR } from '../utils/constants/constant';
import { FormField } from '../types/FormTypes';


export class FormComponent extends BasePage {
  readonly form: Locator;
  protected resetButton: Locator;
  protected searchButton: Locator;
  protected formGroup: Locator;
  protected formLabel: Locator;

  constructor(page: Page, formSelector: string = '.oxd-form') {
    super(page); // BasePage constructor
    this.form = page.locator(formSelector);
    this.resetButton = this.getButtonByName('Reset', this.form);
    this.searchButton = this.getButtonByName('Search', this.form);
    this.formGroup = this.page.locator('.oxd-input-group')
    this.formLabel = this.page.locator('label')
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
        const group = this.formGroup.filter({ 
          has: this.page.getByText(field.label, { exact: true }) 
        });

        switch (field.type) {
            case 'autocomplete':
                // Click and Type to trigger the search
                const input = group.locator('input');
                await this.findElementAndClick(input);
                await input.fill(''); 
                await input.pressSequentially(field.value, { delay: 150 });

                // Find the result in the dropdown that matches the text
                // We use a broader selector for the dropdown list to work across pages
                const listbox = this.page.locator('[role="listbox"]');
                await this.waitForElement(listbox);

                const result = this.getOptionByName(field.value, this.page).first();

                await this.waitForElement(result)
                await this.findElementAndClick(result);
                break;

            case 'dropdown':
                // Standard OrangeHRM dropdown logic
                await this.findElementAndClick(group.locator('.oxd-select-wrapper'));
                const option = this.getOptionByName(field.value, this.page);
                await this.waitForElement(option)
                await this.findElementAndClick(option);
                break;

            default:
              const textInput = group.locator('input').filter({ visible: true }).first();
              if (await textInput.isVisible())
                // Default 'input' behavior
                await this.fillInput(textInput, field.value);
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

  async getFieldError(labelName: string): Promise<Locator> {
    return this.formGroup
        .filter({ has: this.formLabel.filter({ hasText: labelName }) })
        .locator('.oxd-input-field-error-message');
 }

}