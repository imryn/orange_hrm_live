import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class PopUpComponent extends BasePage {

    private readonly popUpContainer: Locator;
    private readonly popUpFooter: Locator
    public readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.popUpContainer = page.locator('.orangehrm-dialog-popup');
        this.popUpFooter = page.locator('.orangehrm-modal-footer');
        this.deleteButton = this.getButtonByName(/Yes, Delete/, this.popUpFooter)
    }

    async waitForPopUpToBeVisible() {
        await this.waitElementIsVisible(this.popUpContainer);
    }

    async clickDeleteButton() {
        await this.waitElementIsVisible(this.deleteButton);
        await this.findElementAndClick(this.deleteButton, { force: true });
    }
}