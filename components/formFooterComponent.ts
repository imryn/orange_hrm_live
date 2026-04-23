
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/basePage';

export class FormFooterComponent extends BasePage {

    private readonly saveButton: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page);
            // Scoping these to the 'form-actions' div makes them more stable
        const container = page.locator('.oxd-form-actions');
        this.saveButton = this.getButtonByName('Save', container);
        this.cancelButton = this.getButtonByName('Cancel', container);
    }

    async clickSave() {
        await this.findElementAndClick(this.saveButton);
    }

    async clickCancel() {
        await this.findElementAndClick(this.cancelButton);
    }

}